/** @module RESTManager */
import { RequestOptions } from "~/types/request-handler";

type QueuedRequest<T> = {
	options: RequestOptions;
	resolve: (value: T | PromiseLike<T>) => void;
	reject: (reason?: any) => void;
};

export class EDRestManager {
	private queue: QueuedRequest<any>[] = [];
	private requestsSent = 0;
	private readonly MAX_REQUESTS_PER_MINUTE = 100;
	private readonly INTERVAL_MS = 60000;
	private readonly API_VERSION = "7.4.2";

	constructor() {
		setInterval(() => {
			this.requestsSent = 0;
			this.processQueue();
		}, this.INTERVAL_MS);
	}

	private async sendRequest<T>(options: RequestOptions): Promise<T> {
		const { method, path, body, headers } = options;
		const url = new URL(`https://api.ecoledirecte.com${path}`);

		url.searchParams.set("v", this.API_VERSION);

		const response = await fetch(url, {
			method,
			body: body,
			headers: {
				"Content-Type": "x-www-form-urlencoded",
				"User-Agent": "ecoledirecte-api/1.0 (App; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 EDMOBILE v7.4.2",
				...headers,
			},
			redirect: "manual",
		});

		if (!response.ok)
			throw new Error(`${response.status}: ${response.statusText} (Received '${await response.text()}')`);

		const json = await response.json() as T;

		return json;
	}

	private enqueueRequest<T>(options: RequestOptions): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			this.queue.push({ options, resolve, reject });
			this.processQueue();
		});
	}

	private processQueue() {
		while (this.requestsSent < this.MAX_REQUESTS_PER_MINUTE && this.queue.length > 0) {
			const { options, resolve, reject } = this.queue.shift()!;
			this.requestsSent++;
			this.sendRequest<any>(options).then(resolve).catch(reject);
		}
	}

	async get<T>(path: string, headers?: Record<string, string>): Promise<T> {
		return this.enqueueRequest<T>({
			method: "GET",
			path,
			headers
		});
	}

	async post<T>(path: string, body: object, headers?: Record<string, string>): Promise<T> {
		return this.enqueueRequest<T>({
			method: "POST",
			path,
			body: new URLSearchParams({
				data: JSON.stringify(body),
			}).toString(),
			headers: headers
		});
	}

	async put<T>(path: string, body: object, headers?: Record<string, string>): Promise<T> {
		return this.enqueueRequest<T>({
			method: "PUT",
			path,
			body: new URLSearchParams({
				data: JSON.stringify(body),
			}).toString(),
			headers: headers
		});
	}

	async delete<T>(path: string, headers?: Record<string, string>): Promise<T> {
		return this.enqueueRequest<T>({
			method: "DELETE",
			path: path,
			headers: headers
		});
	}
}
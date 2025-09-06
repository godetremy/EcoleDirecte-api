import {EDRestManager} from "~/rest/RESTManager";
import {EDAuth2FAQuestion, EDAuth2FAResult, EDAuthResponse, EDCredentials} from "~/types/auth";
import {AUTH_2FA_GET, AUTH_2FA_POST, AUTH_LOGIN} from "~/rest/endpoints";
import {cleanJSON} from "~/utils/json";
import {ERROR_AUTH_2FA_BAD_ANSWER, ERROR_AUTH_BAD_CREDENTIALS, ERROR_AUTH_REQUIRE_2FA} from "~/const/error";
import {ED2FAError} from "~/types/error";

export class EDAuth {
	private restManager: EDRestManager;
	private credentials: EDCredentials;

	constructor(restManager: EDRestManager, credentials: EDCredentials) {
		this.restManager = restManager;
		this.credentials = credentials;
	}

	public async loginUsername(
		username: string,
		password: string,
		cn_key?: string,
		cv_key?: string,
		isRelogin?: boolean,
		keepSessionOpen?: boolean,
		deviceUUID?: string,
	): Promise<EDAuthResponse> {
		if (cn_key && !cv_key)
			throw new Error("If cn_key is provided, cv_key must be provided too.");
		if (!cn_key && cv_key)
			throw new Error("If cv_key is provided, cn_key must be provided too.");
		const authResponse = await this.restManager.post<EDAuthResponse>(
			AUTH_LOGIN(),
			cleanJSON({
				isReLogin: isRelogin ?? undefined,
				identifiant: username,
				motdepasse: password,
				cn: cn_key ?? undefined,
				cv: cv_key ?? undefined,
				sesouvenirdemoi: keepSessionOpen ?? undefined,
				uuid: deviceUUID ?? undefined,
			})
		);

		switch (authResponse.code) {
			case 250:
				authResponse.message = ERROR_AUTH_REQUIRE_2FA.message;
				const err: ED2FAError = Object.assign(
					ERROR_AUTH_REQUIRE_2FA,
					authResponse,
				);
				throw err;
			case 505:
				throw ERROR_AUTH_BAD_CREDENTIALS;
			default:
				Object.assign(this.credentials, { token: authResponse.token });
				return authResponse;
		}
	}

	public async get2FAQuestion(token: string, decodeQuestion: boolean = true): Promise<EDAuth2FAQuestion> {
		const questions = await this.restManager.post<EDAuth2FAQuestion>(
			AUTH_2FA_GET(),
			{},
			{ "X-Token": token }
		);

		if (decodeQuestion)
		{
			questions.data.question = Buffer.from(questions.data.question, "base64").toString("utf-8");
			for (let i = 0; i < questions.data.propositions.length; i++)
				questions.data.propositions[i] = Buffer.from(questions.data.propositions[i], "base64").toString("utf-8");
		}
		return questions;
	}

	public async send2FAQuestion(response: string, token: string, encoded: boolean = true): Promise<EDAuth2FAResult> {
		const finalResponse = encoded ? Buffer.from(response, "utf-8").toString("base64") : response;
		const res = await this.restManager.post<EDAuth2FAResult>(
			AUTH_2FA_POST(),
			{
				choix: finalResponse
			},
			{ "X-Token": token }
		);
		if (res.code === 505)
			throw ERROR_AUTH_2FA_BAD_ANSWER;
		return res;
	}
}
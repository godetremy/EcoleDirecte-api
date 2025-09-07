type EDResponse<T> = {
	code: number; // Status code
	token: string; // Token used for the request
	message?: string | null; // Additional message (null or undefined if no message)
	host: string; // Host used for the request
	data: T; // Data of the response
}
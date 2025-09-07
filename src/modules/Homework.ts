import {EDRestManager} from "~/rest/RESTManager";
import {EDCredentials} from "~/types/auth";
import {ERROR_AUTH_NO_SELECTED_ACCOUNT, ERROR_AUTH_NOT_LOGGED_IN, ERROR_HOMEWORK_INVALID_DATE} from "~/const/error";
import {HOMEWORK_GET} from "~/rest/endpoints";
import {convertAccountTypeToUrlPath} from "~/utils/account";
import {EDHomeworkDay} from "~/types/homework";
import {decodeBase64} from "~/utils/base64";

export class EDHomework {
	private restManager: EDRestManager;
	private credentials: EDCredentials;

	constructor(restManager: EDRestManager, credentials: EDCredentials) {
		this.restManager = restManager;
		this.credentials = credentials;
	}

	public async getHomeworkForDate(date: Date | number | string, decodeContent: boolean = true): Promise<EDResponse<EDHomeworkDay>> {
		if (!this.credentials.token)
			throw ERROR_AUTH_NOT_LOGGED_IN;
		if (!this.credentials.accountId || !this.credentials.accountType)
			throw ERROR_AUTH_NO_SELECTED_ACCOUNT;

		if (typeof date === "number")
			date = new Date(date);
		else if (typeof date === "string")
			date = new Date(Date.parse(date));
		if (isNaN(date.getTime()))
			throw ERROR_HOMEWORK_INVALID_DATE;

		const dateString = date.toISOString().split('T')[0]; // Format YYYY-MM-DD
		const homework = await this.restManager.post<EDResponse<EDHomeworkDay>>(
			HOMEWORK_GET(convertAccountTypeToUrlPath(this.credentials.accountType), this.credentials.accountId, dateString),
			{},
			{ "X-Token": this.credentials.token }
		);

		if (decodeContent)
			for (const subject of homework.data.matieres)
				subject.aFaire.contenu = decodeBase64(subject.aFaire.contenu);

		return homework;
	}
}
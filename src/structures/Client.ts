import {EDRestManager} from "~/rest/RESTManager";
import {EDCredentials} from "~/types/auth";
import {EDAuth} from "~/modules/Auth";
import {EDHomework} from "~/modules/Homework";

class EDClient {
	private restManager: EDRestManager;
	private credentials: EDCredentials = {};

	public auth: EDAuth;
	public homework: EDHomework;

	constructor(credentials?: EDCredentials) {
		if (credentials)
			this.credentials = credentials;
		this.restManager = new EDRestManager();

		this.auth = new EDAuth(this.restManager, this.credentials);
		this.homework = new EDHomework(this.restManager, this.credentials);
	}
}

export {
	EDClient
};
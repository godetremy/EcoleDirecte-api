import {EDRestManager} from "~/rest/RESTManager";
import {EDCredentials} from "~/types/auth";
import {EDAuth} from "~/modules/Auth";

class EDClient {
	private restManager: EDRestManager;
	private credentials: EDCredentials = {};

	public auth: EDAuth;

	constructor(credentials?: EDCredentials) {
		if (credentials)
			this.credentials = credentials;
		this.restManager = new EDRestManager();

		this.auth = new EDAuth(this.restManager, this.credentials);
	}
}

export {
	EDClient
};
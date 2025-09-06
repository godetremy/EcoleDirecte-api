import {EDAccount} from "~/types/account";

interface EDCredentials {
	token?: string;
}

interface EDAuthResponse {
	code: number;
	token: string;
	message: string;
	data: {
		changementMDP: boolean;
		nbJourMdpExire: number;
		accounts: EDAccount[];
	};
}

interface EDAuth2FAQuestion {
	code: number; // Status code
	data: {
		question: string; // 2FA question to be answered
		propositions: string[]; // Possible answers
	},
	message: string | null; // Additional message (null in this case)
	host: string; // Host used for the request
}

interface EDAuth2FAResult {
	code: number; // Status code
	data: {
		cn: string; // Key for validating the 2FA response
		cv: string; // Key for validating the 2FA response
	},
	message: string | null; // Additional message (null in this case)
	host: string; // Host used for the request
}

export type {
	EDCredentials,
	EDAuthResponse,
	EDAuth2FAQuestion,
	EDAuth2FAResult
};
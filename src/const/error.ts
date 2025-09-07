import {ED2FAError} from "~/types/error";

export const generateError = (message: string, name: string) => {
	const error = new Error(message);
	error.name = name;
	return error;
}

export const ERROR_AUTH_BAD_CREDENTIALS: Error = generateError("The provided credentials are invalid.", "ED_AUTH_BAD_CREDENTIALS");
export const ERROR_AUTH_2FA_BAD_ANSWER: Error = generateError("The provided 2FA answer is invalid.", "ED_AUTH_2FA_BAD_ANSWER");
export const ERROR_AUTH_REQUIRE_2FA: ED2FAError = generateError("This account require 2FA to login.", "ED_AUTH_2FA_REQUIRED") as ED2FAError;
export const ERROR_AUTH_NOT_LOGGED_IN: Error = generateError("You must be logged in to perform this action.", "ED_AUTH_NOT_LOGGED_IN");
export const ERROR_AUTH_NO_SELECTED_ACCOUNT: Error = generateError("No account selected. Please select an account first.", "ED_AUTH_NO_SELECTED_ACCOUNT");


export const ERROR_HOMEWORK_INVALID_DATE: Error = generateError("The provided date is invalid.", "ED_HOMEWORK_INVALID_DATE");
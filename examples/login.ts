import {ED2FAError, EDClient} from "../src";
import {EDAuthResponse} from "../src/types/auth";
import * as readline from "node:readline";
import * as dotEnv from "dotenv";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

void async function main () {
	dotEnv.config({quiet: true});

	if (!process.env.ED_USERNAME || !process.env.ED_PASSWORD)
		throw new Error("Please set ED_USERNAME and ED_PASSWORD environment variables.");

	const instance = new EDClient();

	let userToken: EDAuthResponse | undefined = undefined;

	try {
		userToken = await instance.auth.loginUsername(process.env.ED_USERNAME, process.env.ED_PASSWORD);
	} catch (e) {
		if (e.name === "ED_AUTH_2FA_REQUIRED") {
			console.error("This account require 2FA to login. Getting question...");
			const err = e as ED2FAError;
			const question = await instance.auth.get2FAQuestion(err.token);
			console.log("Question:", question.data.question);
			for (const [index, proposition] of question.data.propositions.entries()) {
				console.log(`[${index}] ${proposition}`);
			}

			let answer: string | undefined = undefined;
			let skip = false;
			while (answer === undefined) {
				rl.question('>', response => {
					if (isNaN(Number(response)) || Number(response) < 0 || Number(response) >= question.data.propositions.length) {
						console.log("Invalid answer.");
						skip = true;
						return;
					}
					answer = response;
					rl.close();
				});
				while (answer === undefined && !skip) {
					await new Promise(resolve => setTimeout(resolve, 100));
				}
				skip = false;
			}

			console.log("Answering question...");
			let keys = await instance.auth.send2FAQuestion(question.data.propositions[Number(answer)], err.token);
			userToken = await instance.auth.loginUsername(process.env.ED_USERNAME, process.env.ED_PASSWORD, keys.data.cn, keys.data.cv);
		} else {
			console.error("An error occurred while logging in:", e);
		}
	} finally {
		if (userToken) {
			console.log("Login successful");
			console.log("Token:", userToken.token);

			console.log("Accounts:");
			for (const account of userToken.data.accounts) {
				console.log(`- ${account.prenom} ${account.nom} (${account.typeCompte} / ${account.id})`);
			}
		} else {
			console.log("Login failed");
		}
		process.exit(0);
	}
}();
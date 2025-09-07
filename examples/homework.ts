import {EDClient} from "../src";
import * as dotEnv from "dotenv";
import {EDAccountKind} from "../src/types/account";

void async function main() {
	dotEnv.config({quiet: true});

	if (!process.env.ED_TOKEN || !process.env.ED_ACCOUNT_TYPE || !process.env.ED_ACCOUNT_ID)
		throw new Error("Please set ED_TOKEN, ED_ACCOUNT_TYPE and ED_ACCOUNT_ID environment variables.");

	const instance = new EDClient({
		token: process.env.ED_TOKEN,
		accountType: process.env.ED_ACCOUNT_TYPE as EDAccountKind,
		accountId: Number(process.env.ED_ACCOUNT_ID),
	});

	const homework = await instance.homework.getHomeworkForDate(new Date("2025-09-08"));

	for (let subject of homework.data.matieres) {
		console.log(`${subject.matiere} - ${subject.nomProf}`);
		console.log(`${subject.aFaire.contenu}`);
		console.log('---');
	}

	if (homework.data.matieres.length > 0) {
		console.log("Marking first homework as done...");
		let response = await instance.homework.markHomeworkAsDone(homework.data.matieres[0].aFaire.idDevoir);
		console.log("Success:", response.code === 200);
		console.log("Marking first homework as not done...");
		console.log("Success:", (await instance.homework.markHomeworkAsNotDone(homework.data.matieres[0].aFaire.idDevoir)).code === 200);
	}

	process.exit(0);
}();
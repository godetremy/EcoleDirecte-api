import {EDAccountKind} from "~/types/account";

function convertAccountTypeToUrlPath(type: EDAccountKind): string {
	switch (type) {
		case EDAccountKind.Student:
			return "Eleves";
		case EDAccountKind.Family1:
			return "rdt";
		case EDAccountKind.Family2:
			return "rdt";
		case EDAccountKind.Teacher:
			return "enseignants";
		case EDAccountKind.Staff:
			return "A";
		default:
			throw new Error("Invalid account type");
	}
}

export {
	convertAccountTypeToUrlPath
}
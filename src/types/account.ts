import {EDModule} from "~/types/module";
import {EDClass} from "~/types/class";

enum EDAccountKind {
	Student = "E",
	Family1 = "1",
	Family2 = "2",
	Staff = "A",
	Teacher = "P"
}

interface EDAccountIndividualSettings {
	lsuPoilDansLaMainBorne1: string; // ???
	lsuPoilDansLaMainBorne2: string; // ???
	lsuPoilDansLaMainBorne3: string; // ???
	modeCalculLSU: string; // ???
	isQrCode: boolean; // ???
	accessibilitéVisuelle: string; // Has dyslexia font enabled
	typeSaisieNotesDefaut: string; // ???
	nbJoursMaxRenduDevoirCDT: string; // ???
	typeViewCDTDefaut: string;
}

interface EDAccountProfile {
	sexe: "M" | "F" | string;
	infoEDT: string; // ???
	nomEtablissement: string; // Name of the school
	idEtablissement: string; // ID of the school
	rneEtablissement: string; // RNE code of the school
	telPortable: string; // Mobile phone number
	idReelEtab: string; // Same as idEtablissement
	photo: string; // URL of the profile picture
	estApprenant: boolean; // Is a trainee
	classe: EDClass;
}

interface EDAccount {
	idLogin: number; // Cookie settings to know if the user is logged in by username / password
	id: number; // User ID
	uid: string; // Device UUID
	identifiant: string; // Username
	typeCompte: EDAccountKind;
	codeOgec: string; // RNE code of the school
	main: boolean; // Is main account (for family accounts)
	lastConnexion: string; // Last connection date
	civilite: string; // Mr / Mrs (rarely used)
	prenom: string; // First name
	particule: string; // ???
	nom: string; // Last name
	email: string; // Email address
	anneeScolaireCourante: string; // Current school year as "20XX-20XX" format
	nomEtablissement: string; // Name of the school
	logoEtablissement: string; // URL of the school logo picture
	couleurAgendaEtablissement: string; // Hex color of the agenda for the school
	dicoEnLigneLeRobert: boolean; // Has access to the Robert dictionary
	socketToken: string; // Token used for WebSocket connections
	modules: EDModule[]; // List of modules available for the user
	parametresIndividuels: EDAccountIndividualSettings; // Individual settings of the user

}

export type {
	EDAccount,
	EDAccountKind,
	EDAccountProfile,
	EDAccountIndividualSettings
}
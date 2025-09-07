interface EDLessonContent {
	commentaires: Array<any>; // Comments (unknown structure)
	contenu: string; // Content of the lesson
	documents: Array<any>; // Documents (unknown structure)
}

interface EDHomework {
	cdtPersonnalises: Array<any>; // Custom fields (unknown structure)
	commentaires: Array<any>; // Comments (unknown structure)
	contenu: string; // Content of the homework
	contenuDeSeance: EDLessonContent; // Content of the lesson
	documents: Array<any>; // Documents (unknown structure)
	documentsRendus: Array<any>; // Submitted documents (unknown structure)
	documentsRendusDeposes: boolean; // Are submitted documents uploaded
	donneLe: string; // Given date
	effectue: boolean; // Is done
	elementsProg: Array<any>; // Program elements (unknown structure)
	idDevoir: number; // Homework ID
	liensManuel: Array<any>; // Manual links (unknown structure)
	rendreEnLigne: boolean; // Is to be submitted online
	ressource: string; // ???
	ressourceDocuments: Array<any>; // Resource documents (unknown structure)
	tags: Array<any>; // Tags (unknown structure)
}

interface EDHomeworkSubject {
	aFaire: EDHomework; // Homework to be done
	blogActif: boolean; // ???
	codeMatiere: string; // Subject code
	entityCode: string; // Class code
	entityLibelle: string; // Class name
	entityType: string; // Entity type (usually "C" for class)
	id: boolean; // Subject ID
	interrogation: boolean; // Is a test
	matiere: string; // Subject name
	nbJourMaxRenduDevoir: number; // Max days to submit homework
	nomProf: string; // Teacher name
}

interface EDHomeworkDay {
	date: string; // Date of the homework
	matieres: EDHomeworkSubject[]; // Subjects with homework
}

export type {
	EDHomework,
	EDHomeworkDay,
	EDHomeworkSubject,
	EDLessonContent
}
interface EDModule {
	code: string; // Identifier of the module
	enable: boolean; // Is the module enabled in the school
	ordre: number; // Order of the module in the sidebar
	badge: number; // unused
	params: object; // Parameters of the module (depends on the module)
}

export type {
	EDModule
};
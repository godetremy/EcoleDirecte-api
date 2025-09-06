function cleanJSON(obj: any): any {
	const keys = Object.keys(obj);
	for (const key of keys) {
		if (obj[key] && typeof obj[key] === 'object') {
			cleanJSON(obj[key]);
		} else if (obj[key] === undefined) {
			delete obj[key];
		}
	}
	return obj;
}

export {
	cleanJSON
};
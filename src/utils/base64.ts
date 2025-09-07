function decodeBase64(base64String: string): string {
	return Buffer.from(base64String, 'base64').toString('utf-8');
}

function encodeBase64(plainString: string): string {
	return Buffer.from(plainString, 'utf-8').toString('base64');
}

export {
	decodeBase64,
	encodeBase64
}
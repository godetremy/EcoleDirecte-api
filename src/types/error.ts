interface ED2FAError extends Error {
	code: number; // Error code (250 in this case)
	token: string; // Token to be used for 2FA verification
	data: {
		totp: boolean; // Indicates if TOTP 2FA is required
	}
}

export type {
	ED2FAError
}
export const AUTH_LOGIN = () => "/v3/login.awp";
export const AUTH_2FA_GET = () => "/v3/connexion/doubleauth.awp?verbe=get";
export const AUTH_2FA_POST = () => "/v3/connexion/doubleauth.awp?verbe=post";

export const HOMEWORK_GET = (accountType: string, accountId: number, date: string) => `/v3/${accountType}/${accountId}/cahierdetexte/${date}.awp?verbe=get`;
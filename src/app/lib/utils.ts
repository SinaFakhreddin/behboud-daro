import { jwtDecode } from "jwt-decode";

export interface IDecodedJwtToken {
	sub: string;
	clientId: string;
	name: string;
	iat: number;
	exp: number;
	user_id: string;
	customer_id: string;
	user_name: string;
}

export function jwtDecodeToken(token: string): IDecodedJwtToken {
	return jwtDecode(token);
}

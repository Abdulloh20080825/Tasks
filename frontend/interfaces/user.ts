export interface User {
	_id: object;
	username: string;
	email: string;
	password: string;
	active: boolean;
	activationCode: string;
}

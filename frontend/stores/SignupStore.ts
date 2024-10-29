import { makeAutoObservable } from 'mobx';

class SignupStore {
	username: string = '';
	email: string = '';
	password: string = '';
	confirmPassword: string = '';
	loading: boolean = false;
	constructor() {
		makeAutoObservable(this);
	}
	setUsername(username: string) {
		this.username = username;
	}

	setEmail(email: string) {
		this.email = email;
	}

	setPassword(password: string) {
		this.password = password;
	}

	setConfirmPassword(confirmPassword: string) {
		this.confirmPassword = confirmPassword;
	}
	isValid() {
		return (
			this.username.length > 0 &&
			this.email.includes('@') &&
			this.password.length > 6 &&
			this.password === this.confirmPassword
		);
	}

	reset() {
		this.username = '';
		this.email = '';
		this.password = '';
		this.confirmPassword = '';
	}
}

const signupStore = new SignupStore();
export default signupStore;

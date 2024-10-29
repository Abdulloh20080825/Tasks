import { makeAutoObservable } from 'mobx';

class SigninStore {
	email: string = '';
	password: string = '';
	loading: boolean = false;
	constructor() {
		makeAutoObservable(this);
	}
	setEmail(email: string) {
		this.email = email;
	}
	setPassword(password: string) {
		this.password = password;
	}
	isValid() {
		if (this.email.includes('@') && this.password.length > 6) {
			return true;
		} else return false;
	}
	reset() {
		this.email = '';
		this.password = '';
	}
}

const signinStore = new SigninStore();
export default signinStore;

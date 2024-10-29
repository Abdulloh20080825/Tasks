import { User } from '@/interfaces/user';
import { axiosInstance } from '@/server/api';
import { makeAutoObservable, runInAction } from 'mobx';

class GetUserInfoStore {
	user: User = null;
	loading: boolean = false;
	error: string | null = null;
	constructor() {
		makeAutoObservable(this);
	}

	async fetchData() {
		this.loading = true;
		this.error = null;

		try {
			const res = await axiosInstance.get('/get-user-info');
			runInAction(() => {
				console.log(res);
				this.user = res.data.user;
				this.loading = false;
			});
		} catch (err: any) {
			runInAction(() => {
				console.error(err);
				this.error = err;
			});
		}
	}

	logout() {
		this.user = null;
	}
}

const getUserStore = new GetUserInfoStore();
export default getUserStore;

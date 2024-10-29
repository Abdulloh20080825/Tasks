import Tasks from '@/interfaces/tasks';
import { makeAutoObservable } from 'mobx';

class SortTasksStore {
	start: Tasks[] = [];
	inProcess: Tasks[] = [];
	done: Tasks[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	sortByStart(tasks: Tasks[]) {
		this.start = tasks.filter((x) => x.status === 'start');
	}

	sortByProcess(tasks: Tasks[]) {
		this.inProcess = tasks.filter((x) => x.status === 'process');
	}

	sortByDone(tasks: Tasks[]) {
		this.done = tasks.filter((x) => x.status === 'done');
	}
}

const SortTasks = new SortTasksStore();
export default SortTasks;

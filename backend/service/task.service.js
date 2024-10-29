const Task = require('../models/Task');

class TaskService {
	async getUserTasks(userId) {
		try {
			const tasks = await Task.find();
			const userTasks = tasks.filter((x) => x.user.toString() === userId);
			return userTasks;
		} catch (error) {
			throw new Error('Something went wrong with service');
		}
	}
	async create(title, week, year, userId) {
		try {
			const task = new Task({
				title,
				week,
				year,
				user: userId,
				status: 'start',
			});

			await task.save();
			return task;
		} catch (error) {
			throw new Error('Something went wrong with service');
		}
	}
	async update(id, status) {
		try {
			const updatedTask = await Task.findByIdAndUpdate(
				id,
				{ status },
				{ new: true }
			);
			return updatedTask;
		} catch (error) {
			throw new Error('Error while updating task');
		}
	}

	async delete(taskId) {
		try {
			const deletedTask = Task.findByIdAndDelete(taskId);
			return deletedTask;
		} catch (error) {
			throw new Error('Error while deleting task');
		}
	}
}

module.exports = new TaskService();

const taskService = require('../service/task.service');

class TaskController {
	async getAllTasks(req, res) {
		try {
			const user = req.user._id;
			if (!user) {
				return res.status(400).json({
					message: 'User not found',
					error: true,
				});
			}
			const tasks = await taskService.getUserTasks(user);

			return res.status(200).json({
				message: 'Tasks found successfuly',
				tasks,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Something went wrong. Please try again later',
				error: true,
			});
		}
	}
	async create(req, res) {
		try {
			const { title, week, year } = req.body;
			if (!title) {
				return res.status(400).json({
					message: 'Title is required',
					error: true,
				});
			}

			const createRes = await taskService.create(
				title,
				week,
				year,
				req.user._id
			);
			return res.status(200).json({
				message: 'Task successfully created',
				task: createRes,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Something went wrong. Please try again later',
				error: true,
			});
		}
	}

	async update(req, res) {
		try {
			const id = req.params.id;
			const { status } = req.body;

			if (!status) {
				return res.status(400).json({
					message: 'Status is required',
					error: true,
				});
			}

			const updatedTask = await taskService.update(id, status);
			return res.status(200).json({
				message: 'Task successfully updated',
				task: updatedTask,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Something went wrong. Please try again later',
				error: true,
			});
		}
	}
	async delete(req, res) {
		try {
			const id = req.params.id;
			const deletedTask = await taskService.delete(id);

			return res.status(200).json({
				message: 'Successfuly deleted',
				deletedTask,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Something went wrong. Please try again later',
				error: true,
			});
		}
	}
}

module.exports = new TaskController();

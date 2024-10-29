'use client';

import Sidebar from '@/components/Sidebar';
import SortTasks from '@/stores/SortTasksStore';
import { Button } from '@nextui-org/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Tasks from '@/interfaces/tasks';
import getUserStore from '@/stores/getUserInfoStore';
import { MdDelete } from 'react-icons/md';

import { axiosInstance } from '@/server/api';
import moment from 'moment';
const Page: React.FC = observer(() => {
	const [value, setValue] = useState<string>('');
	const date = new Date();

	useEffect(() => {
		const getUserTasks = async () => {
			const res = await axiosInstance.get('/get-user-tasks');
			SortTasks.sortByProcess(res.data.tasks);
			SortTasks.sortByDone(res.data.tasks);
			SortTasks.sortByStart(res.data.tasks);
		};

		if (localStorage.getItem('token')) {
			getUserStore.fetchData();
			getUserTasks();
		}
	}, []);

	const onDeleteTask = async (taskId: string, status: string) => {
		try {
			const res = await axiosInstance.delete(`/delete-task/${taskId}`);

			switch (status) {
				case 'start':
					SortTasks.start = SortTasks.start.filter((x) => x._id !== taskId);
					break;
				case 'process':
					SortTasks.inProcess = SortTasks.inProcess.filter(
						(x) => x._id !== taskId
					);
					break;
				case 'done':
					SortTasks.done = SortTasks.done.filter((x) => x._id !== taskId);
					break;
				default:
					console.warn('Unknown task status:', status);
			}

			console.log(res);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAddTask = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const date = new Date();
		console.log(date);
		const createdWeekDate = moment(date).format('DD.MM');
		console.log(createdWeekDate);
		const createdYearDate = moment(date).format('MMMM.DD');
		console.log(createdYearDate);
		try {
			const res = await axiosInstance.post('/create-task', {
				title: value,
				week: createdWeekDate,
				year: createdYearDate,
			});
			SortTasks.start.push(res.data.task);
			setValue('');
		} catch (error) {
			console.error(error);
		}
	};

	const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};
	const dragStartHandler = (
		e: React.DragEvent<HTMLDivElement>,
		task: Tasks
	) => {
		e.dataTransfer.setData('taskId', task._id.toString());
	};
	const dropHandler = async (
		e: React.DragEvent<HTMLDivElement>,
		newStatus: 'start' | 'process' | 'done'
	) => {
		e.preventDefault();
		const taskId = e.dataTransfer.getData('taskId');
		try {
			const res = await axiosInstance.put(`/update-task/${taskId}`, {
				status: newStatus,
			});
			const updatedTask = res.data.task;
			SortTasks.start = SortTasks.start.filter(
				(task) => task._id !== updatedTask._id
			);
			SortTasks.inProcess = SortTasks.inProcess.filter(
				(task) => task._id !== updatedTask._id
			);
			SortTasks.done = SortTasks.done.filter(
				(task) => task._id !== updatedTask._id
			);
			if (updatedTask.status === 'start') {
				SortTasks.start.push(updatedTask);
			} else if (updatedTask.status === 'process') {
				SortTasks.inProcess.push(updatedTask);
			} else if (updatedTask.status === 'done') {
				SortTasks.done.push(updatedTask);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='flex min-h-screen bg-gray-900 text-white'>
			<Sidebar />
			<div className='w-full p-6'>
				<header className='bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-700 p-4 rounded-lg shadow-lg mb-6'>
					<p className='text-xl font-semibold'>
						Today{' '}
						<span className='font-semibold'>
							{`${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${
								date.getMonth() + 1
							}.${date.getFullYear()}`}
						</span>
					</p>
				</header>

				<div className='grid grid-cols-3 gap-6'>
					<div
						className='bg-gradient-to-br from-purple-600 to-indigo-600 p-4 rounded-lg shadow-lg'
						onDrop={(e) => dropHandler(e, 'start')}
						onDragOver={(e) => dragOverHandler(e)}
					>
						<p className='font-semibold text-lg mb-4'>To do</p>
						<div className='mt-4'>
							{SortTasks.start.map((task) => (
								<div
									key={task._id}
									onDragStart={(e) => dragStartHandler(e, task)}
									className='bg-gray-800 p-2 rounded-lg mb-2 cursor-grab flex items-center justify-between'
									draggable={true}
								>
									<p>{task.title}</p>
									<MdDelete
										size={20}
										className='text-red-600 cursor-pointer'
										onClick={() => onDeleteTask(task._id, 'start')}
									/>
								</div>
							))}
						</div>
						<form className='space-y-4' onSubmit={handleAddTask}>
							<input
								type='text'
								placeholder='Enter task'
								onChange={(e) => setValue(e.target.value)}
								value={value}
								name='title'
								className='w-full p-2 rounded-lg bg-gray-800 text-white border focus:outline-none focus:ring-2'
							/>
							<Button
								type='submit'
								variant='shadow'
								disabled={localStorage.getItem('token') ? false : true}
								color='primary'
								className='w-full'
							>
								Add Task
							</Button>
						</form>
					</div>
					<div
						className='bg-gradient-to-br from-purple-600 to-indigo-600 p-4 rounded-lg shadow-lg'
						onDrop={(e) => dropHandler(e, 'process')}
						onDragOver={(e) => dragOverHandler(e)}
					>
						<p className='font-semibold text-lg'>In process</p>
						<div className='mt-4'>
							{SortTasks.inProcess.map((task) => (
								<div
									key={task._id}
									onDragStart={(e) => dragStartHandler(e, task)}
									className='bg-gray-800 p-2 rounded-lg mb-2 cursor-grab flex items-center justify-between'
									draggable={true}
								>
									<p>{task.title}</p>
									<MdDelete
										size={20}
										className='text-red-600 cursor-pointer'
										onClick={() => onDeleteTask(task._id, 'process')}
									/>
								</div>
							))}
						</div>
					</div>
					<div
						className='bg-gradient-to-br from-purple-600 to-indigo-600 p-4 rounded-lg shadow-lg'
						onDrop={(e) => dropHandler(e, 'done')}
						onDragOver={(e) => dragOverHandler(e)}
					>
						<p className='font-semibold text-lg'>Done</p>
						<div className='mt-4'>
							{SortTasks.done.map((task) => (
								<div
									key={task._id}
									onDragStart={(e) => dragStartHandler(e, task)}
									className='bg-gray-800 p-2 rounded-lg mb-2 cursor-grab flex justify-between items-center'
									draggable={true}
								>
									<p>{task.title}</p>
									<MdDelete
										size={20}
										className='text-red-600 cursor-pointer'
										onClick={() => onDeleteTask(task._id, 'done')}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export default Page;

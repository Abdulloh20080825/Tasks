'use client';

import React, { useEffect, useState } from 'react';
import { Button, Tabs, Tab, useDisclosure } from '@nextui-org/react';
import { main } from '@/constants/logo';
import Image from 'next/image';
import Footer from './Footer';
import { tab_content } from '@/styles/tab';
import getUserStore from '@/stores/getUserInfoStore';
import { useRouter } from 'next/navigation';
import { FaAngleRight, FaGithub } from 'react-icons/fa';
import TeamModal from './TeamModal';

const Home: React.FC = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const router = useRouter();
	const [token, setToken] = useState<string | null>(null);
	useEffect(() => {
		const localToken = localStorage.getItem('token');
		if (localToken) {
			setToken(localToken);
			getUserStore.fetchData();
		}
	}, []);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-slate-900 to-black '>
			<header className='text-center my-10'>
				<h1 className='text-4xl font-bold text-blue-600 dark:text-blue-400'>
					Welcome to Online Tasks
				</h1>
				<p className='text-lg text-gray-600 dark:text-gray-300 mt-4'>
					Organize your tasks and projects easily with our Online Tasks
				</p>
			</header>

			<main className='flex justify-between items-center mb-24 container mx-auto relative px-32'>
				{token ? (
					<div className='flex flex-col space-y-3'>
						<h1 className='text-4xl '>
							Move fast, stay aligned, and build better - together
						</h1>
						<p>The #1 software development tool used by astrum teams</p>
						<div>
							<Button
								color='primary'
								variant='bordered'
								onClick={() => router.push('/tasks')}
							>
								Go to the Tasks
							</Button>
						</div>
					</div>
				) : (
					<div className='flex flex-col space-y-3'>
						<h1 className='text-4xl '>
							First, we{"'"}ll create an account for you.
						</h1>
						<p>The #1 software development tool used by astrum teams</p>
						<div>
							<Button
								color='primary'
								variant='shadow'
								onClick={() => router.push('/signup')}
							>
								Create account <FaAngleRight />
							</Button>
						</div>
					</div>
				)}

				<div>
					<Image
						src={main}
						alt='Main Page Image'
						className='rotate-12  mt-5'
						width={500}
						height={500}
					/>
				</div>
			</main>

			<div className='container relative border-2 rounded p-5 border-slate-800 h-72 overflow-scroll bg-gradient-to-t from-slate-900 to-black shadow-lg shadow-blue-950'>
				<Tabs
					aria-label='Tabs variants'
					className='mb-8 shadow-xl overflow-hidden shadow-blue-950'
					variant='underlined'
					color='primary'
				>
					<Tab key='overview' title='Overview'>
						<p className={tab_content + ' text-blue-300'}>
							<span className='text-indigo-400 font-semibold'>Overview</span> of
							the features and benefits of using Online Tasks.
						</p>
					</Tab>
					<Tab key='features' title='Features'>
						<p className={tab_content + ' text-blue-300'}>
							<span className='text-indigo-400 font-semibold'>Explore</span> the
							powerful features available for task management. Very beautiful
							website design.
						</p>
					</Tab>
					<Tab key='usage' title='Usage'>
						<div className=''>
							<p className={tab_content + ' text-blue-300'}>
								To get started with{' '}
								<span className='text-indigo-400 font-bold'>Online Tasks</span>,
								follow these simple steps:
							</p>
							<ul className='text-blue-300 list-disc list-inside mt-4 space-y-2'>
								<li>
									Sign up for an account using the{' '}
									<b className='font-semibold'>Sign Up</b> button.
								</li>
								<li>
									After registration, We send a secret code to your email.
								</li>
								<li>
									Enter the code to complete your registration and log in.
								</li>
								<li>
									Create new tasks by clicking on the{' '}
									<b className='font-semibold'>Add Task</b> button and filling
									in task details like title, description, and due date.
								</li>
								<li>
									Organize your tasks into different boards or categories for
									better management.
								</li>
								<li>
									Use drag-and-drop to prioritize tasks and move them between
									boards.
								</li>
							</ul>
							<p className={tab_content + ' text-blue-300 mt-4'}>
								Enjoy a seamless task management experience with Online Tasks!
							</p>
						</div>
					</Tab>

					<Tab key='contact' title='Contact Us'>
						<div className='p-6 bg-gray-800 text-white rounded-lg shadow-lg'>
							<p className='mb-4'>
								<b className='font-semibold text-indigo-400'>Frontend Devs:</b>{' '}
								<span className='text-blue-300'>Abdulloh Qurbonov</span>{' '}
								<span className='text-blue-300'>Islombeek Musayev</span>
							</p>
							<p>
								<b className='font-semibold text-indigo-400'>Backend Devs:</b>{' '}
								<span className='text-blue-300'>Ilyoson Begzad</span>
							</p>
						</div>
						<FaGithub
							className='absolute bottom-0 right-6 cursor-pointer'
							size={30}
							onClick={onOpen}
						/>
					</Tab>
				</Tabs>
			</div>

			<TeamModal onOpenChange={onOpenChange} isOpen={isOpen} />
			<Footer />
		</div>
	);
};

export default Home;

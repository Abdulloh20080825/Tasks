'use client';

import Sidebar from '@/components/Sidebar';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
	const router = useRouter();
	const currentDate = new Date();
	const daysOfMonth = [];
	for (let i = 0; i < 30; i++) {
		const day = moment(currentDate).subtract(i, 'days');
		daysOfMonth.push({
			dayMonth: day.format('MMMM'),
			dayNumber: day.format('DD'),
			query: day.format('MMMM.DD'),
		});
	}

	return (
		<div className='flex bg-gray-900 min-h-screen'>
			<Sidebar />
			<div className='flex flex-col w-full p-4 overflow-scroll'>
				<h1 className='text-2xl font-bold text-white mb-6'>Monthly Tasks</h1>
				<div className='flex flex-row space-x-5 overflow-x-auto pb-2'>
					{daysOfMonth.map((item, idx) => (
						<div
							key={idx}
							className='flex flex-col w-64 items-center justify-center px-4 py-6 rounded-lg cursor-pointer border border-purple-500 hover:bg-purple-500 hover:text-white transition-colors'
							onClick={() => router.push(`/tasks/monthly/${item.query}`)}
						>
							<span className='text-sm text-gray-300'>{item.dayMonth}</span>
							<span className='text-2xl font-bold text-white'>
								{item.dayNumber}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Page;

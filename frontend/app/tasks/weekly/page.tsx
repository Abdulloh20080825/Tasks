import Sidebar from '@/components/Sidebar';
import React from 'react';
import moment from 'moment';
import Link from 'next/link';

const Page = () => {
	const currentDate = new Date();
	const daysOfWeek = [];
	for (let i = 0; i < 7; i++) {
		const day = moment(currentDate).subtract(i, 'days');
		daysOfWeek.push({
			dayName: day.format('dddd'),
			dayNumber: day.format('DD.MM'),
		});
	}

	return (
		<div className='flex bg-gray-900'>
			<Sidebar />
			<div className='flex flex-col w-full p-4'>
				<header className='mb-7'>
					<p className='text-xl font-bold mb-4'>Weekly Tasks</p>
					<div className='flex space-x-4 overflow-scroll '>
						{daysOfWeek.map((day, index) => (
							<Link href={`/tasks/weekly/${day.dayNumber}`} key={index}>
								<div
									className={`flex flex-col items-center justify-center px-10 h-20 p-2 rounded cursor-pointer border border-purple-500`}
								>
									<span className='text-sm'>{day.dayName}</span>
									<span className='text-xl font-bold'>{day.dayNumber}</span>
								</div>
							</Link>
						))}
					</div>
				</header>
			</div>
		</div>
	);
};

export default Page;

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import AddDayModal from './AddDayModal';
import { Button, useDisclosure } from '@nextui-org/react';
import getUserStore from '@/stores/getUserInfoStore';

const Sidebar: React.FC = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const pathname = usePathname();
	const { user } = getUserStore;

	return (
		<div className='min-h-[90vh] bg-gray-900 text-white p-4 w-[25%]'>
			{!user ? null : (
				<div className='flex items-center space-x-3 mb-6'>
					<div className='w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center'>
						<span className='text-2xl font-bold'>
							{user.username?.charAt(0)}
						</span>
					</div>
					<div>
						<h2 className='text-lg font-semibold'>{user.username}</h2>
						<p className='text-sm text-gray-400'>{user.email}</p>
					</div>
				</div>
			)}

			<div className='space-y-2'>
				<div
					className={`${
						pathname === '/tasks'
							? 'border-purple-600 bg-purple-700'
							: 'border-gray-600'
					} py-2 px-4 rounded-lg border cursor-pointer`}
				>
					<Link href='/tasks'>
						<h3 className='font-medium'>Today Tasks</h3>
					</Link>
				</div>

				<div
					className={`py-2 px-4 border ${
						pathname === '/tasks/weekly'
							? 'border-purple-600 bg-purple-700'
							: 'border-gray-600'
					} rounded-lg cursor-pointer`}
				>
					<Link href='/tasks/weekly'>
						<h3 className='font-medium'>Weekly Tasks</h3>
					</Link>
				</div>

				<div
					className={`py-2 px-4 border ${
						pathname === '/tasks/monthly'
							? 'border-purple-600 bg-purple-700'
							: 'border-gray-600'
					} rounded-lg cursor-pointer`}
				>
					<Link href='/tasks/monthly'>
						<h3 className='font-medium'>Monthly Tasks</h3>
					</Link>
				</div>

				<div className='py-2 px-4 border border-gray-600 rounded-lg cursor-pointer'>
					<Button
						className='font-medium w-full'
						variant='shadow'
						color='success'
						onPress={onOpen}
					>
						+ add special day
					</Button>
				</div>
				<AddDayModal isOpen={isOpen} onOpenChange={onOpenChange} />
			</div>
		</div>
	);
};

export default Sidebar;

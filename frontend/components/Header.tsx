'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/calendar.png';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import getUserStore from '@/stores/getUserInfoStore';

const Header: React.FC = () => {
	const [token, setToken] = useState<boolean>(false);
	const router = useRouter();

	const logoutHandler = () => {
		localStorage.clear();
		getUserStore.logout();
		setToken(false);
		router.push('/signin');
	};

	useEffect(() => {
		if (localStorage.getItem('token') || getUserStore.user) {
			setToken(true);
		} else {
			setToken(false);
		}
	}, []);

	return (
		<header className='fixed top-0 w-full p-4 h-[10vh] bg-slate-900 z-10'>
			<div className='container mx-auto flex justify-between items-center'>
				<div className='flex items-center'>
					<Image src={logo} alt='Calendar' width={30} height={30} />
					<Link href={'/'}>
						<h1 className='ml-4 text-xl font-bold cursor-pointer'>
							Online Tasks
						</h1>
					</Link>
				</div>
				{token ? (
					<div>
							<Button color='danger' variant='shadow' onClick={logoutHandler}>
								Log out
						</Button>
					</div>
				) : (
					<div className='flex space-x-5'>
						<Button
							variant='shadow'
							color='primary'
							onClick={() => router.push('/signup')}
						>
							Get it Free
						</Button>
						<Button
							color='success'
							variant='shadow'
							onClick={() => router.push('/signin')}
						>
							Login
						</Button>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;

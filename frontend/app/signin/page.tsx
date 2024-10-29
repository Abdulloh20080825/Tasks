'use client';

import { EyeFilledIcon } from '@/assets/EyeFieldIcon';
import { EyeSlashFilledIcon } from '@/assets/EyeSlashFielcon';
import { Button, Input, Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import signinStore from '@/stores/SigninStore';
import { axiosInstance } from '@/server/api';
import { useRouter } from 'next/navigation';

const Signin = observer(() => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const toggleVisibility = () => setIsVisible(!isVisible);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signinStore.loading = true;
		if (signinStore.isValid()) {
			const { email, password } = signinStore;
			try {
				const res = await axiosInstance.post('/login', { email, password });
				localStorage.setItem('token', res.data.accessToken);
				router.push('/');
				signinStore.reset();
				window.location.reload();
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				setError(error.response.data.message);
				signinStore.reset();
			} finally {
				signinStore.loading = false;
			}
			signinStore.reset();
		} else {
			setError('All field is required');
			signinStore.loading = false;
		}
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('token')) {
				router.push('/');
			}
		}
	}, []);

	return (
		<div className='flex items-center justify-center min-h-[90vh] bg-gradient-to-t from-gray-900 to-black'>
			<div className='bg-gray-800 rounded-lg shadow-inner shadow-sky-600 p-8 max-w-md w-full border border-gray-700'>
				<h2 className='text-3xl font-bold text-center text-cyan-400 mb-6'>
					Sign In
				</h2>
				{error ? (
					<p className='text-red-600 font-semibold mb-3'>{error}</p>
				) : null}
				<form className='space-y-4' onSubmit={handleSubmit}>
					<div>
						<Input
							type='email'
							label='Email'
							name='email'
							variant='bordered'
							className='w-full'
							value={signinStore.email}
							onChange={(e) => signinStore.setEmail(e.target.value)}
						/>
					</div>
					<div>
						<Input
							label='Password'
							variant='bordered'
							name='password'
							endContent={
								<button
									className='focus:outline-none'
									type='button'
									onClick={toggleVisibility}
									aria-label='toggle password visibility'
								>
									{isVisible ? (
										<EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
									) : (
										<EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
									)}
								</button>
							}
							type={isVisible ? 'text' : 'password'}
							className='max-full'
							value={signinStore.password}
							onChange={(e) => signinStore.setPassword(e.target.value)}
						/>
					</div>
					<Button
						type='submit'
						variant='shadow'
						color='primary'
						className='w-full'
					>
						{signinStore.loading ? (
							<Spinner color='default' labelColor='foreground' />
						) : (
							'Sign in'
						)}
					</Button>
				</form>
				<p className='mt-4 text-center text-gray-400'>
					Don't have an account?{' '}
					<Link href='/signup' className='text-cyan-400 hover:underline'>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
});

export default Signin;

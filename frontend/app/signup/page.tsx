'use client';

import { EyeFilledIcon } from '@/assets/EyeFieldIcon';
import { EyeSlashFilledIcon } from '@/assets/EyeSlashFielcon';
import { Button, Input, Spinner } from '@nextui-org/react';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { observer } from 'mobx-react-lite';
import signupStore from '@/stores/SignupStore';
import { axiosInstance } from '@/server/api';
import { useRouter } from 'next/navigation';

const Signup = observer(() => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isVisibleConfirm, setIsVisibleConfirm] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();

	const toggleVisibility = () => setIsVisible(!isVisible);
	const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signupStore.loading = true;
		try {
			if (signupStore.isValid()) {
				const res = await axiosInstance.post('/create-account', {
					username: signupStore.username,
					email: signupStore.email,
					password: signupStore.password,
				});
				console.log(res);
				signupStore.loading = false;
				localStorage.setItem('token', res.data.accessToken);
				router.push('/verify');
				signupStore.reset();
			} else {
				signupStore.loading = false;
				setErrorMessage('All field is required');
			}
		} catch (error) {
			signupStore.loading = false;
			setErrorMessage('Error creating account. Please try again later.');
			console.log(error);
		}
	};

	return (
		<div className='flex items-center justify-center min-h-[90vh] bg-gradient-to-t from-gray-900 to-black'>
			<div className='bg-gray-800 rounded-lg shadow-inner shadow-sky-600 p-8 max-w-md w-full border border-gray-700'>
				<h2 className='text-3xl font-bold text-center text-cyan-400 mb-6'>
					Sign Up
				</h2>
				{errorMessage ? (
					<p className='text-red-600 font-semibold mb-3'>{errorMessage}</p>
				) : null}
				<form className='space-y-4' onSubmit={handleSubmit}>
					<div>
						<Input
							type='text'
							name='username'
							label='Username'
							variant='bordered'
							isInvalid={false}
							errorMessage={null}
							className='w-full'
							value={signupStore.username}
							onChange={(e) => signupStore.setUsername(e.target.value)}
						/>
					</div>
					<div>
						<Input
							type='email'
							label='Email'
							name='email'
							variant='bordered'
							isInvalid={false}
							errorMessage={null}
							className='max-full'
							value={signupStore.email}
							onChange={(e) => signupStore.setEmail(e.target.value)}
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
							value={signupStore.password}
							onChange={(e) => signupStore.setPassword(e.target.value)}
						/>
					</div>
					<div>
						<Input
							label='Confirm Password'
							variant='bordered'
							endContent={
								<button
									className='focus:outline-none'
									type='button'
									onClick={toggleVisibilityConfirm}
									aria-label='toggle password visibility'
								>
									{isVisibleConfirm ? (
										<EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
									) : (
										<EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
									)}
								</button>
							}
							type={isVisibleConfirm ? 'text' : 'password'}
							className='max-full'
							value={signupStore.confirmPassword}
							onChange={(e) => signupStore.setConfirmPassword(e.target.value)}
						/>
					</div>
					<Button
						type='submit'
						variant='shadow'
						color='primary'
						className='w-full'
					>
						{signupStore.loading ? (
							<Spinner color='default' labelColor='foreground' />
						) : (
							'Create Account'
						)}
					</Button>
				</form>
				<p className='mt-4 text-center text-gray-400'>
					Already have an account?{' '}
					<Link href='/signin' className='text-cyan-400 hover:underline'>
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
});

export default Signup;

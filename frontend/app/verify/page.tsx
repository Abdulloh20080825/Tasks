'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/server/api';
import { Input, Button, Spinner } from '@nextui-org/react';

const VerifyAccountPage: React.FC = () => {
	const [code, setCode] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value);
		setError(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		if (!code) {
			setError('Verification code is required.');
			setLoading(false);
			return;
		}
		try {
			const res = await axiosInstance.post('/activation', { code });
			if (res.data) {
				router.push('/');
			} else {
				setError(res.data.message || 'Invalid verification code.');
			}
		} catch (error) {
			console.error(error);
			setError(error.response?.data?.message || 'An error occurred.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black'>
			<div className='bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 max-w-md w-full'>
				<h2 className='text-3xl text-center text-cyan-400 font-bold mb-6'>
					Verify Account
				</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div>
						<Input
							type='text'
							name='code'
							label='Verification Code'
							placeholder='Enter your code'
							variant='bordered'
							className='w-full'
							value={code}
							onChange={handleCodeChange}
							isInvalid={!!error}
							errorMessage={error}
						/>
					</div>
					{error && <p className='text-red-500 text-sm'>{error}</p>}
					<Button
						type='submit'
						variant='shadow'
						color='primary'
						className='w-full'
					>
						{loading ? (
							<Spinner color='default' labelColor='foreground' />
						) : (
							'Verify Account'
						)}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default VerifyAccountPage;

'use client';

import { days } from '@/constants/days';
import { month } from '@/constants/month';
import { ModalProps } from '@/interfaces/modal';
import {
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Select,
	SelectItem,
} from '@nextui-org/react';
import React from 'react';

const AddDayModal: React.FC<ModalProps> = ({ isOpen, onOpenChange }) => {
	return (
		<Modal isOpen={isOpen} placement='center' onOpenChange={onOpenChange}>
			<ModalContent className='bg-gray-900 text-white'>
				{() => (
					<>
						<ModalHeader className='text-xl font-semibold text-center'>
							Add Special Day
						</ModalHeader>
						<ModalBody className='flex flex-col space-y-4'>
							<form className='flex flex-col space-y-6'>
								<div className='flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0'>
									<Select
										label='Month'
										className='max-w-xs md:w-1/2 text-white'
										variant='bordered'
										aria-label='Select Month'
										selectedKeys={[]}
										itemClasses='text-white bg-gray-900'
										popupClasses='bg-gray-900 text-white'
									>
										{month.map((item) => (
											<SelectItem
												key={item.key}
												className='text-white bg-black hover:bg-gray-800'
											>
												{item.value}
											</SelectItem>
										))}
									</Select>

									<Select
										label='Day'
										className='max-w-xs md:w-1/2 text-white'
										variant='bordered'
										aria-label='Select Day'
										selectedKeys={[]}
										itemClasses='text-white bg-gray-900'
										popupClasses='bg-gray-900 text-white'
									>
										{days.map((item) => (
											<SelectItem
												key={item}
												className='text-white bg-black hover:bg-gray-800'
											>
												{item}
											</SelectItem>
										))}
									</Select>
								</div>

								<Input
									label='Special Day'
									placeholder='Enter Task name'
									className='text-white'
									variant='bordered'
								/>

								<button
									type='submit'
									className='mt-4 py-2 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md transition-all duration-200 ease-in-out'
								>
									Add Day
								</button>
							</form>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default AddDayModal;

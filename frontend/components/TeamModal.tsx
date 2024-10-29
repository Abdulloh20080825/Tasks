import { ModalProps } from '@/interfaces/modal';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const TeamModal: React.FC<ModalProps> = ({ isOpen, onOpenChange }) => {
	return (
		<Modal isOpen={isOpen} placement='center' onOpenChange={onOpenChange}>
			<ModalContent className='bg-gray-900 text-white'>
				{() => (
					<>
						<ModalHeader className='text-xl font-semibold text-center'>
							Team GitHubs
						</ModalHeader>
						<ModalBody className='flex flex-col space-y-4'>
							<div className='space-y-4'>
								<div className='flex items-center justify-between'>
									<p>Abdulloh Qurbonov</p>
									<Link
										href='https://github.com/Abdulloh20080825'
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300'
									>
										<FaGithub size={24} />
										<span>GitHub</span>
									</Link>
								</div>
								<div className='flex items-center justify-between'>
									<p>Torahmatov Hasan</p>
									<Link
										href='https://github.com/torahmatovhasan'
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300'
									>
										<FaGithub size={24} />
										<span>GitHub</span>
									</Link>
								</div>
								<div className='flex items-center justify-between'>
									<p>Ilyosov Begzad</p>
									<Link
										href='https://github.com/ilyosovbegzad'
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300'
									>
										<FaGithub size={24} />
										<span>GitHub</span>
									</Link>
								</div>
								<div className='flex items-center justify-between'>
									<p>Mominova Husnora</p>
									<Link
										href='https://github.com/mominovahusnora'
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300'
									>
										<FaGithub size={24} />
										<span>GitHub</span>
									</Link>
								</div>
							</div>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default TeamModal;

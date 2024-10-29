import Footer from '@/components/Footer';
import React, { ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div>
			<main>{children}</main>
		</div>
	);
};

export default Layout;

import SideNavBar from '@/components/dashboard/SideNavBar';
import React from 'react';

// Define the interface for the layout props
interface LayoutProps {
    children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
    return (
        <div className='md:flex min-h-screen'>
            <SideNavBar />
            <main className='flex-1 p-6'>
                {children}
            </main>
        </div>
    );
};

export default layout;
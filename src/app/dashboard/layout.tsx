import SideNavBar from '@/components/dashboard/SideNavBar';
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
    return (
        <div className="md:flex min-h-screen bg-base-200">
            <SideNavBar />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
};

export default layout;

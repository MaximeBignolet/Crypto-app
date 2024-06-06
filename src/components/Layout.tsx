import React from 'react';
import { Navbar } from './nav/Navbar';

interface LayoutProps {
    children: React.ReactNode;
    }

export const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
       <div>
            <header>
                 <Navbar />
            </header>
            <main>
                 {children}
            </main>
       </div>
  );
};

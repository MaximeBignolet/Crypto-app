import React, { useState } from 'react';
import logo from '/images/logo.png';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    function handleToggleHambMenu(){
            setIsOpen(!isOpen);
    }

    return (
         <nav className='relative'>
              <div className='flex items-center justify-between lg:justify-normal mt-5'>
                   <div className='flex items-center gap-2'>
                        <img src={logo} alt="logo CryptoCap"/>
                        <p className='lg:text-xl'>
                             Crypto<span className='text-gray-400'>Cap</span>
                        </p>
                   </div>
                   <ul className='hidden lg:flex justify-around w-full items-center text-2xl'>
                        <li className='text-gray-600'>Home</li>
                        <li className='text-gray-600 py-2'>About</li>
                   </ul>
                   { !isOpen ? (
                        <div className="space-y-2 lg:hidden" onClick={handleToggleHambMenu}>
                             <div className="w-8 h-0.5 bg-gray-600"></div>
                             <div className="w-8 h-0.5 bg-gray-600"></div>
                             <div className="w-8 h-0.5 bg-gray-600"></div>
                        </div>
                    ) : (
                         <div className="relative h-[22px] w-[32px]" onClick={() => setIsOpen(false)}>
                              <div className="absolute inset-0 m-auto bg-gray-600 h-0.5 w-8 transform rotate-45"></div>
                              <div className="absolute inset-0 m-auto bg-gray-600 h-0.5 w-8 transform -rotate-45"></div>
                         </div>          
                    )
                }
              </div>
              <div className={`bg-white p-5 rounded-lg w-1/3 absolute right-0 top-10 ${!isOpen ? 'hidden' : ''}`} >
                   <ul>
                        <li className='text-gray-600'>Home</li>
                        <li className='text-gray-600 py-2'>About</li>
                   </ul>
              </div>
         </nav>
    );
};

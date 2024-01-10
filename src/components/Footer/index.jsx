import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='w-full flex justify-between items-center sticky bottom-0 left-0 bg-black text-white px-8 py-3'>
            <div>
                2024 yil ©
            </div>
            <div>
                <Link to="/" className='text-[#28a745]'>Kengash KSPI</Link>
            </div>
        </div>
    )
}

export default Footer;
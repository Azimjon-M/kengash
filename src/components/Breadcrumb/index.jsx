import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({locationPage}) => {
    return (
        <div className='flex justify-start items-center gap-x-3 bg-[#E9ECEF] px-6 py-3'>
            <div>
                <Link to="/asosiy" className='text-[#05B967]'>
                    Asosiy
                </Link>
            </div>
            /
            <div>
                {locationPage}
            </div>
        </div>
    )
}

export default Breadcrumb;
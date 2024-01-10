import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({locationPage, locationPageTwo}) => {
    let locPageToLowerCase = locationPage.toLowerCase();
    return (
        <div className='flex justify-start items-center gap-x-3 bg-[#E9ECEF] shadow-lg px-6 py-3'>
            <div>
                <Link to="/asosiy" className='text-[#05B967]'>
                    Asosiy
                </Link>
            </div>
            {
                locationPageTwo ? 
                    <>
                        /
                        <Link className='text-[#05B967]' to={`/${locPageToLowerCase}`}>
                            {locationPage}
                        </Link>
                        /
                        <div>
                            {locationPageTwo}
                        </div>
                    </>
                :
                <>
                    /
                    <div>
                        {locationPage}
                    </div>
                </>
            }
        </div>
    )
}

export default Breadcrumb;
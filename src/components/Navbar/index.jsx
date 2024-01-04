import React, { useEffect, useState } from 'react';
import kspiIcon from '../../assets/icons/logo_kspi.png'
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi'

const Navbar = ({isExit}) => {
    // Values
    const [isExitOrAccess, setIsExitOrAccess] = useState('KIRISH')
    const [isOpenMeni, setIsOpenMeni] = useState(false)
    // Funtions
    useEffect(() => {
        if (isExit) {
            setIsExitOrAccess('CHIQISH');
        } else {
            setIsExitOrAccess('KIRISH');
        }
    }, [isExit])

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between items-center bg-white text-black px-6 py-3'>
                <Link to="/">
                    <div className='flex justify-start items-center gap-x-3'>
                        <div className='lg:hidden'>
                            <FiMenu onClick={() => setIsOpenMeni(!isOpenMeni)} className='text-[30px]' />
                        </div>
                        <div className='w-[40px] h-auto hidden lg:inline-block'>
                            <img className='w-full h-auto' src={kspiIcon} alt="KSPI icon" />
                        </div>
                        <h1 className='font-bold text-[20px] hidden lg:inline-block'>
                            QDPI Kengashi
                        </h1>
                    </div>
                </Link>
                <div>
                    <button className='text-[16px] btn btn-success bg-[#05B967] font-medium text-white px-8'>
                        {isExitOrAccess}
                    </button>
                </div>
            </div>

            <div className={`${isOpenMeni ? "h-[0px]" : "h-auto"} style-transition border border-red-600 `}>
                hellos <br />
                lksdk
            </div>
        </div>
    )
}

export default Navbar
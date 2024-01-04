import React from 'react';
import logo from '../../assets/img/logo_kspi.png'

const Login = () => {
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md max-w-xs sm:max-w-sm lg:max-w-lg">
                <div className='flex justify-center'>
                    <img className='w-[80px]' src={logo} alt="" />
                </div>
                <h1 className="text-xl font-bold text-center text-success mb-2">
                    Qo'qon davlat pedagogika instituti
                </h1>
                <h2 className="text-lg font-semibold text-center text-black">
                    Institut ichki kengashiga kirish
                </h2>
                <form className="mt-6">
                    <div className="mb-2">
                        <label for="username" className="block text-sm font-semibold text-gray-800">
                            Foydalanuvchi nomi
                        </label>
                        <input type="username" className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#28a745] focus:ring-[#25a620] focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>
                    <div className="mb-2">
                        <label for="password" className="block text-sm font-semibold text-gray-800">
                            Parol
                        </label>
                        <input type="password" className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#28a745] focus:ring-[#25a620] focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#28a745] rounded-md hover:bg-[#25a620] focus:outline-none">
                            Kirish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
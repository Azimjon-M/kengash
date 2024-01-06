import React from 'react'
import Breadcrumb from '../Breadcrumb';

const AddAzoCom = () => {
    return (
        <div>
            <Breadcrumb locationPage="A'zo qo'shish" />
            <div className='p-5'>
                <h2 className='text-center text-2xl font-bold mb-5'>A'zo qo'shish</h2>
                <div>
                    <form className="max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto mb-5">
                        <div className="mb-5">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Foydalanuvchi nomi</label>
                            <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Foydalanuvchi nomi" required />
                        </div>
                        <div className='grid lg:grid-cols-2 lg:gap-4'>
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ismi</label>
                                <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ismi" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Familiyasi</label>
                                <input type="text" id="surname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Familiyasi" required />
                            </div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Huquq</label>
                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option>Admin</option>
                                <option>A'zo</option>
                            </select>
                        </div>
                        <div className='grid lg:grid-cols-2 lg:gap-4'>
                            <div className="mb-5">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parol</label>
                                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Parol' required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parolni tasdiqlash</label>
                                <input type="password" id="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Parolni tasdiqlash' required />
                            </div>
                        </div>
                        <button type="submit" className='btn bg-[#05B967] hover:bg-[#07b867] text-white w-full'>Qo'shish</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddAzoCom;
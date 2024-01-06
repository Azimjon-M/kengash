import React from 'react'
import { Link, NavLink } from "react-router-dom";

const DavomatCom = () => {
    return (
        <div className='max-w-7xl mx-auto px-5 '>
            <div>
                <h4>Kengash a'zolari</h4>
                <button>Yangilash</button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div class="relative overflow-x-auto shadow-md">
                    <table class="w-full text-sm sm:text-base rtl:text-right text-gray-500 dark:text-gray-400 text-center">
                        <thead class="text-xs sm:text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-2 py-3">
                                    №
                                </th>
                                <th scope="col" class="py-3">
                                    Familiya
                                </th>
                                <th scope="col" class="py-3">
                                    Ism
                                </th>
                                <th scope="col" class="py-3">
                                    Davomat
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    1
                                </th>
                                <td class="py-4">
                                    Nurmamatov
                                </td>
                                <td class="py-4">
                                    Nodirbek
                                </td>
                                <td class="py-4 flex justify-center items-center">
                                    <Link>
                                        <svg className="w-5 h-5 hover:w-8 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                        </svg>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>



                <div class="relative overflow-x-auto shadow-md">
                    <table class="w-full text-sm sm:text-base rtl:text-right text-gray-500 dark:text-gray-400 text-center">
                        <thead class="text-xs sm:text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-2 py-3">
                                    №
                                </th>
                                <th scope="col" class="py-3">
                                    Familiya
                                </th>
                                <th scope="col" class="py-3">
                                    Ism
                                </th>
                                <th scope="col" class="py-3">
                                    Davomat
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    1
                                </th>
                                <td class="py-4">
                                    Nurmamatov
                                </td>
                                <td class="py-4">
                                    Nodirbek
                                </td>
                                <td class="py-4 flex justify-center items-center">
                                    <Link>
                                        <svg className="w-4 h-4 hover:w-8 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DavomatCom
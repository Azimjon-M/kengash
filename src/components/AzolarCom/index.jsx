import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import Breadcrumb from '../Breadcrumb';
import { Link } from 'react-router-dom';

const AzolarCom = () => {
    return (
        <div>
            <Breadcrumb locationPage="A'zolar" />
            <h2 className='text-2xl font-semibold text-center my-5'>Barcha a'zolar</h2>
            <div className='px-5'>
                <div className='flex items-center justify-between max-w-7xl mx-auto mb-5'>
                    <h2 className='text-lg font-semibold'>Kengash a'zolari</h2>
                    <Link to='/azolar/addAzo' className='btn bg-[#05B967] hover:bg-[#07b867] text-white'>A'zo qo'shish</Link>
                </div>
                <div className="flex flex-col max-w-7xl mx-auto">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow-md">
                                <table className="min-w-full text-left text-sm font-light table-auto">
                                    <thead className="text-sm md:text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-2 py-3">№</th>
                                            <th scope="col" className="px-2 py-3">Login</th>
                                            <th scope="col" className="px-2 py-3">Ismi</th>
                                            <th scope="col" className="px-2 py-3">Familiyasi</th>
                                            <th scope="col" className="px-2 py-3 flex justify-center">-</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-sm lg:text-base'>
                                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <td className="whitespace-nowrap font-semibold px-2 py-3">1</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Akbar18</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Akbarjon</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Boborahimov</td>
                                            <td className="whitespace-nowrap font-medium py-3 flex justify-center"><button><MdDeleteOutline className='text-red-700 cursor-pointer w-5 md:w-6 h-auto' /></button></td>
                                        </tr>
                                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <td className="whitespace-nowrap font-semibold px-2 py-3">2</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Akbar18</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Akbarjon</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Boborahimov</td>
                                            <td className="whitespace-nowrap font-medium py-3 flex justify-center"><button><MdDeleteOutline className='text-red-700 cursor-pointer w-5 md:w-6 h-auto' /></button></td>
                                        </tr>
                                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <td className="whitespace-nowrap font-semibold px-2 py-3">3</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Akbar18</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Akbarjon</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Boborahimov</td>
                                            <td className="whitespace-nowrap font-medium py-3 flex justify-center"><button><MdDeleteOutline className='text-red-700 cursor-pointer w-5 md:w-6 h-auto' /></button></td>
                                        </tr>
                                        {/* {data.map((val, key) => {
                                            return (
                                                <tr key={key} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="whitespace-nowrap font-semibold px-2 py-3">3</td>
                                                    <td className="whitespace-nowrap font-medium px-2 py-3">{val.username}</td>
                                                    <td className="whitespace-nowrap font-medium px-2 py-3">{val.name}</td>
                                                    <td className="whitespace-nowrap font-medium px-2 py-3">{val.surname}</td>
                                                    <td className="whitespace-nowrap font-medium py-3 flex justify-center"><MdDeleteOutline className='text-red-700 cursor-pointer w-5 md:w-6 h-auto' /></td>
                                                </tr>
                                            )
                                        })} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AzolarCom;
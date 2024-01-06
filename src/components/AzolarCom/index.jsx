import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";

const AzolarCom = () => {
    return (
        <div className='bg-gray-100 min-h-[calc(100vh-77px)] p-5'>
            <h2 className='text-2xl font-semibold text-center'>A'zolar</h2>
            <div>
                <div className='flex items-center justify-between max-w-3xl mx-auto'>
                    <h2 className='text-lg font-semibold'>Barcha a'zolar</h2>
                    <button className='btn'>A'zo qo'shish</button>
                </div>
                <div className="flex flex-col max-w-3xl mx-auto">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-2 border-sky-700 font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-2 py-3">№</th>
                                            <th scope="col" className="px-2 py-3">Ismi</th>
                                            <th scope="col" className="px-2 py-3">Familiyasi</th>
                                            <th scope="col" className="px-2 py-3 flex justify-center">O'chirish</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-2 border-sky-700 dark:border-neutral-500">
                                            <td className="whitespace-nowrap font-semibold px-2 py-3">1</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Akbarjon</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Boborahimov</td>
                                            <td className="whitespace-nowrap font-medium py-3 flex justify-center"><RiDeleteBin5Line className='text-red-700 cursor-pointer' /></td>
                                        </tr>
                                        <tr className="border-2 border-sky-700 dark:border-neutral-500">
                                            <td className="whitespace-nowrap font-semibold px-2 py-3">2</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Akbarjon</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Boborahimov</td>
                                            <td className="whitespace-nowrap font-medium py-3 flex justify-center"><RiDeleteBin5Line className='text-red-700 cursor-pointer' /></td>
                                        </tr>
                                        <tr className="border-2 border-sky-700 dark:border-neutral-500">
                                            <td className="whitespace-nowrap font-semibold px-2 py-3">3</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Akbarjon</td>
                                            <td className="whitespace-nowrap font-medium px-2 py-3">Boborahimov</td>
                                            <td className="whitespace-nowrap font-medium py-3 flex justify-center"><RiDeleteBin5Line className='text-red-700 cursor-pointer' /></td>
                                        </tr>
                                        {/* {data.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.name}</td>
                                    <td>{val.surname}</td>
                                    <td>{val.delete}</td>
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
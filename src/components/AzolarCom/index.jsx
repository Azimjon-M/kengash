import React, { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import Breadcrumb from '../Breadcrumb';
import { Link } from 'react-router-dom';

const AzolarCom = () => {

    const [users, setUsers] = useState([
        { id: 1, username: 'Akbar18', name: 'Akbarjon', surname: 'Boborahimov' },
        { id: 2, username: 'Akbar19', name: 'Akbarbek', surname: 'Boborahimov' },
        { id: 3, username: 'Akbar20', name: 'Akbarxon', surname: 'Bobo' },
        { id: 4, username: 'Akbar21', name: 'Dilshod', surname: 'Boborahimov' },
        { id: 5, username: 'Akbar22', name: 'Dilshodbek', surname: 'Bobo' },
    ]);

    const handleDelete = (id) => {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
    };

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
                                        {users.map((user, key) => {
                                            return (
                                                <tr key={key} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="whitespace-nowrap font-semibold px-2 py-3">{user.id}</td>
                                                    <td className="whitespace-nowrap font-medium px-2 py-3">{user.username}</td>
                                                    <td className="whitespace-nowrap font-medium px-2 py-3">{user.name}</td>
                                                    <td className="whitespace-nowrap font-medium px-2 py-3">{user.surname}</td>
                                                    <td className="whitespace-nowrap font-medium py-3 flex justify-center"><button onClick={() => handleDelete(user.id)} className='btnDelete'><MdDeleteOutline className='text-red-700 cursor-pointer w-5 md:w-6 h-auto' /></button></td>
                                                </tr>
                                            )
                                        })}
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
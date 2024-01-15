import React, { useState, useEffect } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import Breadcrumb from '../Breadcrumb';
import { Link } from 'react-router-dom';

const AzolarCom = () => {

    const apiUrl = 'https://kengash.pythonanywhere.com/api/v1/users/';
    const token = '6ce7e827abb14f77b14015d0dd778b0fef76b53e';

        const [data, setData] = useState([]);

        useEffect(() => {
            fetch(apiUrl, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => setData(data.filter(obj => obj.lavozim !== "superadmin")))
                .catch(error => console.error('Xatolik:', error));
        }, []);

    // DELETE STEP BY STEP DATA
    const handleDelete = (id) => {
        const apiUrl = `https://kengash.pythonanywhere.com/api/v1/users/${id}/`;
        const getToken = Object.keys(localStorage)[0];
        const token = localStorage.getItem(`${getToken}`);

        fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    setData((prevData) => prevData.filter(item => item.id !== id));
                } else {
                    console.error('Error deleting item:', response.statusText);
                }
            })
            .catch(error => console.error('Xatolik:', error));
    };

    return (
        <div className='bg-[#F3F7FA] min-h-[calc(100vh-125px)]'>
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
                                            <th scope="col" className="px-2 py-3">Ism</th>
                                            <th scope="col" className="px-2 py-3">Familiya</th>
                                            <th scope="col" className="px-2 py-3">Lavozim</th>
                                            <th scope="col" className="px-2 py-3 flex justify-center">-</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-sm lg:text-base'>
                                        {data.map((user, key) => {
                                            return (
                                                <tr key={key} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <td className="whitespace-nowrap font-semibold px-2 py-3">{user.id}</td>
                                                    <td className="whitespace-nowrap font-medium px-2 py-3">{user.username}</td>
                                                    <td className="whitespace-nowrap font-medium px-2 py-3">{user.first_name}</td>
                                                    <td className="whitespace-nowrap font-medium px-2 py-3">{user.last_name}</td>
                                                    <td className="whitespace-nowrap font-medium px-2 py-3">{user.lavozim}</td>
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
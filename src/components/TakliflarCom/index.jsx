import React, { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumb";
import { NavLink } from "react-router-dom";
import { FaXmark, FaPlus } from "react-icons/fa6";
import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';

const TakliflarCom = () => {

    const [data, setData] = useState([]);

    // GET DATA
    useEffect(() => {
        const apiUrl = 'https://kengash.pythonanywhere.com/api/v1/taklif/';
        const getToken = Object.keys(localStorage)[0];
        const token = localStorage.getItem(`${getToken}`);

        fetch(apiUrl, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Xatolik:', error));
    }, []);

    // DELETE STEP BY STEP DATA
    const handleDelete = (id) => {
        const apiUrl = `https://kengash.pythonanywhere.com/api/v1/taklif/${id}/`;
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

    // DELETE ALL DATA
    const handleClearData = () => {
        const isConfirmed = window.confirm("Barcha ma'lumotlarni o'chirishni hohlaysizmi?");

        if (isConfirmed) {
            const apiUrl = 'https://kengash.pythonanywhere.com/api/v1/taklif/';
            const getToken = Object.keys(localStorage)[0];
            const token = localStorage.getItem(`${getToken}`);

            Promise.all(data.map(item => {
                const itemUrl = `${apiUrl}${item.id}/`;

                return fetch(itemUrl, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => {
                        if (!response.ok) {
                            console.error(`Error deleting item with ID ${item.id}:`, response.statusText);
                        }
                    })
                    .catch(error => console.error('Xatolik:', error));
            }))
                .then(() => {
                    setData([]);
                });
        }
    };

    
    return (
        <div className="bg-[#F3F7FA] min-h-[calc(100vh-125px)]">
            <Breadcrumb locationPage="Takliflar" />
            <div className="flex flex-col gap-y-4 text-black">
                <div className="text-center text-2xl font-semibold py-6">
                    Barcha takliflar
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-y-4 sm:gap-x-4 py-4 sm:px-4">
                    <NavLink
                        to="/takliflar/add-taklif"
                        className="text-[16px] btn btn-success bg-[#05B967] font-medium text-white"
                    >
                        Taklif kiritish <FaPlus />
                    </NavLink>

                    <button
                        onClick={() => handleClearData()}
                        to="/"
                        className="text-[16px] btn btn-error font-medium text-white"
                    >
                        Barcha takliflarni o'chirish <FaXmark />
                    </button>
                </div>
                <div className='text-xl font-semibold text-center mt-4'>Kengashga qo'yilmagan takliflar:</div>
                <div className="flex flex-col items-center gap-y-4 px-3 overflow-hidden">
                    {data.map((item) => (
                        <div data-aos="fade-left" key={item.id} className="w-full border bg-white border-gray-500 rounded-md bg-gradient-to-r from-gray-50 to-gray-400 p-2">
                            <div className="line-clamp-1"><b>Taklif nomi:</b> {item.name}</div>
                            <div><b>Nomzod:</b> {item.nomzod}</div>
                            <div><b>Berilgan vaqt:</b> {item.vaqt} daqiqa</div>
                            <div className="flex justify-end">
                                <button className="btn btn-sm btn-success bg-[#05B967] font-medium text-white mb-4" >Faollashtirish</button>
                            </div>
                            <div className="flex justify-end items-center gap-x-2">
                                <BiEditAlt className="cursor-pointer text-[24px] text-[#05B967]" /> <MdDeleteOutline onClick={() => handleDelete(item.id)} className="cursor-pointer text-[24px] text-red-600" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className='text-xl font-semibold text-center mt-8'>Kengashga qo'yilgan takliflar:</div>
                <div className="flex flex-col items-center gap-y-4 px-3 mb-6 overflow-hidden">
                    {data.map((item) => (
                        <div data-aos="fade-right" key={item.id} className="w-full border bg-white border-gray-500 rounded-md bg-gradient-to-r from-green-500 to-green-200 p-2">
                            <div className="line-clamp-1"><b>Taklif nomi:</b> {item.name}</div>
                            <div><b>Nomzod:</b> {item.nomzod}</div>
                            <div><b>Berilgan vaqt:</b> {item.vaqt} daqiqa</div>
                            <div className="flex justify-end">
                                <button className="btn btn-sm btn-error bg-red-600 font-medium text-white" >Faolsizlashtirish</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TakliflarCom;

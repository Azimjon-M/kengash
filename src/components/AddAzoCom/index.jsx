import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumb';

const AddAzoCom = () => {

    const apiUrl = 'https://kengash.pythonanywhere.com/api/v1/users/';
    const token = window.localStorage.getItem('token');


    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        lavozim: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Ma'lumotlar muvaffaqiyatli yuborildi");
            } else {
                console.error("Ma'lumotlar yuborishda xatolik yuz berdi");
            }
        } catch (error) {
            console.error('Xatolik:', error);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    return (
        <div className='bg-[#F3F7FA] min-h-[calc(100vh-125px)]'>
            <Breadcrumb locationPage="A'zolar" locationPageTwo="A'zo qo'shish" />
            <div className='p-5'>
                <h2 className='text-center text-2xl font-bold mb-5'>A'zo qo'shish</h2>
                <div>
                    <form className="max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto mb-5" onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="username" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white">Foydalanuvchi nomi</label>
                            <input type="text" id="username"  value={formData.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Foydalanuvchi nomi" required />
                        </div>
                        <div className='grid lg:grid-cols-2 lg:gap-4'>
                            <div className="mb-5">
                                <label htmlFor="first_name" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white">Ismi</label>
                                <input type="text" id="first_name" value={formData.first_name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ismi" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="last_name" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white">Familiyasi</label>
                                <input type="text" id="last_name" value={formData.last_name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Familiyasi" required />
                            </div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lavozim" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white">Huquq</label>
                            <select id="lavozim" value={formData.lavozim} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option disabled>Huquqni tanlang</option>
                                <option>Admin</option>
                                <option>A'zo</option>
                            </select>
                        </div>
                        <div className='grid lg:grid-cols-2 lg:gap-4'>
                            <div className="mb-5">
                                <label htmlFor="password" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white">Parol</label>
                                <input type="password" id="password" value={formData.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Parol' required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white">Parolni tasdiqlash</label>
                                <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Parolni tasdiqlash' required />
                            </div>
                        </div>
                        <button type="submit" className='btn bg-[#05B967] hover:bg-[#07b867] text-white text-lg w-full'>Qo'shish</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAzoCom;

import React from 'react';
import Breadcrumb from '../Breadcrumb';
import { useFormik } from "formik";
import addAzo from '../../services/addAzo';

const AddAzoCom = () => {

    const formik = useFormik({
        initialValues: {
            username: '',
            first_name: '',
            last_name: '',
            lavozim: '',
            password: '',
            email: '',
        },
        onSubmit: (values) => {
            addAzo.post(values)
            .then(() => formik.resetForm())
            .catch((error) => console.error("Error adding azo: ", error))
        },
    });

    return (
        <div className='bg-[#F3F7FA] min-h-[calc(100vh-125px)]'>
            <Breadcrumb locationPage="A'zolar" locationPageTwo="A'zo qo'shish" />
            <div className='p-5'>
                <h2 className='text-center text-2xl font-bold mb-5'>A'zo qo'shish</h2>
                <div>
                    <form className="max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto mb-5" onSubmit={formik.handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="username" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white">Foydalanuvchi nomi</label>
                            <input type="text" id="username"  value={formik.values.username} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Foydalanuvchi nomi" required />
                        </div>
                        <div className='grid lg:grid-cols-2 lg:gap-4'>
                            <div className="mb-5">
                                <label htmlFor="first_name" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white">Ismi</label>
                                <input type="text" id="first_name" value={formik.values.first_name} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ismi" required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="last_name" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white">Familiyasi</label>
                                <input type="text" id="last_name" value={formik.values.last_name} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Familiyasi" required />
                            </div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="lavozim" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white">Huquq</label>
                            <select id="lavozim" value={formik.values.lavozim} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option disabled>Huquqni tanlang</option>
                                <option>Admin</option>
                                <option>A'zo</option>
                            </select>
                        </div>
                        <div className='grid lg:grid-cols-2 lg:gap-4'>
                            <div className="mb-5">
                                <label htmlFor="email" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" id="email" value={formik.values.email} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Email' required />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password" className="block mb-2 text-sm md:text-lg font-medium text-gray-900 dark:text-white">Parol</label>
                                <input type="password" id="password" value={formik.values.password} onChange={formik.handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Parol' required />
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

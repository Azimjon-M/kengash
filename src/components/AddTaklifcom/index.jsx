import React, { useState } from 'react';
import Breadcrumb from "../Breadcrumb";
import { useFormik } from 'formik';

const AddTaklifCom = () => {
    const [showFirstForm, setShowFirstForm] = useState(true);
    const [isActiveTwoo, setIsActiveTwoo] = useState(false);
    const [isActiveThree, setIsActiveThree] = useState(false);
    const [isActiveFour, setIsActiveFour] = useState(false);
    const [isActiveFive, setIsActiveFive] = useState(false);

    const formik = useFormik({
        initialValues: {
            taklif: "",
            vaqt: "",
            nomzod: "",
        },
        onSubmit: values => {
            console.log(JSON.stringify(values));
        }
    });

    const formik2 = useFormik({
        initialValues: {
            taklif: "",
            vaqt: "",
            nomzod1: "",
            nomzod2: "",
            nomzod3: "",
        },
        onSubmit: values => {
            console.log(values);
        }
    });

    const handleRadioChange = (event) => {
        setShowFirstForm(event.target.id === "one");
    };

    // Only numbers
    const [num, setNum] = useState('');
    const changeToNumbers = event => {
        const result = event.target.value.replace(/\D/g, '');
        setNum(result);
        formik.handleChange(result);
    };

    return (
        <div className="bg-[#F3F7FA] min-h-[calc(100vh-125px)]">
            <Breadcrumb locationPage="Takliflar" locationPageTwo="Taklif kiritish" />
            <h2 className='text-2xl font-semibold text-center my-5'>Taklif kiritish</h2>

            <div className="w-full max-w-sm px-2 md:px-0 md:max-w-xl xl:max-w-3xl mx-auto">
                {/* Radio */}
                <ul className="items-center w-full text-sm lg:text-xl font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4">
                    <li className="w-full border-b border-gray-200 px-6 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="one"
                                type="radio"
                                value=""
                                name="list-radio"
                                className="w-4 h-4 text-[#05b967] dark:bg-gray-600 dark:border-gray-500"
                                onChange={handleRadioChange}
                                checked={showFirstForm}
                            />
                            <label htmlFor="one" className="w-full py-3 ms-2 text-sm lg:text-xl font-semibold text-gray-700 dark:text-gray-300">Yagona nomzod </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 px-6 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="more"
                                type="radio"
                                value=""
                                name="list-radio"
                                className="w-4 h-4 text-[#05b967] dark:bg-gray-600 dark:border-gray-500"
                                onChange={handleRadioChange}
                                checked={!showFirstForm}
                            />
                            <label htmlFor="more" className="w-full py-3 ms-2 text-sm lg:text-xl font-semibold text-gray-700 dark:text-gray-300">Ko'proq nomzod</label>
                        </div>
                    </li>
                </ul>

                {showFirstForm && (
                    <form className="bg-white shadow-md rounded px-4 md:px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="taklif">
                                Taklif nomi
                            </label>
                            <textarea onChange={formik.handleChange} value={formik.values.taklif} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline" id="taklif" placeholder="Taklif" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="vaqt">
                                Berilgan vaqt (daqiqa)
                            </label>
                            <input onChange={changeToNumbers} values={formik.values.vaqt} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline" id="vaqt" value={num} type="text" placeholder="Vaqt" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="nomzod">
                                Nomzod
                            </label>
                            <input onChange={formik.handleChange} value={formik.values.nomzod} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline" id="nomzod" type="text" placeholder="Nomzod" required />
                        </div>
                        <div className="flex items-center justify-end">
                            <button className="bg-[#05B967] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Qo'shish
                            </button>
                        </div>
                    </form>
                )}

                {!showFirstForm && (
                    <form className="bg-white shadow-md rounded px-4 md:px-8 pt-6 pb-8 mb-4" onSubmit={formik2.handleSubmit}>
                        <div className="mb-4">
                            <label className="  block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="taklif">
                                Taklif nomi
                            </label>
                            <textarea onChange={formik.handleChange} value={formik.values.taklif} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline" id="taklif" placeholder="Taklif" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="vaqt">
                                Berilgan vaqt (daqiqa)
                            </label>
                            <input onChange={changeToNumbers} value={formik.values.vaqt} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline" id="vaqt" type="text" placeholder="Vaqt" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="nomzod">
                                1-Nomzod
                            </label>
                            <input onChange={formik.handleChange} value={formik.values.nomzod1} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline" id="nomzod" type="text" placeholder="Nomzod" required />
                        </div>
                        <div className="mb-4">
                            <div className=''>
                                <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="nomzod2">
                                    2-Nomzod
                                </label>
                                <div className='flex justify-between gap-3'>
                                    <input onChange={formik.handleChange} value={formik.values.nomzod2} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline" id="nomzod2" type="text" placeholder="Nomzod" />
                                    <button type="button" onClick = {() => setIsActiveTwoo(true)} className={`${isActiveTwoo && "hidden"} px-3 font-bold shadow appearance-none border rounded text-2xl text-gray-700 mb-3 leading-tight`}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className={`${isActiveTwoo ? "" : "hidden"} mb-4`}>
                            <div className=''>
                                <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="nomzod3">
                                    3-Nomzod
                                </label>
                                <div className='flex justify-between gap-3'>
                                    <input onChange={formik.handleChange} value={formik.values.nomzod3} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline" id="nomzod3" type="text" placeholder="Nomzod" />
                                    <button type="button" onClick = {() => setIsActiveThree(true)} className={`${isActiveThree && "hidden"} px-3 font-bold shadow appearance-none border rounded text-2xl text-gray-700 mb-3 leading-tight`}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className={`${isActiveThree ? "" : "hidden"} mb-4`}>
                            <div className=''>
                                <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="nomzod4">
                                    4-Nomzod
                                </label>
                                <div className='flex justify-between gap-3'>
                                    <input onChange={formik.handleChange} value={formik.values.nomzod4} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline" id="nomzod4" type="text" placeholder="Nomzod" />
                                    <button type="button" onClick = {() => setIsActiveFour(true)} className={`${isActiveFour && "hidden"} px-3 font-bold shadow appearance-none border rounded text-2xl text-gray-700 mb-3 leading-tight`}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className={`${isActiveFour ? "" : "hidden"} mb-4`}>
                            <div className=''>
                                <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="nomzod5">
                                    5-Nomzod
                                </label>
                                <div className='flex justify-between gap-3'>
                                    <input onChange={formik.handleChange} value={formik.values.nomzod5} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline" id="nomzod5" type="text" placeholder="Nomzod" />
                                    <button type="button" onClick = {() => setIsActiveFive(true)} className={`${isActiveFive && "hidden"} px-3 font-bold shadow appearance-none border rounded text-2xl text-gray-700 mb-3 leading-tight`}>+</button>
                                </div>
                            </div>
                        </div>
                        <div className={`${isActiveFive ? "" : "hidden"} mb-4`}>
                            <div className=''>
                                <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="nomzod6">
                                    6-Nomzod
                                </label>
                                <div className='flex justify-between gap-3'>
                                    <input onChange={formik.handleChange} value={formik.values.nomzod6} className={` shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline`} id="nomzod6" type="text" placeholder="Nomzod" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <button className="bg-[#05B967] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Qo'shish
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddTaklifCom;


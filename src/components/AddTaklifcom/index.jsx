import React, { useState } from 'react'
import Breadcrumb from "../Breadcrumb";


const AddTaklifCom = () => {

    const [num, setNum] = useState('');
    const changeToNumbers = event => {
        const result = event.target.value.replace(/\D/g, '');

        setNum(result);
    };

    return (
        <div className="bg-[#F3F7FA] min-h-[calc(100vh-125px)]">
            <Breadcrumb locationPage="Takliflar" locationPageTwo="Taklif kiritish" />
            <h2 className='text-2xl font-semibold text-center my-5'>Taklif kiritish</h2>

            <div className="w-full max-w-xs sm:max-w-sm md:max-w-xl xl:max-w-3xl mx-auto">
                {/* Radio */}
                <ul className="items-center w-full text-sm lg:text-xl font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-5">
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input defaultChecked id="horizontal-list-radio-license" type="radio" value="" name="list-radio" className="w-4 h-4 text-[#05b967] dark:focus:ring-[#05b967] dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm lg:text-xl font-semibold text-gray-700 dark:text-gray-300">Yagona nomzod </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input id="horizontal-list-radio-id" type="radio" value="" name="list-radio" className="w-4 h-4 text-[#05b967] dark:focus:ring-[#05b967] dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm lg:text-xl font-semibold text-gray-700 dark:text-gray-300">Ko'proq nomzod qo'shish</label>
                        </div>
                    </li>
                </ul>

                {/* FORM */}
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="taklif">
                            Taklif nomi
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline" id="taklif" placeholder="Taklif" />
                    </div>

                    <div className='grid md:grid-cols-2 gap-0 md:gap-4'>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="vaqt">
                                Berilgan vaqt (daqiqa)
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline" id="vaqt" type="text" placeholder="Vaqt" value={num} onChange={changeToNumbers} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="nomzod">
                                Nomzod
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline" id="nomzod" type="text" placeholder="Nomzod" />
                        </div>
                    </div>
                    <div className="flex items-center justify-end">
                        <button className="bg-[#05B967] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Qo'shish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTaklifCom;
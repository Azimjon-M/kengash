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
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="taklif">
                            Taklif nomi
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="taklif" placeholder="Taklif" />
                    </div>
                    <div className='grid md:grid-cols-2 md:gap-4'>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="nomzod">
                                Nomzod
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="nomzod" type="text" placeholder="Nomzod" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2" htmlFor="vaqt">
                                Berilgan vaqt (daqiqa)
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="vaqt" type="text" placeholder="Vaqt" value={num} onChange={changeToNumbers} />
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
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AzoTakliflarCom = () => {

    const apiUrl = 'https://kengash.pythonanywhere.com/api/v1/taklif/';
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
            .then(data => setData(data))
            .catch(error => console.error('Xatolik:', error));
    }, []);
    // console.log(Date.now());

    return (
        <div className='bg-[#F3F7FA] min-h-[calc(100vh-125px)] px-2'>
            <div className='md:p-8'>
                <h2 className='text-center text-2xl xl:text-3xl font-semibold mb-5'>Takliflar</h2>
                <Link>
                    <div>
                        {
                            data.map((taklif, idx) => {
                                return (
                                    <div key={idx}>
                                        {!taklif.bitalik_taklif ?
                                            <div className='border-2 rounded p-2 lg:px-8 mb-5 shadow-md'>
                                                {/* VAQT */}
                                                <div className='flex items-center justify-between mb-5'>
                                                    <h2 className='text-2xl font-semibold'>Berilgan vaqt</h2>
                                                    <span className="countdown font-mono text-2xl font-bold">
                                                        <span style={{ "--value": 24 }}></span>:
                                                        <span style={{ "--value": 28 }}></span>
                                                    </span>
                                                </div>
                                                {/* TAKLIF */}
                                                <div className='mb-5 md:text-lg xl:text-xl'><b>Taklif: </b>{taklif.name}</div>
                                                {/* NOMZOD */}
                                                <div className='mb-5 md:text-lg xl:text-xl'><b>Nomzod: </b>{taklif.nomzod}</div>
                                                {/* BUTTONS */}
                                                <div className='flex items-center justify-between md:justify-end'>
                                                    <button className='btn btn-sm md:btn md:text-white rounded bg-green-600 md:bg-green-600 w-[100px] md:w-[120px] lg:text-lg md:mx-3 text-white'>Roziman</button>
                                                    <button className='btn btn-sm md:btn md:text-white rounded bg-red-600 md:bg-red-600 w-[100px] md:w-[120px] lg:text-lg md:mx-3 text-white'>Qarshiman</button>
                                                    <button className='btn btn-sm md:btn md:text-white rounded bg-yellow-600 md:bg-yellow-600 w-[100px] md:w-[120px] lg:text-lg md:ml-3 text-white'>Betarafman</button>
                                                </div>
                                            </div>
                                            :
                                            <div className='border-2 rounded p-2 lg:px-8 mb-5 shadow-md'>
                                                {/* VAQT */}
                                                <div className='flex items-center justify-between mb-5'>
                                                    <h2 className='text-2xl font-semibold'>Berilgan vaqt</h2>
                                                    <span className="countdown font-mono text-2xl font-bold">
                                                        <span style={{ "--value": 24 }}></span>:
                                                        <span style={{ "--value": 28 }}></span>
                                                    </span>
                                                </div>
                                                {/* TAKLIF */}
                                                <div className='mb-5 md:text-lg xl:text-xl'><b>Taklif: </b>{taklif.name}</div>
                                                {/* NOMZOD */}
                                                <h3 className='text-2xl font-semibold text-center mb-5'>Nomzodlar</h3>
                                                <div className='text-center md:flex md:items-center md:justify-around md:flex-wrap'>
                                                    <div className='mb-5 md:text-lg xl:text-xl'><button className='btn'>{taklif.nomzod}</button></div>
                                                    <div className='mb-5 md:text-lg xl:text-xl'><button className='btn'>{taklif.nomzod1}</button></div>
                                                    <div className='mb-5 md:text-lg xl:text-xl'><button className='btn'>{taklif.nomzod2}</button></div>
                                                    <div className='mb-5 md:text-lg xl:text-xl'><button className='btn'>{taklif.nomzod3}</button></div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AzoTakliflarCom;
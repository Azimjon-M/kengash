import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AzoTakliflarCom = () => {

    const apiUrlDefault = 'https://kengash.pythonanywhere.com/api/v1/taklif/';
    const apiUrlPost = 'https://kengash.pythonanywhere.com/api/v1/taklif/baxo/'
    const getToken = Object.keys(localStorage)[0];
    const token = localStorage.getItem(`${getToken}`);

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(apiUrlDefault, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Xatolik:', error));
    }, []);

    // POST DATA
    const handleVote = (user_id, taklif_id, nomzod, action) => {
        const postData = {
            user_id: user_id,
            taklif_id: taklif_id,
            bitalik_taklif: true,
            nomzod: nomzod,
            rozilar: action === 'roziman',
            qarshilar: action === 'qarshiman',
            betaraflar: action === 'betarafman',
        };
    
        fetch(`${apiUrlPost}${user_id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(postData),
        })
            .then(response => response.json())
            .then(result => {
                // Handle the result as needed
                console.log('Post Result:', result);
            })
            .catch(error => console.error('Xatolik:', error));
    };


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
                                        {taklif.bitalik_taklif ?
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
                                                    <button onClick={() => handleVote(taklif.id, 'roziman')} className='btn btn-sm md:btn md:text-white rounded bg-green-600 hover:bg-green-500 md:bg-green-600 w-[100px] md:w-[120px] lg:text-lg md:mx-3 text-white'>Roziman</button>
                                                    <button onClick={() => handleVote(taklif.id, 'qarshiman')} className='btn btn-sm md:btn md:text-white rounded bg-red-600 hover:bg-red-500 md:bg-red-600 w-[100px] md:w-[120px] lg:text-lg md:mx-3 text-white'>Qarshiman</button>
                                                    <button onClick={() => handleVote(taklif.id, 'betarafman')} className='btn btn-sm md:btn md:text-white rounded bg-yellow-600 hover:bg-yellow-500 md:bg-yellow-600 w-[100px] md:w-[120px] lg:text-lg md:ml-3 text-white'>Betarafman</button>
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
                                                <div className='text-center md:flex md:items-center md:justify-evenly md:flex-wrap'>
                                                    <div className='mb-5 md:text-lg xl:text-xl'><button className='btn bg-blue-600 hover:bg-blue-500 text-white'>{taklif.nomzod}</button></div>
                                                    <div className='mb-5 md:text-lg xl:text-xl'><button className='btn bg-blue-600 hover:bg-blue-500 text-white'>{taklif.nomzod1}</button></div>
                                                    <div className={`${taklif.nomzod2 ? "" : "hidden"} mb-5 md:text-lg xl:text-xl`}><button className='btn bg-blue-600 hover:bg-blue-500 text-white'>{taklif.nomzod2}</button></div>
                                                    <div className={`${taklif.nomzod3 ? "" : "hidden"} mb-5 md:text-lg xl:text-xl`}><button className='btn bg-blue-600 hover:bg-blue-500 text-white'>{taklif.nomzod3}</button></div>
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
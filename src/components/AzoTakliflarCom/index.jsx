import React, { useState, useEffect } from 'react';

const AzoTakliflarCom = () => {

    const apiUrlDefault = 'https://kengash.pythonanywhere.com/api/v1/taklif/';
    const apiUrlPost = 'https://kengash.pythonanywhere.com/api/v1/taklif/baxo/'
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]);

    // GET DATA
    const GetDataFromAPI = () => {
        const token = localStorage.getItem('token');
        fetch(apiUrlDefault, {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Xatolik:", error));
    };
    const getTime = () => {
        data.map((item) => {
            //TUGASH VAQTI
            let vaqt = item.tugash_vaqti.split(":").map(Number);
            let now = new Date()
            // QOLGAN VAQT
            let qolganVaqt = (vaqt[0] * 60 * 60 + vaqt[1] * 60) - (now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds());
            let qolganMinut = Math.floor(qolganVaqt / 60)
            let qolganSeconds = (qolganVaqt % 60)
            console.log(qolganMinut, qolganSeconds);
            return (qolganMinut, qolganSeconds);
        })
    };
    useEffect(() => {
        GetDataFromAPI();
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
    }, []);


    // POST DATA
    const handleVote = ({ id, name, bitalik_taklif }, action) => {
        let postData = {
            taklif_id: id,
            name: name,
            bitalik_taklif: bitalik_taklif,
            user_id: id,
        };

        switch (action) {
            case "1":
                postData.rozilar = true;
                postData.qarshilar = false;
                postData.betaraflar = false;
                break;
            case "2":
                postData.rozilar = false;
                postData.qarshilar = true;
                postData.betaraflar = false;
                break;
            case "3":
                postData.rozilar = false;
                postData.qarshilar = false;
                postData.betaraflar = true;
                break;
            default:
                postData.rozilar = false;
                postData.qarshilar = false;
                postData.betaraflar = false;
                break;
        }

        fetch(`${apiUrlPost}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(postData),
        })
            .then(response => response.json())
            .then(result => {
                console.log('Post Result:', result);
            })
            .catch(error => console.error('Xatolik:', error));
    };


    // POST DATA FOR ALL TAKLIFLAR
    const handleNomzodVote = ({ id, name, bitalik_taklif }, action) => {
        const userId = localStorage.getItem("user_id");
        let postData = {
            taklif_id: id,
            name: name,
            bitalik_taklif: bitalik_taklif,
            user_id: userId,
        };

        switch (action) {
            case "1":
                postData.nomzod = true;
                postData.nomzod1 = false;
                postData.nomzod2 = false;
                postData.nomzod3 = false;
                break;
            case "2":
                postData.nomzod = false;
                postData.nomzod1 = true;
                postData.nomzod2 = false;
                postData.nomzod3 = false;
                break;
            case "3":
                postData.nomzod = false;
                postData.nomzod1 = false;
                postData.nomzod2 = true;
                postData.nomzod3 = false;
                break;
            case "4":
                postData.nomzod = false;
                postData.nomzod1 = false;
                postData.nomzod2 = false;
                postData.nomzod3 = true;
                break;
            default:
                postData.nomzod = false;
                postData.nomzod1 = false;
                postData.nomzod2 = false;
                postData.nomzod3 = false;
                break;
        }
        fetch(`${apiUrlPost}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(postData),
        })
            .then(response => response.json())
            .then(result => {
                console.log('Post Result:', result);
            })
            .catch(error => console.error('Xatolik:', error));
    };


    return (
        <div className='bg-[#F3F7FA] min-h-[calc(100vh-125px)] px-2'>
            <div className='md:p-8'>
                <h2 className='text-center text-2xl xl:text-3xl font-semibold mb-5'>Takliflar</h2>
                <div>
                    {
                        data.map((taklif, idx) => {
                            return (
                                <div key={idx}>
                                    {(taklif.yoqish) &&
                                        (
                                            (taklif.bitalik_taklif) ?
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
                                                    <div className='flex items-center justify-between md:justify-end md:gap-3'>
                                                        <button onClick={() => handleVote(taklif, '1')} className='btn btn-sm md:btn md:text-white rounded bg-green-600 hover:bg-green-500 md:bg-green-600 w-[100px] md:w-[120px] lg:text-lg text-white'>Roziman</button>
                                                        <button onClick={() => handleVote(taklif, '2')} className='btn btn-sm md:btn md:text-white rounded bg-red-600 hover:bg-red-500 md:bg-red-600 w-[100px] md:w-[120px] lg:text-lg text-white'>Qarshiman</button>
                                                        <button onClick={() => handleVote(taklif, '3')} className='btn btn-sm md:btn md:text-white rounded bg-yellow-600 hover:bg-yellow-500 md:bg-yellow-600 w-[100px] md:w-[120px] lg:text-lg text-white'>Betarafman</button>
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
                                                    {/* NOMZODLAR */}
                                                    <div className='text-center md:flex md:items-center md:justify-end gap-3 md:flex-wrap'>

                                                        <div className='mb-5 md:text-lg xl:text-xl'><button onClick={() => handleNomzodVote(taklif, '1')} className='btn bg-blue-600 hover:bg-blue-500 text-white'>{taklif.nomzod}</button></div>
                                                        <div className='mb-5 md:text-lg xl:text-xl'><button onClick={() => handleNomzodVote(taklif, '2')} className='btn bg-blue-600 hover:bg-blue-500 text-white'>{taklif.nomzod1}</button></div>
                                                        <div className={`${taklif.nomzod2 ? "" : "hidden"} mb-5 md:text-lg xl:text-xl`}><button onClick={() => handleNomzodVote(taklif, '3')} className='btn bg-blue-600 hover:bg-blue-500 text-white'>{taklif.nomzod2}</button></div>
                                                        <div className={`${taklif.nomzod3 ? "" : "hidden"} mb-5 md:text-lg xl:text-xl`}><button onClick={() => handleNomzodVote(taklif, '4')} className='btn bg-blue-600 hover:bg-blue-500 text-white'>{taklif.nomzod3}</button></div>
                                                    </div>
                                                </div>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AzoTakliflarCom;

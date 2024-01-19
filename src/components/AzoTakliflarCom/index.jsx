import React, { useState, useEffect } from 'react';
import Breadcrumb from "../Breadcrumb";

const AzoTakliflarCom = () => {

    const apiUrlDefault = 'https://kengash.pythonanywhere.com/api/v1/taklif/';
    const apiUrlPost = 'https://kengash.pythonanywhere.com/api/v1/taklif/baxo/';
    const apiUrlDavomat = 'https://kengash.pythonanywhere.com/api/v1/davomat/';
    const token = localStorage.getItem('token');

    const [activeData, setActiveData] = useState(false)
    const [data, setData] = useState([]);
    const [filtredData, setFiltredData] = useState([data])
    const [isID, setIsID] = useState([])
    const [taklifId, setTaklifId] = useState([])

    // GET DAVOMAT
    const GetDataFromDavomat = () => {
        const token = localStorage.getItem('token');
        fetch(apiUrlDavomat, {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const isActive = data.map(item => {
                    if (item.aktiv) {
                        return true;
                    }
                    return false;
                })
                setActiveData(isActive);
                console.log(isActive);
            })
            .catch((error) => console.error("Xatolik:", error));
    };

    useEffect(() => {
        GetDataFromDavomat();
    }, []);



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
            .then((data) => {
                setData(data);
                setFiltredData(data.filter(item => item.tugash === false && item.yoqish === true));
            })
            .catch((error) => console.error("Xatolik:", error));
    };

    useEffect(() => {
        GetDataFromAPI();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setFiltredData(filtredData => filtredData.map(item => {
                if (item.tugash_vaqti) {
                    let vaqt = item.tugash_vaqti.split(":").map(Number);
                    let now = new Date();
                    let qolganVaqt = (vaqt[0] * 60 * 60 + vaqt[1] * 60) - (now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds());
                    let qolganMinut = Math.floor(qolganVaqt / 60);
                    let qolganSeconds = qolganVaqt % 60;
                    return { ...item, qolganMinut, qolganSeconds };
                } else {
                    return item;
                }
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);





    // CHECK DATA
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${apiUrlPost}`, {
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((card) => {
                card.forEach(element => {
                    if (element.rozilar || element.qarshilar || element.betaraflar || element.nomzod || element.nomzod1 || element.nomzod2 || element.nomzod3) {
                        setIsID(element.taklif_id)
                        return element.taklif_id
                    }
                });
            })
            .catch((error) => console.error('Xatolik:', error));
    }, []);



    // POST DATA
    const handleVote = ({ id, name, bitalik_taklif }, action) => {
        const user_id = localStorage.getItem('user_id');
        if (isID === taklifId) {
            alert("Siz ovoz berib bo'lgansiz.!")
        } else {
            let postData = {
                taklif_id: id,
                name: name,
                bitalik_taklif: bitalik_taklif,
                user_id: user_id,
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
                    setTaklifId(result => result.taklif_id)
                    console.log('Post Result:', result);
                    alert("Ovozingiz muvaffaqiyatli qo'shildi.!")
                })
                .catch(error => console.error('Xatolik:', error));
        };
    }


    // POST DATA FOR ALL TAKLIFLAR
    const handleNomzodVote = ({ id, name, bitalik_taklif }, action) => {
        const userId = localStorage.getItem("user_id");
        if (isID === taklifId) {
            alert("Siz ovoz berib bo'lgansiz.!")
        } else {
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
                    setTaklifId(result => result.taklif_id)
                    console.log('Post Result:', result);
                    alert("Ovozingiz muvaffaqiyatli qo'shildi.!")
                })
                .catch(error => console.error('Xatolik:', error));
        };
    }

    // FAOLLASHTIRISH
    useEffect(() => {
        filtredData.forEach((taklif) => {
            if (taklif.qolganMinut <= 0 && taklif.qolganSeconds <= 0 && !taklif.tugash) {
                handleChangeActive(taklif);
            }
        });
    }, [filtredData]);

    const handleChangeActive = ({
        id,
        name,
        bitalik_taklif,
        nomzod,
        nomzod1,
        nomzod2,
        nomzod3,
        yoqish,
    }) => {
        fetch(`${apiUrlDefault}${id}/`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
                name: name,
                bitalik_taklif: bitalik_taklif,
                nomzod: nomzod,
                nomzod1: nomzod1,
                nomzod2: nomzod2,
                nomzod3: nomzod3,
                yoqish: yoqish,
                tugash: true,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    GetDataFromAPI();
                } else {
                    console.error("Error updating item:", response.statusText);
                }
            })
            .catch((error) => console.error("Xatolik:", error));
    };
    console.log(activeData);

    return (
        <div className='bg-[#F3F7FA] min-h-[calc(100vh-125px)]'>
            <Breadcrumb locationPage="Takliflar" />
            <div className='px-2 md:p-8'>
                <h2 className='text-center text-2xl xl:text-3xl font-semibold mb-5'>Takliflar</h2>
                <div>
                    {
                        filtredData.map((taklif, idx) => {
                            return (
                                <div key={idx}>
                                    {(taklif.yoqish && activeData) &&
                                        (
                                            (taklif.bitalik_taklif) ?
                                                (taklif.tugash) ? null : (
                                                    <div className='border-2 rounded p-2 lg:px-8 mb-5 shadow-md'>
                                                        {/* VAQT */}
                                                        <div className='flex items-center justify-between mb-5'>
                                                            <h2 className='text-2xl font-semibold'>Berilgan vaqt</h2>
                                                            {taklif.tugash ? (
                                                                <span className="countdown font-mono text-2xl font-bold text-red-500">00:00</span>
                                                            ) : (
                                                                <span className="countdown font-mono text-2xl font-bold">
                                                                    <span style={{ "--value": taklif.qolganMinut }}></span>:
                                                                    <span style={{ "--value": taklif.qolganSeconds }}></span>
                                                                </span>
                                                            )}
                                                        </div>
                                                        {/* TAKLIF */}
                                                        <div className='mb-5 md:text-lg xl:text-xl'><b>Taklif: </b>{taklif.name}</div>
                                                        {/* NOMZOD */}
                                                        <div className='mb-5 md:text-lg xl:text-xl'><b>Nomzod: </b>{taklif.nomzod}</div>
                                                        {/* BUTTONS */}
                                                        <div className='flex items-center justify-between md:justify-end md:gap-3'>
                                                            <button
                                                                onClick={() => handleVote(taklif, '1')}
                                                                className={`btn btn-sm md:btn md:text-white rounded ${taklif.tugash ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 md:bg-green-600'
                                                                    } w-[100px] md:w-[120px] lg:text-lg text-white`}

                                                            >
                                                                Roziman
                                                            </button>
                                                            <button
                                                                onClick={() => handleVote(taklif, '2')}
                                                                className={`btn btn-sm md:btn md:text-white rounded ${taklif.tugash ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 md:bg-red-600'
                                                                    } w-[100px] md:w-[120px] lg:text-lg text-white`}

                                                            >
                                                                Qarshiman
                                                            </button>
                                                            <button
                                                                onClick={() => handleVote(taklif, '3')}
                                                                className={`btn btn-sm md:btn md:text-white rounded ${taklif.tugash ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-500 md:bg-yellow-600'
                                                                    } w-[100px] md:w-[120px] lg:text-lg text-white`}

                                                            >
                                                                Betarafman
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                                :
                                                (taklif.tugash) ? null : (
                                                    <div className='border-2 rounded p-2 lg:px-8 mb-5 shadow-md'>
                                                        {/* VAQT */}
                                                        <div className='flex items-center justify-between mb-5'>
                                                            <h2 className='text-2xl font-semibold'>Berilgan vaqt</h2>
                                                            {taklif.tugash ? (
                                                                <span className="countdown font-mono text-2xl font-bold text-red-500">00:00</span>
                                                            ) : (
                                                                <span className="countdown font-mono text-2xl font-bold">
                                                                    <span style={{ "--value": taklif.qolganMinut }}></span>:
                                                                    <span style={{ "--value": taklif.qolganSeconds }}></span>
                                                                </span>
                                                            )}
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

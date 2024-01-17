import React, { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumb";
import { NavLink } from "react-router-dom";
import { FaXmark, FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

const TakliflarCom = () => {
    const apiUrlDefault = "https://kengash.pythonanywhere.com/api/v1/taklif/";
    const [data, setData] = useState([]);
    const [isPendingDel, setIsPendingDel] = useState(false);

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
    useEffect(() => {
        GetDataFromAPI();
    }, []);

    // DELETE ONE BY ONE DATA
    const handleDelete = (id) => {
        setIsPendingDel(true);            
        
        const token = localStorage.getItem('token');

        if (isPendingDel) {
            fetch(`${apiUrlDefault}${id}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (response.ok) {
                        setData((prevData) =>
                            prevData.filter((item) => item.id !== id)
                        );
                    } else {
                        console.error(
                            "Error deleting item:",
                            response.statusText
                        );
                    }
                })
                .catch((error) => console.error("Xatolik:", error));
        } else {
        }
    };

    // DELETE ALL DATA
    const handleClearData = () => {
        const isConfirmed = window.confirm(
            "Barcha ma'lumotlarni o'chirishni hohlaysizmi?"
        );

        if (isConfirmed) {
            
            const token = localStorage.getItem('token');

            Promise.all(
                data.map((item) => {
                    const itemUrl = `${apiUrlDefault}${item.id}/`;

                    return fetch(itemUrl, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Token ${token}`,
                            "Content-Type": "application/json",
                        },
                    })
                        .then((response) => {
                            if (!response.ok) {
                                console.error(
                                    `Error deleting item with ID ${item.id}:`,
                                    response.statusText
                                );
                            }
                        })
                        .catch((error) => console.error("Xatolik:", error));
                })
            ).then(() => {
                setData([]);
            });
        }
    };

    // FAOLLASHTIRISH
    const handleChangeActive = ({
        id,
        name,
        nomzod,
        bitalik_taklif,
        vaqt,
        nomzod1,
        nomzod2,
        nomzod3,
    }) => {
        
        const token = localStorage.getItem('token');

        const nowDataTime = new Date();
        const nowHover = nowDataTime.getHours();
        const nowMinutes = nowDataTime.getMinutes();

        const convertToMinute = nowHover * 60 + nowMinutes + vaqt;
        const newVaqt = `${Math.floor(convertToMinute / 60)}:${
            convertToMinute % 60
        }`;

        fetch(`${apiUrlDefault}${id}/`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bitalik_taklif: bitalik_taklif,
                id: id,
                name: name,
                nomzod: nomzod,
                nomzod1: nomzod1,
                nomzod2: nomzod2,
                nomzod3: nomzod3,
                tugash_vaqti: newVaqt,
                vaqt: vaqt,
                yoqish: true,
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

    // FAOLSIZLASHTIRISH
    const handleChangeNoActive = ({
        id,
        name,
        nomzod,
        bitalik_taklif,
        vaqt,
        nomzod1,
        nomzod2,
        nomzod3,
    }) => {
        
        const token = localStorage.getItem('token');

        fetch(`${apiUrlDefault}${id}/`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bitalik_taklif: bitalik_taklif,
                id: id,
                name: name,
                nomzod: nomzod,
                nomzod1: nomzod1,
                nomzod2: nomzod2,
                nomzod3: nomzod3,
                tugash_vaqti: "",
                vaqt: vaqt,
                yoqish: false,
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
                <div className="text-xl font-semibold text-center mt-4">
                    Kengashga qo'yilmagan takliflar:
                </div>
                <div className="flex flex-col-reverse items-center gap-y-4 px-3 overflow-hidden">
                    {data.map(
                        (item) =>
                            !item.yoqish && (
                                <div
                                    data-aos="fade-left"
                                    key={item.id}
                                    className="w-full border bg-white border-gray-500 rounded-md bg-gradient-to-r from-gray-50 to-gray-400 p-2"
                                >
                                    <div className="line-clamp-1">
                                        <b>Taklif nomi:</b> {item.name}
                                    </div>
                                    {item.bitalik_taklif ? (
                                        <div>
                                            <b>Nomzod:</b> {item.nomzod}
                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                <b>Nomzod 1:</b> {item.nomzod}
                                            </div>
                                            <div>
                                                <b>Nomzod 2:</b> {item.nomzod1}
                                            </div>
                                            <div
                                                className={` ${
                                                    item.nomzod2 ? "" : "hidden"
                                                }`}
                                            >
                                                <b>Nomzod 3:</b> {item.nomzod2}
                                            </div>
                                            <div
                                                className={` ${
                                                    item.nomzod3 ? "" : "hidden"
                                                }`}
                                            >
                                                <b>Nomzod 4:</b> {item.nomzod3}
                                            </div>
                                            <div>{item.yoqish}</div>
                                        </>
                                    )}
                                    <div>
                                        <b>Berilgan vaqt:</b> {item.vaqt} daqiqa
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            className="btn btn-sm btn-success bg-[#05B967] font-medium text-white mb-4"
                                            onClick={() =>
                                                handleChangeActive(item)
                                            }
                                        >
                                            Faollashtirish
                                        </button>
                                    </div>
                                    <div className="flex justify-end items-center gap-x-2">
                                        <MdDeleteOutline
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            className="cursor-pointer text-[24px] text-red-600"
                                        />
                                    </div>
                                </div>
                            )
                    )}
                </div>

                <div className="text-xl font-semibold text-center mt-8">
                    Kengashga qo'yilgan takliflar:
                </div>
                <div className="flex flex-col items-center gap-y-4 px-3 mb-6 overflow-hidden">
                    {data.map(
                        (item) =>
                            item.yoqish && (
                                <div
                                    data-aos="fade-right"
                                    key={item.id}
                                    className="w-full border bg-white border-gray-500 rounded-md bg-gradient-to-r from-green-500 to-green-200 p-2"
                                >
                                    <div className="line-clamp-1">
                                        <b>Taklif nomi:</b> {item.name}
                                    </div>
                                    <div>
                                        <b>Nomzod:</b> {item.nomzod}
                                    </div>
                                    <div>
                                        <b>Berilgan vaqt:</b> {item.vaqt} daqiqa
                                    </div>
                                    <div>
                                        <b>Tugash vaqti:</b> {item.tugash_vaqti}
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() =>
                                                handleChangeNoActive(item)
                                            }
                                            className="btn btn-sm btn-error bg-red-600 font-medium text-white"
                                        >
                                            Faolsizlashtirish
                                        </button>
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>
        </div>
    );
};

export default TakliflarCom;

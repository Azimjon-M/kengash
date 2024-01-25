import React, { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumb";
import { NavLink } from "react-router-dom";
import { FaXmark, FaPlus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import adminTaklif from "../../services/adminTaklif";

const TakliflarCom = () => {
    const [data, setData] = useState([]);
    const [activeData, setActiveData] = useState([]);
    const [noActiveData, setNoActiveData] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveData((filtredData) =>
                filtredData.map((item) => {
                    if (item.tugash_vaqti) {
                        let vaqt = item.tugash_vaqti.split(":").map(Number);
                        let now = new Date();
                        let qolganVaqt =
                            vaqt[0] * 60 * 60 +
                            vaqt[1] * 60 -
                            (now.getHours() * 60 * 60 +
                                now.getMinutes() * 60 +
                                now.getSeconds());
                        let qolganMinut = Math.floor(qolganVaqt / 60);
                        let qolganSeconds = qolganVaqt % 60;
                        return { ...item, qolganMinut, qolganSeconds };
                    } else {
                        return item;
                    }
                })
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // FAOLLSHGAN VAQTI TUGAGANDA tugash: true
    useEffect(() => {
        activeData.forEach((item) => {
            if (item.qolganMinut <= 0 && item.qolganSeconds <= 0) {
                // tugash: true Method:PUT
                adminTaklif.put(item.id, { ...item, tugash: true });
                getData();
            }
        });
    }, [activeData]);

    // GET DATA,
    const getData = async () => {
        const { data: resData } = await adminTaklif.get();
        setData(resData);
        setActiveData(
            resData.filter(
                (item) => item.tugash === false && item.yoqish === true
            )
        );
        setNoActiveData(
            resData.filter(
                (item) => item.tugash === false && item.yoqish === false
            )
        );
    };

    useEffect(() => {
        getData();
    }, []);

    // DELETE ONE DATA
    const handleDelete = async (id) => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
        await adminTaklif.del(id);
        getData();
    };

    // DELETE ALL DATA
    const handleClearData = () => {
        const isConfirmed = window.confirm(
            "Barcha ma'lumotlarni o'chirishni hohlaysizmi?"
        );
        if (isConfirmed) {
            setActiveData([]);
            setNoActiveData([]);
            Promise.all(
                data.map(async (item) => {
                    await adminTaklif.del(item.id);
                })
            );
        }
        getData();
    };

    // Activate
    const handleChangeActive = async ({ id, name, nomzod, vaqt }) => {
        const nowDataTime = new Date();
        const nowHover = nowDataTime.getHours();
        const nowMinutes = nowDataTime.getMinutes();

        const convertToMinute = nowHover * 60 + nowMinutes + vaqt;
        const newTime = `${Math.floor(convertToMinute / 60)}:${
            convertToMinute % 60
        }`;
        const body = {
            name: name,
            nomzod: nomzod,
            tugash_vaqti: newTime,
            yoqish: true,
        };

        await adminTaklif.put(id, body);
        getData();
    };

    // NoActivate
    const handleChangeNoActive = async ({ id, name, nomzod }) => {
        const body = {
            name: name,
            nomzod: nomzod,
            tugash_vaqti: "",
            yoqish: false,
        };

        await adminTaklif.put(id, body);
        getData();
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
                    {noActiveData.length ? (
                        noActiveData.map(
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
                                                    <b>Nomzod 1:</b>{" "}
                                                    {item.nomzod}
                                                </div>
                                                <div>
                                                    <b>Nomzod 2:</b>{" "}
                                                    {item.nomzod1}
                                                </div>
                                                <div
                                                    className={` ${
                                                        item.nomzod2
                                                            ? ""
                                                            : "hidden"
                                                    }`}
                                                >
                                                    <b>Nomzod 3:</b>{" "}
                                                    {item.nomzod2}
                                                </div>
                                                <div
                                                    className={` ${
                                                        item.nomzod3
                                                            ? ""
                                                            : "hidden"
                                                    }`}
                                                >
                                                    <b>Nomzod 4:</b>{" "}
                                                    {item.nomzod3}
                                                </div>
                                                <div>{item.yoqish}</div>
                                            </>
                                        )}
                                        <div>
                                            <b>Berilgan vaqt:</b> {item.vaqt}{" "}
                                            daqiqa
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
                        )
                    ) : (
                        <div className="text-red-500">
                            Ma'lumotlar joylanamagan!
                        </div>
                    )}
                </div>

                <div className="text-xl font-semibold text-center mt-8">
                    Kengashga qo'yilgan takliflar:
                </div>
                <div className="flex flex-col items-center gap-y-4 px-3 mb-6 overflow-hidden">
                    {activeData.length ? (
                        activeData.map(
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
                                            <b>Berilgan vaqt:</b> {item.vaqt}{" "}
                                            daqiqa
                                        </div>
                                        <div>
                                            <b>Tugash vaqti:</b>{" "}
                                            {item.tugash_vaqti}
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
                        )
                    ) : (
                        <div className="text-red-500">
                            Ma'lumotlar joylanmagan!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TakliflarCom;

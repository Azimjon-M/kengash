import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb";
// import axios from "axios";
import Chart from "../Chart";
import Charts from "../Charts";
import statistikaAPI from "../../services/statistika";
import { FaXmark } from "react-icons/fa6";
import taklifApi from "../../services/taklif";

const StatistikaCom = () => {
    const [dataTaklif, setDataTaklif] = useState([]);
    const [dataStatistiak, setDataStatistiak] = useState([]);

    const [isDataOne, setIsDataOne] = useState([]);
    const [isDataTwoo, setIsDataTwoo] = useState();

    const getData = async () => {
        const {data: dataT} = await statistikaAPI.getT();
        const {data: dataS} = await statistikaAPI.getS();
        if (dataT) {
            setDataTaklif(dataT.filter((item) => item.tugash === true))
        }
        if (dataS) {
            setDataStatistiak(dataS)
        }
    }

        // DELETE ALL DATA
        const handleClearData = async () => {
            console.log(dataStatistiak)
            const isConfirmed = window.confirm(
                "Barcha ma'lumotlarni o'chirishni hohlaysizmi?"
            );
            if (isConfirmed) {
                Promise.all(
                    dataTaklif.map(async (item) => {
                        await taklifApi.del(item.id);
                    })
                );
            }
            getData();
        };
    

    useEffect(() => {
        getData()
    }, []);

    useEffect(() => {
        const filtered = dataStatistiak.filter((statistika) =>
            dataTaklif.some(
                (taklif) => Number(statistika.taklif_id) === Number(taklif.id)
            )
        );
        setIsDataOne(filtered.filter((item) => item.bitalik_taklif === true));
        setIsDataTwoo(filtered.filter((item) => item.bitalik_taklif === false));
    }, [dataStatistiak, dataTaklif]);

    return (
        <div className="min-h-[calc(100vh-125px)] bg-[#F3F7FA]">
            <Breadcrumb locationPage="Statistika" />
            <div className="max-w-7xl mx-auto pb-10">
                <h1 className="md:text-4xl font-bold text-green-700 text-center mt-10 md:my-16">
                    Statistika bo'limi
                </h1>
                <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-y-4 sm:gap-x-4 py-4 sm:px-4">
                    <button
                        onClick={() => handleClearData()}
                        className="text-[16px] btn btn-error font-medium text-white"
                    >
                        Barcha statistikani o'chirish <FaXmark />
                    </button>
                </div>
                <div className="flex flex-col gap-y-4 mt-5 px-5">
                    {isDataOne &&
                        isDataOne.map((item, idx) => (
                            <Chart key={`Chart-${idx}`} dataes={item} />
                        ))}
                </div>
                <div className="flex flex-col gap-y-4 mt-5 px-5">
                    {isDataTwoo &&
                        isDataTwoo.map((item, idx) => (
                            <Charts key={idx} dataes={item} />
                        ))}
                </div>
            </div>
        </div>
    );
};
export default StatistikaCom;

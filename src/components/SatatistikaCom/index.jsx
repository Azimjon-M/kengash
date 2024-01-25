import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb";
// import axios from "axios";
import Chart from "../Chart";
import Charts from "../Charts";
import statistikaAPI from "../../services/statistika";

const StatistikaCom = () => {
    // const apiUrlStatistika =
    //     "https://kengash.pythonanywhere.com/api/v1/statistika/";
    // const apiUrlTaklif = "https://kengash.pythonanywhere.com/api/v1/taklif/";
    // const token = localStorage.getItem("token");

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

    useEffect(() => {
        getData()
        // axios({
        //     url: apiUrlTaklif,
        //     method: "GET",
        //     headers: {
        //         Authorization: `Token ${token}`,
        //     },
        // })
        //     .then((res) =>
        //         setDataTaklif(res.data.filter((item) => item.tugash === true))
        //     )
        //     .catch((err) => console.error(err));

        // axios({
        //     url: apiUrlStatistika,
        //     method: "GET",
        //     headers: {
        //         Authorization: `Token ${token}`,
        //     },
        // })
        //     .then((res) => {
        //         setDataStatistiak(res.data);
        //     })
        //     .catch((err) => console.error(err));
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

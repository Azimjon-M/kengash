import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import axios from "axios";
import Chart from "../Chart";
import Charts from "../Charts";

const StatistikaCom = () => {
    const apiUrlDefault =
        "https://kengash.pythonanywhere.com/api/v1/statistika/";
    const token = localStorage.getItem("token");


    const [isDataOne, setIsDataOne] = useState([]);
    const [isDataTwoo, setIsDataTwoo] = useState();

    useEffect(() => {
        axios({
            url: apiUrlDefault,
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((res) => {
                setIsDataOne(
                    res.data.filter((item) => item.bitalik_taklif === true)
                );
                setIsDataTwoo(
                    res.data.filter((item) => item.bitalik_taklif === false)
                );
            })
            .catch((err) => console.error(err));
    }, [token]);

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

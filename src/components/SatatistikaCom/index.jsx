import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import axios from "axios";
import Chart from "../Chart";

const StatistikaCom = () => {
    const apiUrlDefault =
        "https://kengash.pythonanywhere.com/api/v1/statistika/";
    const token = localStorage.getItem("token");

    const [isData, setIsData] = useState();

    useEffect(() => {
        axios({
            url: apiUrlDefault,
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((res) => setIsData(res.data))
            .catch((err) => console.error(err));
    }, [token]);


    return (
        <div className="min-h-[calc(100vh-125px)] bg-[#F3F7FA]">
            <Breadcrumb locationPage="Statistika" />
            <div className="max-w-7xl mx-auto">
                <h1 className="md:text-4xl font-bold text-green-700 text-center mt-10 md:my-16">
                    Statistika bo'limi
                </h1>
                <div className="flex flex-col mt-10 px-5">
                    {
                        isData && isData.map((item, idx) => (
                            <Chart key={idx} dataes={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
export default StatistikaCom;

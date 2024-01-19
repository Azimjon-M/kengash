import React, { useEffect, useState } from "react";
import axios from "axios";

const Charts = ({ dataes }) => {
    const apiUrlTaklif = "https://kengash.pythonanywhere.com/api/v1/taklif/";
    const token = localStorage.getItem("token");

    const [getNomzodData, setGetNomzodData] = useState();

    useEffect(() => {
        axios({
            url: `${apiUrlTaklif}`,
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((res) => setGetNomzodData(res.data))
            .catch((err) => console.error(err));
    }, [dataes, token]);

    return (
        <div
            className="flex flex-col xl:flex-row-reverse shadow-lg rounded-xl border p-4 bg-white"
        >
            <div className="xl:w-[50%] xl:h-full p-2 shadow-md rounded-md text-sm md:text-lg text-gray-500 bg-slate-100">
                <h2>
                    <span className="font-bold text-green-700">Nomzod 1:</span>
                    {getNomzodData && getNomzodData.nomzod}
                </h2>
                <h2>
                    <span className="font-bold text-green-700">Nomzod 2:</span>
                    {getNomzodData && getNomzodData.nomzod1}
                </h2>
                <h2>
                    <span className="font-bold text-green-700">Nomzod 3:</span>
                    {getNomzodData && getNomzodData.nomzod2}
                </h2>
                <h2>
                    <span className="font-bold text-green-700">Nomzod 4:</span>
                    {getNomzodData && getNomzodData.nomzod3}
                </h2>
            </div>
        </div>
    );
};

export default Charts;

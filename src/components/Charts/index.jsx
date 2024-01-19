import React, { useEffect, useState } from "react";
import { ChartBox } from "../Chart/styled";
import axios from "axios";

const Charts = ({ dataes }) => {
    const apiLink = "https://kengash.pythonanywhere.com/api/v1/taklif/";
    const token = localStorage.getItem("token");

    const [data, setData] = useState([]);
    const [allNomzodData, setAllNomzodData] = useState();

    useEffect(() => {
        axios({
            url: `${apiLink}${dataes.taklif_id}/`,
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((res) => setAllNomzodData(res.data))
            .catch((err) => console.error(err));
    }, [token, dataes]);

    useEffect(() => {
        const COLOR = {
            b1: "blue",
            b2: "green",
            b3: "yellow",
            b4: "red",
            b5: "gray",
        };
        let numba = dataes.nomzod;
        let numbb = dataes.nomzod1;
        let numbc = dataes.nomzod2;
        let numbd = dataes.nomzod3;
        let numbx = dataes.qatnashmaganlar;
        let z = numba + numbb + numbc + numbd + numbx;

        if (numba + numbb + numbc + numbd !== 0) {
            if (z !== 0) {
                let a = Math.floor((numba * 100) / z);
                let b = Math.floor((numbb * 100) / z);
                let c = Math.floor((numbc * 100) / z);
                let d = Math.floor((numbd * 100) / z);
                let x = Math.floor((numbd * 100) / z);

                if (a + b + c + d !== 100) {
                    d++;
                }
                setData([
                    { name: "Nomzod 1", width: a, color: COLOR.b1 },
                    { name: "Nomzod 2", width: b, color: COLOR.b2 },
                    { name: "Nomzod 3", width: c, color: COLOR.b3 },
                    { name: "Nomzod 4", width: d, color: COLOR.b4 },
                    { name: "Qatnashmaganlar", width: x, color: COLOR.b5 },
                ]);
            } else {
                setData([
                    { name: "Nomzod 1", width: 0, color: COLOR.b1 },
                    { name: "Nomzod 2", width: 0, color: COLOR.b2 },
                    { name: "Nomzod 3", width: 0, color: COLOR.b3 },
                    { name: "Nomzod 4", width: 0, color: COLOR.b4 },
                    { name: "Qatnashmaganlar", width: 100, color: COLOR.b5 },
                ]);
            }
        } else {
            setData([
                { name: "Nomzod 1", width: 0, color: COLOR.b1 },
                { name: "Nomzod 2", width: 0, color: COLOR.b2 },
                { name: "Nomzod 3", width: 0, color: COLOR.b3 },
                { name: "Nomzod 4", width: 0, color: COLOR.b4 },
                { name: "Qatnashmaganlar", width: 100, color: COLOR.b5 },
            ]);
        }
    }, [dataes]);

    return (
        <div className="flex flex-col gap-y-4 xl:flex-row-reverse shadow-lg rounded-xl border p-4 bg-white">
            <div className="w-full flex justify-center lg:py-4">
                <div className="w-[400px] lg:w-[500px] max-h-[200px] p-2 flex flex-col gap-y-1 shadow-md rounded-md text-sm md:text-lg text-gray-500 bg-slate-100 border">
                    {data &&
                        data.map((item, idx) => (
                            <div
                                key={idx}
                                className="border-[1px] border-gray-300 rounded-md overflow-hidden bg-white"
                            >
                                <ChartBox
                                    width={item.width}
                                    color={item.color}
                                    className="whitespace-nowrap p-1"
                                >
                                    {item.name}: {item.width}%
                                </ChartBox>
                            </div>
                        ))}
                </div>
            </div>
            <div className="xl:w-full flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-4 p-2 shadow-md rounded-md text-sm md:text-lg text-black bg-slate-100">
                    <h2>
                        <span className="font-bold text-green-700">
                            Nomzod 1:{" "}
                        </span>
                        {allNomzodData && allNomzodData.nomzod ? (
                            allNomzodData.nomzod
                        ) : (
                            <span className="text-[red]">
                                Nomzod kiritilmagan
                            </span>
                        )}
                    </h2>
                    <h2>
                        <span className="font-bold text-green-700">
                            Nomzod 2:{" "}
                        </span>
                        {allNomzodData && allNomzodData.nomzod1 ? (
                            allNomzodData.nomzod1
                        ) : (
                            <span className="text-[red]">
                                Nomzod kiritilmagan
                            </span>
                        )}
                    </h2>
                    <h2>
                        <span className="font-bold text-green-700">
                            Nomzod 3:{" "}
                        </span>
                        {allNomzodData && allNomzodData.nomzod2 ? (
                            allNomzodData.nomzod2
                        ) : (
                            <span className="text-[red]">
                                Nomzod kiritilmagan
                            </span>
                        )}
                    </h2>
                    <h2>
                        <span className="font-bold text-green-700">
                            Nomzod 4:{" "}
                        </span>
                        {allNomzodData && allNomzodData.nomzod3 ? (
                            allNomzodData.nomzod3
                        ) : (
                            <span className="text-[red]">
                                Nomzod kiritilmagan
                            </span>
                        )}
                    </h2>
                </div>
                <div className="flex justify-center">
                    <button className="btn btn-sm lg:btn-md btn-primary text-white lg:font-bold">
                        YUKLAB OLISH
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Charts;

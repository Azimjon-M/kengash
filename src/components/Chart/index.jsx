import React, { useEffect, useState } from "react";
import { ChartBox } from "./styled";

const Chart = ({ dataes }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const COLOR = { a1: "#00BC6E", a2: "red", a3: "yellow", a4: "gray" };
        let numba = dataes.rozilar;
        let numbb = dataes.qarshilar;
        let numbc = dataes.betaraflar;
        let numbd = dataes.qatnashmaganlar;
        let z = numba + numbb + numbc + numbd;

        if (numba + numbb + numbc !== 0) {
            if (z !== 0) {
                let a = Math.floor((numba * 100) / z);
                let b = Math.floor((numbb * 100) / z);
                let c = Math.floor((numbc * 100) / z);
                let d = Math.floor((numbd * 100) / z);

                if (a + b + c + d !== 100) {
                    d++;
                }
                setData([
                    { name: "Rozilar", width: a, color: COLOR.a1 },
                    { name: "Qarshilar", width: b, color: COLOR.a2 },
                    { name: "Betaraflar", width: c, color: COLOR.a3 },
                    { name: "Qatnashmaganlar", width: d, color: COLOR.a4 },
                ]);
            } else {
                setData([
                    { name: "Rozilar", width: 0, color: COLOR.a1 },
                    { name: "Qarshilar", width: 0, color: COLOR.a2 },
                    { name: "Betaraflar", width: 0, color: COLOR.a3 },
                    { name: "Qatnashmaganlar", width: 0, color: COLOR.a4 },
                ]);
            }
        } else {
            setData([
                { name: "Rozilar", width: 0, color: COLOR.a1 },
                { name: "Qarshilar", width: 0, color: COLOR.a2 },
                { name: "Betaraflar", width: 0, color: COLOR.a3 },
                { name: "Qatnashmaganlar", width: 100, color: COLOR.a4 },
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
                            Taklif:{" "}
                        </span>
                        {dataes && dataes.name ? (
                            dataes.name
                        ) : (
                            <span className="text-[red]">
                                Taklif nommi kiritilmagan
                            </span>
                        )}
                    </h2>
                    <h2>
                        <span className="font-bold text-green-700">
                            Nomzod:{" "}
                        </span>
                        {dataes && dataes.nomzod ? (
                            dataes.nomzod
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

export default Chart;

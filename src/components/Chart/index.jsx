import React, { useEffect, useState } from "react";
import { ChartBox } from "./styled";

const Chart = ({ dataes }) => {
    // console.log(dataes);
    
    const [data, setData] = useState([]);

    useEffect(() => {
        let numba = dataes.rozilar;
        let numbb = dataes.qarshilar;
        let numbc = dataes.betaraflar;
        let numbd = dataes.qatnashmaganlar;

        let z = numba+numbb+numbc+numbd;

        let a = Math.floor((numba*100)/z);
        let b = Math.floor((numbb*100)/z);
        let c = Math.floor((numbc*100)/z);
        let d = Math.floor((numbd*100)/z);

        console.log(a, b, c, d);

        if (a+b+c+d !== 100) {
            d++
        }

        console.log(a, b, c, d);

        setData([
            { name: "Rozilar", width: a, color: "green"},
            { name: "Qarshilar", width: b, color: "red"},
            { name: "Betaraflar", width: c, color: "yellow"},
            { name: "Qatnashmaganlar", width: d , color: "gray"},
        ])


    }, [dataes])


    return (
        <div className="flex flex-col xl:flex-row-reverse shadow-lg rounded-xl border p-4 bg-white">
            <div className="w-[400px] h-[400px]">
                {
                    data && data.map((item, idx) => (
                        <ChartBox key={idx} width={item.width} color={item.color}>{item.name}</ChartBox>
                    ))
                }
            </div>
            <div className="p-2 shadow-md rounded-md text-sm md:text-lg text-gray-500 bg-slate-100 xl:w-[50%]">
                <h2>
                    <span className="font-bold text-green-700">Taklif: </span>
                    {dataes.name}
                </h2>
                <h2>
                    <span className="font-bold text-green-700">Nomzod: </span>
                    {dataes.nomzod}
                </h2>
            </div>
        </div>
    );
};

export default Chart;

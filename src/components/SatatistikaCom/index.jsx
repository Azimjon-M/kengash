import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";

const StatistikaCom = () => {
    const apiUrlDefault =
        "https://kengash.pythonanywhere.com/api/v1/statistika/";
    const token = localStorage.getItem("token");

    const [isData, setIsData] = useState();

    const faceData = [
        {
            id: 1,
            taklif_id: "48",
            bitalik_taklif: true,
            name: "Yo'llarni asfalt qilishga boshliq",
            nomzod: "Selena gomez",
            nomzod1: 0,
            nomzod2: 0,
            nomzod3: 0,
            rozilar: 22,
            qarshilar: 43,
            betaraflar: 2,
            qatnashmaganlar: 23,
        },
        {
            id: 2,
            taklif_id: "49",
            bitalik_taklif: false,
            name: "Xodimlarni ish bilan ta'minlash boshqaruvligi",
            nomzod: "Tog'a",
            nomzod1: "Pocha",
            nomzod2: "Xola",
            nomzod3: "Amaki",
            rozilar: 56,
            qarshilar: 37,
            betaraflar: 5,
            qatnashmaganlar: 1,
        },
        {
            id: 3,
            taklif_id: "50",
            bitalik_taklif: true,
            name: "Rectorlikka",
            nomzod: "Men",
            nomzod1: 0,
            nomzod2: 0,
            nomzod3: 0,
            rozilar: 59,
            qarshilar: 0,
            betaraflar: 28,
            qatnashmaganlar: 12,
        },
    ];

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

    // TOTAL: 1000
    const data = [
        { name: "Rozilar", value: 40 },
        { name: "Qatnashmaganlar", value: 24 },
        { name: "Betaraflar", value: 11 },
        { name: "Qarshilar", value: 25 },
    ];
    // Colors 1, 2, 3, 4
    const COLORS = ["#00BC6E", "#9A9A9A", "#FFBB28", "#FF4242"];

    // CHART obj //
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, outerRadius, fill, name } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + outerRadius * cos;
        const sy = cy + outerRadius * sin;
        const mx = cx + (outerRadius + 10) * cos;
        const my = cy + (outerRadius + 15) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 10;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";

        return (
            <g>
                <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={fill}
                    fill="none"
                />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text
                    className="font-bold text-xs"
                    x={ex + (cos >= 0 ? 1 : -1) * 5}
                    y={ey}
                    textAnchor={textAnchor}
                    fill="#355070"
                >{`${name}`}</text>
            </g>
        );
    };
    // CHART obj //

    return (
        <div className="min-h-[calc(100vh-125px)] bg-[#F3F7FA]">
            <Breadcrumb locationPage="Statistika" />
            <div className="max-w-7xl mx-auto">
                <h1 className="md:text-4xl font-bold text-green-700 text-center mt-10 md:my-16">
                    Statistika bo'limi
                </h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 px-5">
                    {faceData.map((item) => {
                        return (
                            <div className="shadow-lg rounded-xl border p-4">
                                <ResponsiveContainer width="100%" height={350}>
                                    <PieChart width={400} height={400}>
                                        <Pie
                                            data={item}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={renderCustomizedLabel}
                                            label={renderActiveShape}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        COLORS[
                                                            index %
                                                                COLORS.length
                                                        ]
                                                    }
                                                />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <h2 className="p-2 shadow-md rounded-md text-sm md:text-lg text-gray-500 bg-slate-100">
                                    <span className="font-bold text-green-700">
                                        Taklif:{" "}
                                    </span>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Provident, dolore!
                                </h2>
                            </div>
                        );
                    })}
                    {/* <div className="shadow-lg rounded-xl border p-4">
                        <ResponsiveContainer width="100%" height={350}>
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={renderCustomizedLabel}
                                    label={renderActiveShape}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <h2 className="p-2 shadow-md rounded-md text-sm md:text-lg text-gray-500 bg-slate-100">
                            <span className="font-bold text-green-700">
                                Taklif:{" "}
                            </span>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Provident, dolore!
                        </h2>
                    </div>
                    <div className="shadow-lg rounded-xl border p-4">
                        <ResponsiveContainer width="100%" height={350}>
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={renderCustomizedLabel}
                                    label={renderActiveShape}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <h2 className="p-2 shadow-md rounded-md text-sm md:text-lg text-gray-500 bg-slate-100">
                            <span className="font-bold text-green-700">
                                Taklif:{" "}
                            </span>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Provident, dolore!
                        </h2>
                    </div>
                    <div className="shadow-lg rounded-xl border p-4">
                        <ResponsiveContainer width="100%" height={350}>
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={renderCustomizedLabel}
                                    label={renderActiveShape}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <h2 className="p-2 shadow-md rounded-md text-sm md:text-lg text-gray-500 bg-slate-100">
                            <span className="font-bold text-green-700">
                                Taklif:{" "}
                            </span>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Provident, dolore!
                        </h2>
                    </div> */}
                </div>
            </div>
        </div>
    );
};
export default StatistikaCom;

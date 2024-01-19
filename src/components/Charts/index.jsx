import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";
import uuid from "react-uuid";
import axios from "axios";

const Charts = ({ dataes }) => {
    const apiUrlTaklif = "https://kengash.pythonanywhere.com/api/v1/taklif/";
    const token = localStorage.getItem("token");

    const [getNomzodData, setGetNomzodData] = useState();

    let unikalkId = uuid();

    const [data, setData] = useState([
        { name: "Rozilar", value: 0 },
        { name: "Qarshilar", value: 0 },
        { name: "Betaraflar", value: 0 },
        { name: "Qatnashmaganlar", value: 0 },
    ]);

    const [COLORS, setCOLORS] = useState([
        "#00BC6E",
        "#FF4242",
        "#FFBB28",
        "#9A9A9A",
    ]);

    useEffect(() => {
        setData([
            { name: "Nomzod 1", value: dataes.nomzod },
            { name: "Nomzod 2", value: dataes.nomzod1 },
            { name: "Nomzod 3", value: dataes.nomzod2 },
            { name: "Nomzod 4", value: dataes.nomzod3 },
            { name: "Qatnashmaganlar", value: dataes.qatnashmaganlar },
        ]);
        setCOLORS(["#00BC6E", "#00d9ff", "#2c28ff", "#8502ff", "#9A9A9A"]);
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

    // CHART FUNCTIN // label-360-360
    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const {
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            percent,
            payload,
            index,
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";

        return (
            <g key={index}>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={fill}
                    fill="none"
                />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    textAnchor={textAnchor}
                    fill="#333"
                >{`${payload.name}`}</text>
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    dy={18}
                    textAnchor={textAnchor}
                    fill="#999"
                >
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            </g>
        );
    };
    // CHART FUNCTIN //

    return (
        <div
            // key={`${unikalkId}`}
            className="flex flex-col xl:flex-row-reverse shadow-lg rounded-xl border p-4 bg-white"
        >
            <ResponsiveContainer width="100%" height={350}>
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
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

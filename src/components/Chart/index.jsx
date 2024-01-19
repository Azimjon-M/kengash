import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";
import uuid from "react-uuid";

const Chart = ({ dataes }) => {
    console.log(dataes);

    let unikalkId = uuid();

    const data = [
        { name: "Rozilar", value: dataes.rozilar },
        { name: "Qarshilar", value: dataes.qarshilar },
        { name: "Betaraflar", value: dataes.betaraflar },
        { name: "Qatnashmaganlar", value: dataes.qatnashmaganlar },
    ];
    // console.log(data);

    // useEffect(() => {
    //     setData([
    //     ]);
    // }, [dataes]);

    const COLORS = ["#00BC6E", "#FF4242", "#FFBB28", "#9A9A9A"];

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
            <g key={`${index}${unikalkId}`}>
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

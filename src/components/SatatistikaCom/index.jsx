import React from "react";
import Breadcrumb from '../Breadcrumb';
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { Chart } from "react-google-charts";

const data = [
  { name: "Rozilar", value: 300 },
  { name: "Qatnashmaganlar", value: 100 },
  { name: "Betaraflar", value: 500 },
  { name: "Qarshilar", value: 400 },
];

const COLORS = ["#00C49F", "#9A9A9A", "#FFBB28", "#FF4242"];

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

const StatistikaCom = () => {
  return (
    <div className="min-h-[calc(100vh-125px)] bg-[#F3F7FA]">
      <Breadcrumb locationPage="Statistika" />
      <div className="max-w-7xl mx-auto">
        <h1 className="md:text-4xl font-bold text-green-700 text-center mt-10 md:my-16">
          Statistika bo'limi
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 px-5">
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
              <span className="font-bold text-green-700">Taklif: </span>Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Provident,
              dolore!
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
              <span className="font-bold text-green-700">Taklif: </span>Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Provident,
              dolore!
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
              <span className="font-bold text-green-700">Taklif: </span>Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Provident,
              dolore!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatistikaCom;

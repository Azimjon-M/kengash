import React, { useEffect, useState } from "react";
import { ChartBox } from "./styled";
import axios from "axios";
import jsPDF from "jspdf";

const Chart = ({ dataes }) => {
    const apiLink = "https://kengash.pythonanywhere.com/api/v1/taklif/";
    const token = localStorage.getItem("token");

    const [allNomzodData, setAllNomzodData] = useState();
    const [data, setData] = useState(null);
    const [isWinner, setIsWinner] = useState(null);

    // Download in pdf
    const handleClickDownload = () => {
        const headerTitle = "Kengashga qo'yilgan taklif:";
        const header = "Salom dunyo ko'rsatuvini qanday qilib bo'lmasin telvidinyalardan \n yo'qotish va o'rniga o'z vakilimiz tomonidan yaratilgan loyhamarni tadbiq etish";
        const statistics = [
            "Rozilar: 5%.",
            "Qarshilar: 10%.",
            "Betaraflar: 22%",
            "Qatnashmaganlar: 63%.",
            "G'olib: Betaraflar",
        ];

        // PDF yaratish
        const pdf = new jsPDF({
            unit: "mm", // O'lchov birligi millimetr
            format: "a4", // A4 format
        });

        // HeaderTitle
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.text(headerTitle, 15, 20); // header qsimni tepa pastga tushirish

        // Header
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.text(header, 10, 30); // header qsimni tepa pastga tushirish
        pdf.lineTo(2, 1) // header qsimni tepa pastga tushirish

        // Statistikalarga "normal" (qalin emas) stil qo'shish
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        // Statistikalarni qo'shish
        let yPosition = 30; // body qisim y o'qida tepa pastligi

        statistics.forEach((stat) => {
            pdf.text(stat, 15, yPosition); //body ma'lumotlari x o'qi  o'nga qochirish
            yPosition += 10; //body ma'lumotlari y o'qi orasidagi masofa
        });

        // PDF-ni yuklash
        pdf.save("statistika.pdf");
    };

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

                for (let i = 0; a + b + c + d !== 100; i++) {
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

    useEffect(() => {
        if (data) {
            let engKattaObyekt = data.reduce((prev, current) =>
                current.width > prev.width ? current : prev
            );
            if (engKattaObyekt.name !== "Qatnashmaganlar") {
                setIsWinner(engKattaObyekt.name);
            } else {
                setIsWinner(null);
            }
        }
    }, [data]);

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
                    {isWinner && (
                        <ChartBox
                            width="100"
                            color="green"
                            className="whitespace-nowrap p-1 rounded-md"
                        >
                            G'olib: {isWinner}
                        </ChartBox>
                    )}
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
                        {allNomzodData && allNomzodData.nomzod ? (
                            allNomzodData.nomzod
                        ) : (
                            <span className="text-[red]">
                                Nomzod kiritilmagan
                            </span>
                        )}
                    </h2>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={() => handleClickDownload()}
                        className="btn btn-sm lg:btn-md btn-primary text-white lg:font-bold"
                    >
                        YUKLAB OLISH
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chart;

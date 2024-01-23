import React, { useEffect, useState } from "react";
import { ChartBox } from "../Chart/styled";
import axios from "axios";
import jsPDF from "jspdf";

const Charts = ({ dataes }) => {
    const apiLink = "https://kengash.pythonanywhere.com/api/v1/taklif/";
    const token = localStorage.getItem("token");

    const [data, setData] = useState(null);
    const [isWinner, setIsWinner] = useState(null);
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
            b2: "purple",
            b3: "yellow",
            b4: "red",
            b5: "gray",
            b6: "green",
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

                for (let i = 0; a + b + c + d !== 100; i++) {
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

    // Download in pdf
    const handleClickDownload = () => {
        const nowData = new Date();
        const nowDay =
            nowData.getDate() <= 9
                ? "0" + nowData.getDate()
                : nowData.getDate();
        const nowMonth =
            nowData.getMonth() + 1 <= 9
                ? "0" + (nowData.getMonth() + 1)
                : nowData.getMonth() + 1;
        const nowYear = nowData.getFullYear();
        const fullData = `${nowDay}/${nowMonth}/${nowYear}`;

        const pdf = new jsPDF("p", "in", "a4");
        pdf.setDrawColor("white");

        const Title = `${dataes.id + 1} - sonli Kengashga qo'yilgan masala:`;
        const TitleContent = `${dataes.name}`;

        const NomzodTitle1 = `Nomzod 1: `;
        const Nomzod1 = `${allNomzodData.nomzod}`;

        const NomzodTitle2 = `Nomzod 2: `;
        const Nomzod2 = `${allNomzodData.nomzod1}`;

        const NomzodTitle3 = `Nomzod 3: `;
        const Nomzod3 = `${allNomzodData.nomzod2}`;

        const NomzodTitle4 = `Nomzod 4: `;
        const Nomzod4 = `${allNomzodData.nomzod3}`;

        let newData = [data.map((item) => `${item.name}: ${item.width}%`)];

        const WinnerTitle = "Eng ko'p to'plangan ovoz: ";
        const Winner = isWinner;

        pdf.setFont("helvetica", "bold").text(Title, 0.5, 0.5);

        pdf.setDrawColor("white");
        pdf.setLineWidth(1 / 72);
        pdf.line(0.5, 0.5, 0.5, 11.25);
        pdf.line(7.75, 0.5, 7.75, 11.25);

        let textlines = pdf
            .setFont("helvetica", "normal")
            .setFontSize("16")
            .splitTextToSize(TitleContent, 7.25);
        let verticalOffeset = 0.7;
        pdf.text(0.5, verticalOffeset + 12 / 72, textlines);
        verticalOffeset += ((textlines.length + 0.5) * 12) / 72;

        // NomzodTitle 1 va Nomzod ma'lumotlarini qo'shish
        pdf.setFont("helvetica", "bold").text(
            `${NomzodTitle1}`,
            0.5,
            verticalOffeset + 40 / 72
        );
        pdf.setFont("helvetica", "normal").text(
            `${Nomzod1}`,
            1.7,
            verticalOffeset + 40 / 72,
            0,
            5
        );

        // NomzodTitle 2 va Nomzod ma'lumotlarini qo'shish
        pdf.setFont("helvetica", "bold").text(
            `${NomzodTitle2}`,
            0.5,
            verticalOffeset + 60 / 72
        );
        pdf.setFont("helvetica", "normal").text(
            `${Nomzod2}`,
            1.7,
            verticalOffeset + 60 / 72,
            0,
            5
        );

        // NomzodTitle 3 va Nomzod ma'lumotlarini qo'shish
        pdf.setFont("helvetica", "bold").text(
            `${NomzodTitle3}`,
            0.5,
            verticalOffeset + 80 / 72
        );
        pdf.setFont("helvetica", "normal").text(
            `${Nomzod3 ? `${Nomzod3}` : "Nomzod kiritilmagan"}`,
            1.7,
            verticalOffeset + 80 / 72,
            0,
            5
        );

        // NomzodTitle 4 va Nomzod ma'lumotlarini qo'shish
        pdf.setFont("helvetica", "bold").text(
            NomzodTitle4,
            0.5,
            verticalOffeset + 100 / 72
        );
        pdf.setFont("helvetica", "normal").text(
            `${Nomzod4 ? `${Nomzod4}` : "Nomzod kiritilmagan"}`,
            1.7,
            verticalOffeset + 100 / 72,
            0,
            5
        );

        // Qolgan ma'lumotlarni joylash
        let yPosition = 110;

        newData.forEach((item) => {
            yPosition += 30;
            pdf.text(item, 0.5, verticalOffeset + yPosition / 72);
        });
        pdf.setFont("helvetica", "bold").text(
            WinnerTitle,
            0.5,
            verticalOffeset + 250 / 72
        );
        pdf.setFont("helvetica", "normal").text(
            `${Winner ? Winner : 'Nomzodlar tasdiqlanmagan'}`,
            3.3,
            verticalOffeset + 250 / 72
        );
        pdf.text(fullData, 0.5, verticalOffeset + 400 / 72);

        // PDF-ni yuklash
        pdf.save(`${dataes.id}-statistika.pdf`);
    };

    return (
        <div className="flex flex-col gap-y-4 xl:flex-row-reverse shadow-lg rounded-xl border p-4 bg-white ">
            <div className="w-full flex justify-center lg:py-4">
                <div className="w-[400px] lg:w-[500px] max-h-[270px] p-2 flex flex-col gap-y-1 shadow-md rounded-md text-sm md:text-lg text-gray-500 bg-slate-100 border">
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
                                Nomzod kiritilmagan
                            </span>
                        )}
                    </h2>
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

export default Charts;

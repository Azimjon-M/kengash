import React, { useEffect, useState } from "react";
import { ChartBox } from "./styled";
import jsPDF from "jspdf";
import chartAPI from "../../services/chart";

const Chart = ({ dataes }) => {
    const [allNomzodData, setAllNomzodData] = useState();
    const [data, setData] = useState(null);
    const [isWinner, setIsWinner] = useState(null);

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

        pdf.text(fullData, 6.6, 0.5);

        const Title = `${
            dataes && dataes.id
        } - sonli Kengashga qo'yilgan masala:`;
        const TitleContent = `${dataes.name}`;
        const NomzodTitle = "Nomzod: ";
        const Nomzod = `${allNomzodData.nomzod}`;
        let newData = [data.map((item) => `${item.name}: ${item.width}%`)];
        const WinnerTitle = `Nomzod ${allNomzodData.nomzod}: ${
            isWinner === "Rozilar" ? "Tasdiqlandi" : "Tasdiqlanmadi"
        }`;

        pdf.setFont("helvetica", "bold").text(Title, 0.5, 1);

        pdf.setDrawColor("white");
        pdf.setLineWidth(1 / 72);
        pdf.line(0.5, 0.5, 0.5, 11.25);
        pdf.line(7.75, 0.5, 7.75, 11.25);

        let textlines = pdf
            .setFont("helvetica", "normal")
            .setFontSize("16")
            .splitTextToSize(TitleContent, 7.25);
        let verticalOffeset = 1.2;
        pdf.text(0.5, verticalOffeset + 12 / 72, textlines);
        verticalOffeset += ((textlines.length + 0.5) * 12) / 72;

        // NomzodTitle va Nomzod ma'lumotlarini qo'shish
        pdf.setFont("helvetica", "bold").text(
            NomzodTitle,
            0.5,
            verticalOffeset + 40 / 72
        );
        pdf.setFont("helvetica", "normal").text(
            Nomzod,
            1.5,
            verticalOffeset + 40 / 72,
            0,
            5
        );

        // Qolgan ma'lumotlarni joylash
        let yPosition = 60;

        newData.forEach((item) => {
            yPosition += 30;
            pdf.text(item, 0.5, verticalOffeset + yPosition / 72);
        });
        pdf.setFont("helvetica", "bold").text(
            WinnerTitle,
            0.5,
            verticalOffeset + 200 / 72
        );

        // PDF-ni yuklash
        pdf.save(`${dataes.id}-statistika.pdf`);
    };

    useEffect(() => {
        const getData = async () => {
            const { data: newData } = await chartAPI.get(dataes.taklif_id);
            if (newData) {
                setAllNomzodData(newData);
            }
        };
        getData();
    }, [dataes.taklif_id]);

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
                            txtColor="white"
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

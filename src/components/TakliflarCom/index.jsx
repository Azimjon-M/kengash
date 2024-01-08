import React from "react";
import Breadcrumb from "../Breadcrumb";
import { NavLink } from "react-router-dom";
import { FaXmark, FaPlus } from "react-icons/fa6";

const TakliflarCom = () => {
    const data = [
        {
            id: 1,
            taklifNomi: "taklif nomi: 1",
            nomzod: "Nomzod 1",
            berilganVaqt: "10",
        },
        {
            id: 2,
            taklifNomi: "taklif nomi: 2",
            nomzod: "Nomzod 2",
            berilganVaqt: "5",
        },
        {
            id: 3,
            taklifNomi: "taklif nomi: 3",
            nomzod: "Nomzod 3",
            berilganVaqt: "3",
        },
    ];
    return (
        <div className="bg-[#F3F7FA]">
            <Breadcrumb locationPage="Takliflar" />
            <div className="flex flex-col gap-y-4 text-black">
                <div className="text-center text-2xl font-semibold py-6">
                    Barcha takliflar
                </div>
                <div className="flex flex-col items-center gap-y-4 py-4">
                    <NavLink
                        to="/takliflar/addTaklif"
                        className="text-[16px] btn btn-success bg-[#05B967] font-medium text-white px-8"
                    >
                        Taklif kiritish <FaPlus />
                    </NavLink>
                        
                    <button
                        to="/"
                        className="text-[16px] btn btn-error font-medium text-white px-8"
                    >
                        Barcha takliflarni o'chirish <FaXmark />
                    </button>
                </div>
                <div className='text-lg font-semibold text-center'>Kengashga qo'yilmagan takliflar:</div>
                <div className="flex flex-col items-center">
                    {data.map((item) => (
                        <div key={item.id} className="border border-red-500">
                            <div>Taklif nomi: {item.taklifNomi}</div>
                            <div>Nomzod: {item.nomzod}</div>
                            <div>Berilgan vaqt: {item.berilganVaqt}</div>
                        </div>
                    ))}
                </div>
                <div>Kengashga qo'yilgan takliflar:</div>
                <div>Card</div>
            </div>
        </div>
    );
};

export default TakliflarCom;

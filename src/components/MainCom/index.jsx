import React, { useEffect, useState } from "react";
import mainApi from '../../services/main'; 

const MainCom = () => {
    const [isAzo, setIsAzo] = useState(false);
    const [isData, setIsData] = useState([]);

    useEffect(() => {
        mainApi.get()
            .then((res) => setIsData(res.data))
            .catch((err) => console.error(err));

        const lavozim = localStorage.getItem("lavozim");
        lavozim === "superadmin" && setIsAzo(true);
    }, []);

    return (
        <>
            {isData.map((item, idx) => (
                <div
                    key={idx}
                    className="w-full h-[calc(100vh-120px)] lg:h-[calc(100vh-125px)] flex flex-col md:flex-row items-center md:justify-center md:items-start gap-y-4 md:gap-x-20 lg:gap-x-12 xl:gap-x-24 2xl:gap-x-36 py-12 lg:py-16 bg-[#F3F7FA] text-black"
                >
                    <div className="flex flex-col lg:flex-row items-center gap-y-4 lg:gap-x-12 xl:gap-x-24 2xl:gap-x-36">
                        {isAzo && (
                            <div className="text-center text-[20px]">
                                A'ZOLAR:
                                <p className="text-[26px] font-semibold">
                                    {item.azolar}
                                </p>
                            </div>
                        )}
                        <div className="text-center text-[20px]">
                            YANGI TAKLIFLAR:
                            <p className="text-[26px] font-semibold">
                                {item.yangi_taklif}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-y-4 lg:gap-x-12 xl:gap-x-24 2xl:gap-x-36">
                        <div className="text-center text-[20px]">
                            BAHOLANGAN TAKLIFLAR:
                            <p className="text-[26px] font-semibold">
                                {item.baxolangan_taklif}
                            </p>
                        </div>
                        <div className="text-center text-[20px]">
                            BARCHA TAKLIFLAR:
                            <p className="text-[26px] font-semibold">
                                {item.barcha_taklif}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default MainCom;

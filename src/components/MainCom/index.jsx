import React from "react";

const MainCom = () => {
    return (
        <div className="w-full h-[calc(100vh-120px)] lg:h-[calc(100vh-125px)] flex flex-col md:flex-row items-center md:justify-center md:items-start gap-y-4 md:gap-x-20 lg:gap-x-12 xl:gap-x-24 2xl:gap-x-36 py-12 lg:py-16 bg-[#F3F7FA] text-black">
            <div className="flex flex-col lg:flex-row items-center gap-y-4 lg:gap-x-12 xl:gap-x-24 2xl:gap-x-36">
                <div className="text-center text-[20px]">
                    A'ZOLAR:
                    <p className="text-[26px] font-semibold">123</p>
                </div>
                <div className="text-center text-[20px]">
                    YANGI TAKLIFLAR:
                    <p className="text-[26px] font-semibold">231</p>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center gap-y-4 lg:gap-x-12 xl:gap-x-24 2xl:gap-x-36">
                <div className="text-center text-[20px]">
                    BAHOLANGAN TAKLIFLAR:
                    <p className="text-[26px] font-semibold">2323</p>
                </div>
                <div className="text-center text-[20px]">
                    BARCHA TAKLIFLAR:
                    <p className="text-[26px] font-semibold">434</p>
                </div>
            </div>
        </div>
    );
};

export default MainCom;

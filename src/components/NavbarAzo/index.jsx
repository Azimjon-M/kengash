import React, { useEffect, useState } from "react";
import kspiIcon from "../../assets/icons/logo_kspi.png";
import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

// isExit 
const Navbar = ({ outside }) => {
    // Values
    const [isExitOrAccess, setIsExitOrAccess] = useState("KIRISH");
    const [isOpenMeni, setIsOpenMeni] = useState(false);
    // Funtions
    useEffect(() => {
        if (outside) {
            setIsExitOrAccess("KIRISH");
        } else {
            setIsExitOrAccess("CHIQISH");
        }
    }, [outside]);

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center bg-white text-black px-6 py-3">
                <Link to="/">
                    <div className="flex justify-start items-center">
                        <div className={`${outside ? "hidden" : " lg:hidden"} `}>
                            <FiMenu
                                onClick={() => setIsOpenMeni(!isOpenMeni)}
                                className="text-[30px]"
                            />
                        </div>
                        <div className={`${outside ? "flex" : "hidden lg:flex "} items-center gap-x-3`}>
                            <div className="w-[40px] h-auto">
                                <img
                                    className="w-full h-auto"
                                    src={kspiIcon}
                                    alt="KSPI icon"
                                />
                            </div>
                            <h1 className="font-bold text-[20px]">
                                QDPI Kengashi
                            </h1>
                        </div>
                    </div>
                </Link>
                <div className="flex items-center gap-x-20">
                    <ul className={`${outside ? "hidden" : "hidden lg:flex lg:gap-x-3 font-semibold"}`}>
                        <li>
                            <NavLink
                                to="/"
                                className={(isActive) =>
                                    `${isActive ? "underline" : ""}`
                                }
                            >
                                Asosiy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/sdlapdlsap"
                                className={(isActive) =>
                                    `${isActive ? "underline" : ""}`
                                }
                            >
                                Takliflar
                            </NavLink>
                        </li>
                    </ul>
                    <button className="text-[16px] btn btn-success bg-[#05B967] font-medium text-white px-8">
                        {isExitOrAccess}
                    </button>
                </div>
            </div>

            <div
                className={` style-transition overflow-hidden ${
                    isOpenMeni ? "h-[200px] py-2" : "h-[0px]"
                } bg-white`}
            >
                <ul className="flex flex-col items-center gap-y-3 font-semibold text-black">
                    <li>
                        <NavLink
                            to="/"
                            className={(isActive) =>
                                `${isActive ? "underline" : ""}`
                            }
                        >
                            Asosiy
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/sdlapdlsap"
                            className={(isActive) =>
                                `${isActive ? "underline" : ""}`
                            }
                        >
                            Takliflar
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;

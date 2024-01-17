import React, { useEffect, useState } from "react";
import kspiIcon from "../../assets/icons/logo_kspi.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { GrClose } from "react-icons/gr";

// isExit
const Navbar = () => {
    const navigate = useNavigate();
    const superAdmin = "superadmin";
    const azo = "azo";
    // Values
    const [isOpenMeni, setIsOpenMenu] = useState(false);
    const [isLavozim, setIsLavozim] = useState("");
    // Funtions
    const handleClickMenuOpen = (e) => {
        e.preventDefault();
        setIsOpenMenu(true);
    };
    const handleClickMenuClose = (e) => {
        e.preventDefault();
        setIsOpenMenu(false);
    };
    // Logout
    const handleClicklogout = () => {
        localStorage.removeItem("lavozim");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        navigate("/");
    };

    useEffect(() => {
        const lavozim = localStorage.getItem("lavozim");
        setIsLavozim(`${lavozim}`);
    }, [isLavozim]);

    return (
        <div className="flex flex-col sticky top-0 left-0 shadow-lg z-50">
            <div className="flex justify-between items-center bg-white text-black px-6 py-3">
                <Link to="/asosiy">
                    <div className="flex justify-start items-center">
                        <div className="lg:hidden">
                            {isOpenMeni ? (
                                <GrClose
                                    onClick={handleClickMenuClose}
                                    className="text-[30px]"
                                />
                            ) : (
                                <FiMenu
                                    onClick={handleClickMenuOpen}
                                    className="text-[30px]"
                                />
                            )}
                        </div>
                        <div className="hidden lg:flex items-center gap-x-3">
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
                    <ul className="hidden lg:flex lg:gap-x-3 font-semibold">
                        <li>
                            <NavLink
                                to="/asosiy"
                                className={({ isActive }) =>
                                    `${isActive ? "underline" : ""} `
                                }
                            >
                                Asosiy
                            </NavLink>
                        </li>
                        {isLavozim === superAdmin && (
                            <li>
                                <NavLink
                                    to="/azolar"
                                    className={({ isActive }) =>
                                        `${isActive ? "underline" : ""} `
                                    }
                                >
                                    A'zolar
                                </NavLink>
                            </li>
                        )}
                        {isLavozim === azo ? (
                            <li>
                                <NavLink
                                    to="/azo-takliflar"
                                    className={({ isActive }) =>
                                        `${isActive ? "underline" : ""} `
                                    }
                                >
                                    Takliflar
                                </NavLink>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <NavLink
                                        to="/takliflar"
                                        className={({ isActive }) =>
                                            `${isActive ? "underline" : ""} `
                                        }
                                    >
                                        Takliflar
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/davomat"
                                        className={({ isActive }) =>
                                            `${isActive ? "underline" : ""} `
                                        }
                                    >
                                        Davomat
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/statistika"
                                        className={({ isActive }) =>
                                            `${isActive ? "underline" : ""} `
                                        }
                                    >
                                        Statistika
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    <NavLink
                        to="/"
                        onClick={() => handleClicklogout()}
                        className="text-[16px] btn btn-success bg-[#05B967] font-medium text-white px-8"
                    >
                        CHIQISH
                    </NavLink>
                </div>
            </div>

            <div
                className={` style-transition overflow-hidden ${
                    isOpenMeni ? "h-[200px] py-2" : "h-[0px]"
                } bg-white fixed top-[72px] left-0 w-full shadow-lg`}
            >
                <ul className="flex flex-col items-center gap-y-3 font-semibold text-black">
                    <li>
                        <NavLink
                            onClick={() => setIsOpenMenu(false)}
                            to="/asosiy"
                            className={({ isActive }) =>
                                `${isActive ? "underline" : ""} `
                            }
                        >
                            Asosiy
                        </NavLink>
                    </li>
                    {isLavozim === superAdmin && (
                        <li>
                            <NavLink
                                onClick={() => setIsOpenMenu(false)}
                                to="/azolar"
                                className={({ isActive }) =>
                                    `${isActive ? "underline" : ""} `
                                }
                            >
                                A'zolar
                            </NavLink>
                        </li>
                    )}
                    {isLavozim === azo ? (
                        <li>
                            <NavLink
                                onClick={() => setIsOpenMenu(false)}
                                to="/azo-takliflar"
                                className={({ isActive }) =>
                                    `${isActive ? "underline" : ""} `
                                }
                            >
                                Takliflar
                            </NavLink>
                        </li>
                    ) : (
                        <>
                            <li>
                                <NavLink
                                    onClick={() => setIsOpenMenu(false)}
                                    to="/takliflar"
                                    className={({ isActive }) =>
                                        `${isActive ? "underline" : ""} `
                                    }
                                >
                                    Takliflar
                                </NavLink>
                            </li>
                            <li>
                                    <NavLink
                                        onClick={() => setIsOpenMenu(false)}
                                        to="/davomat"
                                        className={({ isActive }) =>
                                            `${isActive ? "underline" : ""} `
                                        }
                                    >
                                        Davomat
                                    </NavLink>
                                </li>
                            <li>
                                <NavLink
                                    onClick={() => setIsOpenMenu(false)}
                                    to="/statistika"
                                    className={({ isActive }) =>
                                        `${isActive ? "underline" : ""} `
                                    }
                                >
                                    Statistika
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;

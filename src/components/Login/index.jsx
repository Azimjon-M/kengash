import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo_kspi.png";
import { useFormik } from "formik";
import axios from "axios";
import Paswords from "../../passwords.json";

const Login = () => {
    const navigate = useNavigate();
    const [errContent, setErrContent] = useState("");

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            try {
                const loggedInUser = Paswords.find(
                    (item) =>
                        item.username === values.username &&
                        item.password === values.password
                );
                if (loggedInUser) {
                    switch (loggedInUser.username) {
                        case "admin":
                            navigate("/asosiy");
                            break;
                        case "admin1":
                            console.log(values);
                            await axios({
                                method: "POST",
                                url: "https://kengash.pythonanywhere.com/api/v1/dj-rest-auth/login/",
                                data: values,
                            })
                                .then((res) => {
                                    localStorage.setItem(
                                        `${loggedInUser.username}`,
                                        `${res.data.key}`
                                    );
                                    navigate("/asosiy");
                                })
                                .catch((err) => {
                                    setErrContent(
                                        "Internet bilan bog'lanishda xatolik!"
                                    );
                                    setTimeout(() => {
                                        setErrContent("");
                                    }, 4000);
                                });
                            break;
                        case "azo1":
                            console.log(values);
                            await axios({
                                method: "POST",
                                url: "https://kengash.pythonanywhere.com/api/v1/dj-rest-auth/login/",
                                data: values,
                            })
                                .then((res) => {
                                    // localStorage.setItem(
                                    //     "token",
                                    //     `${res.data.key}`
                                    // );
                                    console.log(res);
                                    // navigate("/asosiy");
                                })
                                .catch((err) => {
                                    setErrContent(
                                        "Internet bilan bog'lanishda xatolik!"
                                    );
                                    setTimeout(() => {
                                        setErrContent("");
                                    }, 4000);
                                });
                            navigate("/asosiy");
                            break;
                        case "azo2":
                            console.log(values);
                            await axios({
                                method: "POST",
                                url: "https://kengash.pythonanywhere.com/api/v1/dj-rest-auth/login/",
                                data: values,
                            })
                                .then((res) => {
                                    // localStorage.setItem(
                                    //     "token",
                                    //     `${res.data.key}`
                                    // );
                                    console.log(res);
                                    // navigate("/asosiy");
                                })
                                .catch((err) => {
                                    setErrContent(
                                        "Internet bilan bog'lanishda xatolik!"
                                    );
                                    setTimeout(() => {
                                        setErrContent("");
                                    }, 4000);
                                });
                            break;
                        case "azo3":
                            console.log(values);
                            await axios({
                                method: "POST",
                                url: "https://kengash.pythonanywhere.com/api/v1/dj-rest-auth/login/",
                                data: values,
                            })
                                .then((res) => {
                                    // localStorage.setItem(
                                    //     "token",
                                    //     `${res.data.key}`
                                    // );
                                    console.log(res);
                                    // navigate("/asosiy");
                                })
                                .catch((err) => {
                                    setErrContent(
                                        "Internet bilan bog'lanishda xatolik!"
                                    );
                                    setTimeout(() => {
                                        setErrContent("");
                                    }, 4000);
                                });
                            break;
                        default:
                            setErrContent("Bunday ma'lumotlar topilmadi");
                            setTimeout(() => {
                                setErrContent("");
                            }, 4000);
                    }
                } else {
                    setErrContent("Bunday ma'lumotlar topilmadi");
                    setTimeout(() => {
                        setErrContent("");
                    }, 4000);
                }
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md max-w-xs sm:max-w-sm lg:max-w-lg">
                <div className="flex justify-center">
                    <img className="w-[80px]" src={logo} alt="" />
                </div>
                <h1 className="text-xl font-bold text-center text-success mb-2">
                    Qo'qon davlat pedagogika instituti
                </h1>
                <h2 className="text-lg font-semibold text-center text-black">
                    Institut ichki kengashiga kirish
                </h2>
                <form
                    onSubmit={formik.handleSubmit}
                    className="mt-6"
                    id="loginForm"
                >
                    <div className="mb-2">
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Foydalanuvchi nomi
                        </label>
                        <input
                            type="username"
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            placeholder="Foydalanuvchi nomi"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#28a745] focus:ring-[#25a620] focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Parol
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            placeholder="Parol"
                            className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#28a745] focus:ring-[#25a620] focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#28a745] rounded-md hover:bg-[#25a620] focus:outline-none"
                        >
                            Kirish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

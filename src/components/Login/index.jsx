import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo_kspi.png";
import { useFormik } from "formik";
import loginAPI from "../../services/login";
import * as Yup from "yup";

const Login = () => {
    const navigate = useNavigate();
    const [errContent, setErrContent] = useState("");

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "Juda kam!")
            .max(50, "Juda ko'p!")
            .required("Required"),
        password: Yup.string()
            .min(3, "Juda kam!")
            .max(50, "Juda ko'p!")
            .required("Required"),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validationSchema: SignupSchema,
        onSubmit: async (values) => {
            try {
                const { data: resData } = await loginAPI.post(values);
                if (resData) {
                    localStorage.setItem("token", resData.key);
                    const { data: newData } = await loginAPI.get();
                    if (newData) {
                        const user = newData.find(
                            (item) => item.username === values.username
                        );
                        localStorage.setItem("lavozim", user.lavozim);
                        localStorage.setItem("user_id", user.id);
                        navigate(`/asosiy`);
                    }
                }
            } catch (err) {
                console.log(err);
                err || setErrContent("Bunday ma'lumotlar topilmadi !");
                setTimeout(() => {
                    setErrContent("");
                }, 4000);
            }
        },
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");
        const lavozim = localStorage.getItem("lavozim");
        if (token && user_id && lavozim) {
            navigate("/asosiy");
        }
    }, [navigate]);

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
                            className={`${
                                (errContent || formik.errors.username) &&
                                "border-red-600"
                            } block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#28a745] focus:ring-[#25a620] focus:outline-none focus:ring focus:ring-opacity-40`}
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
                            className={`${
                                (errContent || formik.errors.password) &&
                                "border-red-600"
                            } block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#28a745] focus:ring-[#25a620] focus:outline-none focus:ring focus:ring-opacity-40`}
                        />
                    </div>
                    <h1
                        className={`${
                            errContent ? "bg-red-600 p-2" : "hidden"
                        } rounded-md text-center text-white font-bold`}
                    >
                        {errContent}
                    </h1>
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

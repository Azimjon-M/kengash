import React, { useState } from "react";
import Breadcrumb from "../Breadcrumb";
import { useFormik } from "formik";

const AddTaklifCom = () => {
    const [isActiveTwoo, setIsActiveTwoo] = useState(false);
    const [isActiveThree, setIsActiveThree] = useState(false);
    const [isNomzodOne, setIsNomzodOne] = useState(true);

    const apiURL = "https://kengash.pythonanywhere.com/api/v1/taklif/";
    const getToken = Object.keys(localStorage)[0];
    const token = localStorage.getItem(`${getToken}`);

    // Get Data Time .log
    // const currentDateTime = new Date(); 

    // const year = currentDateTime.getFullYear();
    // const month = currentDateTime.getMonth() + 1; // 0 dan boshlab sanani olib, +1 qo'shib hisoblash
    // const day = currentDateTime.getDate();
    // const hours = currentDateTime.getHours();
    // const minutes = currentDateTime.getMinutes();
    // const seconds = currentDateTime.getSeconds();

    const formik = useFormik({
        initialValues: {
            name: "",
            nomzod: "",
            vaqt: "",
            bitalik_taklif: true,
            yoqish: false
        },
        onSubmit: (values) => {
            console.log(values);
            fetch(apiURL, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            formik.resetForm();
        },
    });

    const formik2 = useFormik({
        initialValues: {
            name: "",
            vaqt: "",
            nomzod: "",
            nomzod1: "",
            nomzod2: "",
            nomzod3: "",
            bitalik_taklif: false
        },
        onSubmit: (values) => {
            console.log(values);
            fetch(apiURL, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            formik2.resetForm();
        },
    });

    return (
        <div className="bg-[#F3F7FA] min-h-[calc(100vh-125px)]">
            <Breadcrumb
                locationPage="Takliflar"
                locationPageTwo="Taklif kiritish"
            />
            <h2 className="text-2xl font-semibold text-center my-5">
                Taklif kiritish
            </h2>

            <div className="w-full max-w-sm px-2 md:px-0 md:max-w-xl xl:max-w-3xl mx-auto">
                {/* Radio */}
                <form className="items-center w-full text-sm lg:text-xl font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4">
                    <div className="w-full border-b border-gray-200 px-6 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="formik_bittalik_true"
                                type="radio"
                                name="bitalik_taklif"
                                value={formik.values.bitalik_taklif}
                                onChange={() => setIsNomzodOne(true)}
                                defaultChecked
                            />
                            <label
                                htmlFor="formik_bittalik_true"
                                className="w-full py-3 ms-2 text-sm lg:text-xl font-semibold text-gray-700 dark:text-gray-300"
                            >
                                Yagona nomzod
                            </label>
                        </div>
                    </div>
                    <div className="w-full border-b border-gray-200 px-6 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="formik_bittalik_false"
                                type="radio"
                                name="bitalik_taklif"
                                value={formik2.values.bitalik_taklif}
                                onChange={() => setIsNomzodOne(false)}
                            />
                            <label
                                htmlFor="formik_bittalik_false"
                                className="w-full py-3 ms-2 text-sm lg:text-xl font-semibold text-gray-700 dark:text-gray-300"
                            >
                                Ko'proq nomzod
                            </label>
                        </div>
                    </div>
                </form>

                {isNomzodOne === null ? (
                    <></>
                ) : isNomzodOne === true ? (
                    <form
                        className="bg-white shadow-md rounded px-4 md:px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2"
                                htmlFor="name"
                            >
                                Taklif nomi
                            </label>
                            <textarea
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline"
                                id="name"
                                placeholder="Taklif"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2"
                                htmlFor="vaqt"
                            >
                                Berilgan vaqt (daqiqa)
                            </label>
                            <input
                                onChange={formik.handleChange}
                                value={formik.values.vaqt}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline"
                                id="vaqt"
                                type="number"
                                placeholder="Vaqt"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2"
                                htmlFor="nomzod"
                            >
                                Nomzod
                            </label>
                            <input
                                onChange={formik.handleChange}
                                value={formik.values.nomzod}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline"
                                id="nomzod"
                                type="text"
                                placeholder="Nomzod"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                className="bg-[#05B967] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Qo'shish
                            </button>
                        </div>
                    </form>
                ) : (
                    <form
                        className="bg-white shadow-md rounded px-4 md:px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik2.handleSubmit}
                    >
                        <div className="mb-4">
                            <label
                                className="  block text-gray-700 text-sm lg:text-xl font-semibold mb-2"
                                htmlFor="name"
                            >
                                Taklif nomi
                            </label>
                            <textarea
                                onChange={formik2.handleChange}
                                value={formik2.values.name}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline"
                                id="name"
                                placeholder="Taklif"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2"
                                htmlFor="vaqt"
                            >
                                Berilgan vaqt (daqiqa)
                            </label>
                            <input
                                onChange={formik2.handleChange}
                                value={formik2.values.vaqt}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline"
                                id="vaqt"
                                type="number"
                                placeholder="Vaqt"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2"
                                htmlFor="nomzod"
                            >
                                1-Nomzod
                            </label>
                            <input
                                onChange={formik2.handleChange}
                                value={formik2.values.nomzod}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline"
                                id="nomzod"
                                type="text"
                                placeholder="Nomzod"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2"
                                htmlFor="nomzod1"
                            >
                                2-Nomzod
                            </label>
                            <div className="flex justify-between gap-3">
                                <input
                                    onChange={formik2.handleChange}
                                    value={formik2.values.nomzod1}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline"
                                    id="nomzod1"
                                    type="text"
                                    placeholder="Nomzod"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsActiveTwoo(true)}
                                    className={`${
                                        isActiveTwoo && "hidden"
                                    } px-3 font-bold shadow appearance-none border rounded text-2xl text-gray-700 mb-3 leading-tight`}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className={`${isActiveTwoo ? "" : "hidden"} mb-4`}>
                            <label
                                className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2"
                                htmlFor="nomzod2"
                            >
                                3-Nomzod
                            </label>
                            <div className="flex justify-between gap-3">
                                <input
                                    onChange={formik2.handleChange}
                                    value={formik2.values.nomzod2}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline'
                                    id="nomzod2"
                                    type="text"
                                    placeholder="Nomzod"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsActiveThree(true)}
                                    className={`${
                                        isActiveThree && "hidden"
                                    } px-3 font-bold shadow appearance-none border rounded text-2xl text-gray-700 mb-3 leading-tight`}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div
                            className={`${isActiveThree ? "" : "hidden"} mb-4`}
                        >
                            <label
                                className="block text-gray-700 text-sm lg:text-xl font-semibold mb-2"
                                htmlFor="nomzod3"
                            >
                                4-Nomzod
                            </label>
                            <div className="flex justify-between gap-3">
                                <input
                                    onChange={formik2.handleChange}
                                    value={formik2.values.nomzod3}
                                    className={` shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-[#05b967] focus:ring-[#05b967] focus:shadow-outline`}
                                    id="nomzod3"
                                    type="text"
                                    placeholder="Nomzod"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                className="bg-[#05B967] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Qo'shish
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddTaklifCom;

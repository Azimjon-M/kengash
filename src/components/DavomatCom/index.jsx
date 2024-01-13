import React, { useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../Breadcrumb";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { RxUpdate } from "react-icons/rx";

const DavomatCom = () => {
  const url = "https://kengash.pythonanywhere.com/api/v1/davomat/";
  const token = "aadba973597b5840b5fbfab4f0039736e4e6f4c9";

  const fetchData = async () => {
    try {
      const response = await axios(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "www-authenticate": token,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.respnse);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-[calc(100vh-125px)] bg-[#F3F7FA]">
      <Breadcrumb locationPage="Davomat" />
      <div className="max-w-7xl mx-auto px-5 ">
        <div className="flex justify-between items-center py-8">
          <h2 className="text-md md:text-xl font-medium text-gray-600">
            Kengash a'zolari
          </h2>
          <button className="font-medium text-sm md:text-base text-gray-600 hover:text-green-600 hover:border-green-600 active:bg-green-100 border py-1 px-3 rounded-lg group/edit">
            Yangilash{" "}
            <RxUpdate className="inline group-hover/edit:animate-spin" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-sm sm:text-base rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs sm:text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-2 py-3">
                    №
                  </th>
                  <th scope="col" className="py-3 text-left">
                    Familiya
                  </th>
                  <th scope="col" className="py-3 text-left">
                    Ism
                  </th>
                  <th scope="col" className="py-3">
                    Davomat
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="py-4">Nurmamatov</td>
                  <td className="py-4">Nodirbek</td>
                  <td className="py-4 text-center">
                    <button className="border border-white hover:border-green-600 p-1 rounded-full">
                      <FaCheck className="text-green-600" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-sm sm:text-base rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs sm:text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-2 py-3">
                    №
                  </th>
                  <th scope="col" className="py-3 text-left">
                    Familiya
                  </th>
                  <th scope="col" className="py-3 text-left">
                    Ism
                  </th>
                  <th scope="col" className="py-3">
                    Davomat
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="py-4">Nurmamatov</td>
                  <td className="py-4">Nodirbek</td>
                  <td className="py-4 text-center">
                    <button className="border border-white hover:border-red-600 p-1 rounded-full">
                      <FaXmark className="text-red-600" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DavomatCom;

import React, { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumb";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { RxUpdate } from "react-icons/rx";

const DavomatCom = () => {
  const apiUrlDefault = "https://kengash.pythonanywhere.com/api/v1/davomat/";
  const [data, setData] = useState([]);

  // GET DATA
  const GetDataFromAPI = () => {
    const token = localStorage.getItem('token');
    fetch(apiUrlDefault, {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Xatolik:", error));
  };
  useEffect(() => {
    GetDataFromAPI();
  }, []);

  // UPDATE ALL DATA
  const handleUpdateData = () => {
    const token = localStorage.getItem('token')

    Promise.all(
      data.map((item) => {
        return fetch(`${apiUrlDefault}${item.id}/`, {
          method: "PUT",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: item.id,
            user_id: item.user_id,
            familya: item.familya,
            ism: item.ism,
            aktiv: false,
          }),
        })
          .then((response) => {
            if (response.ok) {
              GetDataFromAPI();
            } else {
              console.error("Error updating item:", response.statusText);
            }
          })
          .catch((error) => console.error("Xatolik:", error));
      })
    );
  };


  // ACTIVE
  const handleChangeActive = ({
    id,
    user_id,
    familya,
    ism,
  }) => {
    const token = localStorage.getItem('token');

    fetch(`${apiUrlDefault}${id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        user_id: user_id,
        familya: familya,
        ism: ism,
        aktiv: true,
      }),
    })
      .then((response) => {
        if (response.ok) {
          GetDataFromAPI();
        } else {
          console.error("Error updating item:", response.statusText);
        }
      })
      .catch((error) => console.error("Xatolik:", error));
  };

  // NoActive
  const handleChangeNoActive = ({
    id,
    user_id,
    familya,
    ism,
  }) => {
    const token = localStorage.getItem('token');

    fetch(`${apiUrlDefault}${id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        user_id: user_id,
        familya: familya,
        ism: ism,
        aktiv: false,
      }),
    })
      .then((response) => {
        if (response.ok) {
          GetDataFromAPI();
        } else {
          console.error("Error updating item:", response.statusText);
        }
      })
      .catch((error) => console.error("Xatolik:", error));
  };

  return (
    <div className="min-h-[calc(100vh-125px)] bg-[#F3F7FA]">
      <Breadcrumb locationPage="Davomat" />
      <div className="max-w-7xl mx-auto px-5 ">
        <div className="flex justify-between items-center py-8">
          <h2 className="text-md md:text-xl font-medium text-gray-600">
            Kengash a'zolari
          </h2>
          <button onClick={() => handleUpdateData()} className="font-medium text-sm md:text-base text-gray-600 hover:text-green-600 hover:border-green-600 active:bg-green-100 border py-1 px-3 rounded-lg group/edit">
            Yangilash
            <RxUpdate className="inline group-hover/edit:animate-spin ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="relative overflow-x-auto ">
            <h2 className="text-xl text-center mb-5">Barcha a'zolar</h2>
            <table className="w-full text-sm sm:text-base rtl:text-right text-gray-500 dark:text-gray-400 shadow-md">
              <thead className="text-xs sm:text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-2 py-3">
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
                {data.map((item, id) =>
                  !item.aktiv && (
                    <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.familya}
                      </th>
                      <td className="py-4">{item.ism}</td>
                      <td className="py-4 text-center">
                        <button onClick={() => handleChangeActive(item)}
                          className="border border-white hover:border-green-600 p-1 rounded-full">
                          <FaCheck className="text-green-600" />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Kengashda qatnashmayotganlar */}
          <div className="relative overflow-x-auto">
            <h2 className="text-xl text-center mb-5">Kengashda qatnashayotganlar</h2>
            <table className="w-full text-sm sm:text-base rtl:text-right text-gray-500 dark:text-gray-400 shadow-md">
              <thead className="text-xs sm:text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-2 py-3">
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
                {data.map((item, id) =>
                  item.aktiv && (
                    <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.familya}
                      </th>
                      <td className="py-4">{item.ism}</td>
                      <td className="py-4 text-center">
                        <button onClick={() => handleChangeNoActive(item)}
                          className="border border-white hover:border-red-600 p-1 rounded-full">
                          <FaXmark className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DavomatCom;

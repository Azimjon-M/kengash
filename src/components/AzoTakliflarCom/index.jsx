import React, { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumb";
import taklifApi from "../../services/taklif";
import davomatApi from "../../services/davomat";

const allNomzodFalse = {
  nomzod: false,
  nomzod1: false,
  nomzod2: false,
  nomzod3: false,
};

const AzoTakliflarCom = () => {
  const [data, setData] = useState([]);
  const [filtredDavomat, setFiltredDavomat] = useState([]);
  const [filtredData, setFiltredData] = useState([data]);
  const [voteData, setVoteData] = useState([data]);
  const [isId, setIsId] = useState();
  const userId = localStorage.getItem("user_id");


  // GET DAVOMAT
  const GetDavomat = async () => {
    const { data: davomatData } = await davomatApi.get();
    setFiltredDavomat(davomatData.filter((user) => user.aktiv === true));
  };
  useEffect(() => {
    GetDavomat();
  }, []);


  //GET DATA
  useEffect(() => {
    const getTakliflar = async () => {
      const { data: responseData } = await taklifApi.get();
      setData(responseData);
      setFiltredData(
        responseData.filter(
          (item) =>
            item.tugash === false &&
            item.yoqish === true &&
            filtredDavomat.some((user) => user.user_id === userId)
        )
      );
    };
    getTakliflar();
  }, [userId, filtredDavomat]);


  // COUNTDOWN
  useEffect(() => {
    const interval = setInterval(() => {
      setFiltredData((filtredData) =>
        filtredData.map((item) => {
          if (item.tugash_vaqti) {
            let vaqt = item.tugash_vaqti.split(":").map(Number);
            let now = new Date();
            let qolganVaqt =
              vaqt[0] * 60 * 60 +
              vaqt[1] * 60 -
              (now.getHours() * 60 * 60 +
                now.getMinutes() * 60 +
                now.getSeconds());
            let qolganMinut = Math.floor(qolganVaqt / 60);
            let qolganSeconds = qolganVaqt % 60;
            return { ...item, qolganMinut, qolganSeconds };
          } else {
            return item;
          }
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  // GET OVOZLAR
  const getOvozlar = async () => {
  const userId = localStorage.getItem("user_id");
    const { data: responseData } = await taklifApi.voteCheckGet();
    setVoteData(responseData.filter((item) => item.user_id === userId));
  };
  useEffect(() => {
    getOvozlar();
  }, []);


  // POST DATA
  const handleVote = async (taklif) => {
    setIsId(taklif.id)
    const allItemsHaveDifferentId = voteData.some(
      item => Number(item.taklif_id) === isId
      );
      if (allItemsHaveDifferentId) {
        alert("Siz ovoz berib bo'lgansiz.!");
      } else {
        const reqBody = {
          ...taklif,
          ...allNomzodFalse,
          nomzod: true,
          taklif_id: taklif.id,
        };
      const { data: response } = await taklifApi.vote(reqBody);
      console.log("Post Result:", response);
      alert("Ovozingiz muvaffaqiyatli qo'shildi.!");
    }
  };


  // POST DATA FOR ALL Nomzdolar
  const handleNomzodVote = async (taklif, trueNomzod) => {
    const reqBody = {
      ...taklif,
      ...allNomzodFalse,
      [trueNomzod]: true,
      taklif_id: taklif.id,
    };
    const { data: result } = await taklifApi.vote(reqBody);
    console.log("Post Result:", result);
    alert("Ovozingiz muvaffaqiyatli qo'shildi.!");
  };


  return (
    <div className="bg-[#F3F7FA] min-h-[calc(100vh-125px)]">
      <Breadcrumb locationPage="Takliflar" />
      <div className="px-2 md:p-8">
        <h2 className="text-center text-2xl xl:text-3xl font-semibold mb-5">
          Takliflar
        </h2>
        <div>
          {filtredData.map((taklif, idx) => {
            return (
              <div key={idx}>
                {taklif.yoqish &&
                  (taklif.bitalik_taklif ? (
                    !taklif.tugash && (
                      <div className="border-2 rounded p-2 lg:px-8 mb-5 shadow-md">
                        {/* VAQT */}
                        <div className="flex items-center justify-between mb-5">
                          <h2 className="text-2xl font-semibold">
                            Berilgan vaqt
                          </h2>
                          {taklif.qolganMinut <= 0 &&
                          taklif.qolganSeconds <= 0 ? (
                            <span className="countdown font-mono text-2xl font-bold text-red-500">
                              00:00
                            </span>
                          ) : (
                            <span className="countdown font-mono text-2xl font-bold">
                              <span
                                style={{ "--value": taklif.qolganMinut }}
                              ></span>
                              :
                              <span
                                style={{ "--value": taklif.qolganSeconds }}
                              ></span>
                            </span>
                          )}
                        </div>
                        {/* TAKLIF */}
                        <div className="mb-5 md:text-lg xl:text-xl">
                          <b>Taklif: </b>
                          {taklif.name}
                        </div>
                        {/* NOMZOD */}
                        <div className="mb-5 md:text-lg xl:text-xl">
                          <b>Nomzod: </b>
                          {taklif.nomzod}
                        </div>
                        {/* BUTTONS */}
                        <div className="flex items-center justify-between md:justify-end md:gap-3">
                          <button
                            disabled={
                              taklif.qolganMinut <= 0 &&
                              taklif.qolganSeconds <= 0
                            }
                            onClick={() =>
                              handleVote({ ...taklif, rozilar: true })
                            }
                            className={`btn btn-sm md:btn md:text-white rounded ${
                              taklif.tugash
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-500 md:bg-green-600"
                            } w-[100px] md:w-[120px] lg:text-lg text-white`}
                          >
                            Roziman
                          </button>
                          <button
                            disabled={
                              taklif.qolganMinut <= 0 &&
                              taklif.qolganSeconds <= 0
                            }
                            onClick={() =>
                              handleVote({ ...taklif, qarshilar: true })
                            }
                            className={`btn btn-sm md:btn md:text-white rounded ${
                              taklif.tugash
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-500 md:bg-red-600"
                            } w-[100px] md:w-[120px] lg:text-lg text-white`}
                          >
                            Qarshiman
                          </button>
                          <button
                            disabled={
                              taklif.qolganMinut <= 0 &&
                              taklif.qolganSeconds <= 0
                            }
                            onClick={() =>
                              handleVote({ ...taklif, betaraflar: true })
                            }
                            className={`btn btn-sm md:btn md:text-white rounded ${
                              taklif.tugash
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-yellow-600 hover:bg-yellow-500 md:bg-yellow-600"
                            } w-[100px] md:w-[120px] lg:text-lg text-white`}
                          >
                            Betarafman
                          </button>
                        </div>
                      </div>
                    )
                  ) : taklif.tugash ? (
                    <div></div>
                  ) : (
                    <div className="border-2 rounded p-2 lg:px-8 mb-5 shadow-md">
                      {/* VAQT */}
                      <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-semibold">
                          Berilgan vaqt
                        </h2>
                        {taklif.qolganMinut <= 0 &&
                        taklif.qolganSeconds <= 0 ? (
                          <span className="countdown font-mono text-2xl font-bold text-red-500">
                            00:00
                          </span>
                        ) : (
                          <span className="countdown font-mono text-2xl font-bold">
                            <span
                              style={{ "--value": taklif.qolganMinut }}
                            ></span>
                            :
                            <span
                              style={{ "--value": taklif.qolganSeconds }}
                            ></span>
                          </span>
                        )}
                      </div>
                      {/* TAKLIF */}
                      <div className="mb-5 md:text-lg xl:text-xl">
                        <b>Taklif: </b>
                        {taklif.name}
                      </div>
                      {/* NOMZODLAR */}
                      <div className="text-center md:flex md:items-center md:justify-end gap-3 md:flex-wrap">
                        <div className="mb-5 md:text-lg xl:text-xl">
                          <button
                            disabled={
                              taklif.qolganMinut <= 0 &&
                              taklif.qolganSeconds <= 0
                            }
                            onClick={() => handleNomzodVote(taklif, "nomzod")}
                            className="btn bg-blue-600 hover:bg-blue-500 text-white"
                          >
                            {taklif.nomzod}
                          </button>
                        </div>
                        <div className="mb-5 md:text-lg xl:text-xl">
                          <button
                            disabled={
                              taklif.qolganMinut <= 0 &&
                              taklif.qolganSeconds <= 0
                            }
                            onClick={() => handleNomzodVote(taklif, "nomzod1")}
                            className="btn bg-blue-600 hover:bg-blue-500 text-white"
                          >
                            {taklif.nomzod1}
                          </button>
                        </div>
                        <div
                          className={`${
                            taklif.nomzod2 ? "" : "hidden"
                          } mb-5 md:text-lg xl:text-xl`}
                        >
                          <button
                            disabled={
                              taklif.qolganMinut <= 0 &&
                              taklif.qolganSeconds <= 0
                            }
                            onClick={() => handleNomzodVote(taklif, "nomzod2")}
                            className="btn bg-blue-600 hover:bg-blue-500 text-white"
                          >
                            {taklif.nomzod2}
                          </button>
                        </div>
                        <div
                          className={`${
                            taklif.nomzod3 ? "" : "hidden"
                          } mb-5 md:text-lg xl:text-xl`}
                        >
                          <button
                            disabled={
                              taklif.qolganMinut <= 0 &&
                              taklif.qolganSeconds <= 0
                            }
                            onClick={() => handleNomzodVote(taklif, "nomzod3")}
                            className="btn bg-blue-600 hover:bg-blue-500 text-white"
                          >
                            {taklif.nomzod3}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AzoTakliflarCom;

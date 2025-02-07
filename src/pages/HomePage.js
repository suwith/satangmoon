import React from "react";
import caseEmpty from '../assets/chocolate_case_empty.svg';
import chocoIcon from "../assets/chocolate_logo.svg";
import letterIcon from "../assets/letter_icon.svg"
const HomePage = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl font-semibold mb-4">김철수님의 초콜릿함</h2>
            <p className="text-gray-500 text-md font-bold">아직 담긴 초콜릿이 없어요</p>
          </div>
          <div className="flex justify-center w-full">
            <img
              src={caseEmpty}
              alt="초콜릿 상자"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col space-y-4 items-center justify-center mt-16">
            <button className="w-full h-12 bg-amber-950 text-white  flex justify-center items-center rounded-lg font-bold text-center px-3 py-2 shadow-gray-500 shadow-md">
              <img src={chocoIcon} alt={chocoIcon} className="w-7 h-7 mr-2"/>
              철수님에게 초콜릿 보내기
            </button>
            <button className="w-full h-12 bg-red-300 text-amber-950 flex justify-center items-center rounded-lg font-bold text-center p-1 hadow-gray-500 shadow-md">
              <img src={letterIcon} alt={letterIcon} className="w-7 h-7 mr-2"/>
              내 초콜릿함 보러가기
            </button>
          </div>
        </div>
      </div>
    );
};

export default HomePage;

// src/component/ProgressBar.jsx
import React from "react";
import progressImg from '../asset/progres.png';

const ProgresBar = ({ width = '10rem', height = '0.5rem', progress = 40 }) => {
  return (
    <div className="bg-white mx-4 my-4 rounded-2xl shadow p-4 flex items-center justify-between border">
      <div>
        <h3 className="font-semibold">Progress</h3>
        <p className="text-sm text-gray-500">Donate 12 more medicine to receive gift</p>
        <p className="text-lg font-bold mt-2">12 / 30</p>

        {/* Progress Track */}
        <div
          className="bg-gray-200 rounded-full mt-2"
          style={{ width: width, height: height }}
        >
          <div
            className="bg-blue-500 rounded-full"
            style={{
              width: `${progress}%`,
              height: '100%',
            }}
          ></div>
        </div>
      </div>

      {/* Right Image */}
      <img src={progressImg} alt="Progress" className="w-24 h-auto" />
    </div>
  );
};

export default ProgresBar;

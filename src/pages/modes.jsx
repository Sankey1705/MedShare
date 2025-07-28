import react, { useState } from "react";
import ContinueButton from "../component/continueButton";
import bike_modes from '../asset/bike_modes.png'


const Modes = () => {
    const [selectedOption, setSelectedOption] = useState(null);



    return(
        <div className="min-h-screen bg-gray-50 px-4 py-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-semibold mb-6">
          Hey, what do you want to book today?
        </h1>

        <div className="space-y-4">
          
          <div
            onClick={() => setSelectedOption("donate")}
            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
              selectedOption === "donate"
                ? "border-blue-500 ring-2 ring-blue-200 bg-white"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedOption === "donate"
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-400"
                } flex items-center justify-center`}
              >
                {selectedOption === "donate" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </div>
              <span className="text-lg font-medium">Donate Medicines</span>
            </div>
            <img
              src={bike_modes} // replace with your image path or component
              alt="Donate"
              className="w-40 h-20"
            />
          </div>

          {/* Get Medicines Option */}
          <div
            onClick={() => setSelectedOption("get")}
            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
              selectedOption === "get"
                ? "border-blue-500 ring-2 ring-blue-200 bg-white"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedOption === "get"
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-400"
                } flex items-center justify-center`}
              >
                {selectedOption === "get" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                )}
              </div>
              <span className="text-lg font-medium">Get Medicines</span>
            </div>
            <img
              src={bike_modes} // reuse or swap image
              alt="Get"
              className="w-40 h-20"
            />
          </div>
        </div>
      </div>

      
      <ContinueButton selectedOption={selectedOption} />
    </div>
    );
};


export default Modes;
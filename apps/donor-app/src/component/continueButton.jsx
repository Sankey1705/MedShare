
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const ContinueButton = ({ selectedOption }) => {
    
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedOption === "donate") {
      navigate("/donor");
    } else {
      navigate("/receiver");
    }
  };



    return(
        <button
        onClick={handleContinue}
        className="mt-10 bg-blue-500 text-white text-lg py-3 rounded-full w-full shadow-md hover:bg-blue-600 transition"
        disabled={!selectedOption}
      >
        Continue
      </button>

    );
};



export default ContinueButton;
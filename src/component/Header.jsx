import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ userType, switchTo, bikeImage }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-40 bg-blue-100 bg-cover bg-right relative rounded-b-xl"
      style={{
        backgroundImage: `url(${bikeImage})`,
      }}
    >
      <div className="absolute inset-0  bg-opacity-70 rounded-b-xl" />
      <div className="relative z-10 px-4 py-4">
        <h2 className="text-xl font-semibold text-black">{userType}</h2>
        <p
          className="text-black text-sm cursor-pointer underline"
          onClick={() => navigate('/')}
        >
          Switch to {switchTo} &gt;
        </p>
      </div>
    </div>
  );
};

export default Header;

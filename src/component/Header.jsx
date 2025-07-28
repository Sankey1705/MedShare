import React from 'react';

const Header = ({ userType, switchTo, bikeImage }) => (
  <div className="flex justify-between items-center bg-blue-100 p-4 rounded-xl mb-4">
    <div>
      <h2 className="text-xl font-semibold">{userType}</h2>
      <p className="text-blue-600 text-sm">Switch to {switchTo} &gt;</p>
    </div>
    <img src={bikeImage} alt="bike" className="w-24 h-auto" />
  </div>
);

export default Header;

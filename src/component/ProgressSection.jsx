import React from 'react';

const ProgressSection = () => (
  <div className="bg-white p-4 rounded-xl shadow mb-4">
    <h3 className="text-md font-semibold mb-2">Your Progress</h3>
    <div className="flex justify-between gap-4 mb-4">
      <div className="flex-1 text-center bg-blue-50 p-3 rounded-lg">
        <div className="text-blue-500 text-xl font-bold">12+</div>
        <div className="text-sm text-gray-700">Donated</div>
        <p className="text-xs text-gray-500">Medicines</p>
      </div>
      <div className="flex-1 text-center bg-blue-50 p-3 rounded-lg">
        <div className="text-blue-500 text-xl font-bold">5+</div>
        <div className="text-sm text-gray-700">People Impacted</div>
        <p className="text-xs text-gray-500">people got help</p>
      </div>
    </div>
    <div>
      <p className="text-sm mb-1">Donate 12 more medicine to receive gift</p>
      <p className="text-sm font-semibold">12 / 30</p>
      <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }} />
      </div>
    </div>
  </div>
);

export default ProgressSection;

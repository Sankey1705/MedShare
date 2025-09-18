import React from 'react';
import ProgresBar from './ProgresBar';

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
    
    <ProgresBar width='12rem' height='0.6rem' progress={40}/>
  </div>
);

export default ProgressSection;

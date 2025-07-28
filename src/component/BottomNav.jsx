import React from 'react';
import { Home, Wallet, User } from 'lucide-react';

const BottomNav = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow p-2 flex justify-around">
    <div className="flex flex-col items-center text-blue-500">
      <Home size={20} />
      <span className="text-xs">Home</span>
    </div>
    <div className="flex flex-col items-center text-gray-500">
      <Wallet size={20} />
      <span className="text-xs">Rewards</span>
    </div>
    <div className="flex flex-col items-center text-gray-500">
      <User size={20} />
      <span className="text-xs">Profile</span>
    </div>
  </div>
);

export default BottomNav;

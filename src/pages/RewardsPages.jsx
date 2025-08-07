import React from 'react';
import BottomNav from '../component/BottomNav';
import couponImg from '../asset/coupon.png'; 
import progressImg from '../asset/progres.png'; 
import ProgresBar from '../component/ProgresBar';

const RewardsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <h2 className="text-center text-xl font-bold py-4 shadow bg-white">Coupons</h2>

      {/* Progress Card */}
      <ProgresBar />

      {/* Coupon Grid */}
      <div className="grid grid-cols-2 gap-4 px-4">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-2 flex flex-col items-center border"
          >
            <img src={couponImg} alt="Coupon" className="w-24 h-24" />
            <p className="text-sm mt-2 font-medium text-center">Tap to see coupon</p>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default RewardsPage;

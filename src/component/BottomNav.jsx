import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Wallet, User } from 'lucide-react';

const BottomNav = ({ userType }) => {
  // ✅ donor nav items
  const donorNavItems = [
    { to: '/donor', label: 'Home', icon: <Home size={22} /> },
    { to: '/rewards', label: 'Rewards', icon: <Wallet size={22} /> },
    { to: '/profile', label: 'Profile', icon: <User size={22} /> },
  ];

  // ✅ receiver nav items
  const receiverNavItems = [
    { to: '/receiver', label: 'Home', icon: <Home size={22} /> },
    { to: '/rewards', label: 'Rewards', icon: <Wallet size={22} /> },
    { to: '/profile', label: 'Profile', icon: <User size={22} /> },
  ];

  // ✅ pick correct items dynamically
  const navItems = userType === 'Receiver' ? receiverNavItems : donorNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50 flex justify-around items-center py-2">
      {navItems.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            `flex flex-col items-center text-xs ${
              isActive ? 'text-blue-600' : 'text-gray-400'
            }`
          }
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center">
              <div className={`p-1 rounded-full ${label === 'Rewards' && isActive ? 'bg-blue-100' : ''}`}>
                {icon}
              </div>
              <span>{label}</span>
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;

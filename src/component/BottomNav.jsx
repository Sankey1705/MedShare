// src/component/BottomNav.jsx
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User, HandHeart, ShoppingCart } from 'lucide-react'; // HandHeart & ShoppingCart
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const BottomNav = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserType(data.role); // 'Donor' or 'Receiver'
        }
      } catch (err) {
        console.error('Error fetching user role:', err);
      }
    };

    fetchUserRole();
  }, []);

  // ✅ Donor nav
  const donorNavItems = [
    { to: '/donor', label: 'Home', icon: <Home size={22} /> },
    { to: '/mydonations', label: 'My Donations', icon: <HandHeart size={22} /> },
    { to: '/profile', label: 'Profile', icon: <User size={22} /> },
  ];

  // ✅ Receiver nav
  const receiverNavItems = [
    { to: '/receiver', label: 'Home', icon: <Home size={22} /> },
    { to: '/my-orders', label: 'My Orders', icon: <ShoppingCart size={22} /> },
    { to: '/profile', label: 'Profile', icon: <User size={22} /> },
  ];

  const navItems =
    userType === 'Receiver'
      ? receiverNavItems
      : userType === 'Donor'
      ? donorNavItems
      : [];

  if (!userType) return null; // optional: loading state

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
              <div
                className={`p-1 rounded-full ${
                  (label === 'My Donations' || label === 'My Orders') && isActive
                    ? 'bg-blue-100'
                    : ''
                }`}
              >
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

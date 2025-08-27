// src/context/UserContext.js
import React, { createContext, useState } from "react";

// Create Context
export const UserContext = createContext();

// Context Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    phone: "+91 98654 13204",
    email: "johndoe@gmail.com",
    address:
      "44, Kingsway Rd, near Kasturchand Park, Mohan Nagar, Nagpur, Maharashtra 440001",
    profilePic: "/Profile.png", // keep your image in public folder
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

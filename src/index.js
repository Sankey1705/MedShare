import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Modes from './pages/modes';
import DonorPage from './pages/DonorPage';
import RewardsPage from './pages/RewardsPages';
import ProfilePage from './pages/ProfilePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
    <Routes>
      <Route path='/'  element={<Modes/>} />
      <Route path='/donor'  element={<DonorPage/>} />
      <Route path="/rewards" element={<RewardsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      

    </Routes>
   
   </BrowserRouter>
);
// <Route path="/profile" element={<ProfilePage />} />
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

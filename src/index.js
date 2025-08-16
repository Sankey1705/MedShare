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
import DonationForm from './pages/DonationForm';
import Scanner from './pages/Scanner';
import MedOverview from './pages/MedOverview';
import EditDetailsPage from './pages/EditDetailsPage';
import PickupDetailsPage from './pages/PickupDetailsPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
    <Routes>
      <Route path='/'  element={<Modes/>} />
      <Route path='/donor'  element={<DonorPage/>} />
      <Route path="/rewards" element={<RewardsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path='/donation-form' element={<DonationForm/>} />
      <Route path="/Scanner" element={<Scanner />} />
      <Route path="/MedOverview" element={<MedOverview />} />
      <Route path="/edit-details" element={<EditDetailsPage />} />
      <Route path="/pickup-details" element={<PickupDetailsPage />} />
      

    </Routes>
   
   </BrowserRouter>
);
// <Route path="/profile" element={<ProfilePage />} />
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

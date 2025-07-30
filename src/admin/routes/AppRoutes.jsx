import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUpPage2 from '../pages/SignUpPage2';
import SignUpPage3 from '../pages/SignUpPage3';
import EmailVerificationPage from '../pages/EmailVerificationPage';
import Dashboard from '../pages/Dashboard';
import ManageUsers from '../pages/ManageUsers';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import AddProduct from '../pages/AddProduct';
import AddService from '../pages/AddService';
import Revenue from '../pages/Revenue';
import AddPhotos from '../pages/AddPhotos';
import AddPhotosFrom from '../pages/AddPhotosFrom';
import DeliveryBoys from '../pages/DeliveryBoys';
import UserData from '../pages/orderPages/UserData';
import LoginOtp from '../pages/LoginOtp';
import PrivateRoute from '../../protected/PrivateRoute';
import MapComponent from '../components/MapComponent';
import Offers from '../pages/Offers';
import ShopNotes from '../pages/ShopNotes';
import Map2 from '../components/Map2';

import { Toaster } from 'react-hot-toast';

const AppRoutes = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Public Routes */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup/step-2" element={<SignUpPage2 />} />
        <Route path="signup/step-3" element={<SignUpPage3 />} />
        <Route path="signup/verify" element={<EmailVerificationPage />} />
        <Route path="Login-otp" element={<LoginOtp />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="manageUsers" element={<ManageUsers />} />
          <Route path="products" element={<Products />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="userData/:id" element={<UserData />} />
          <Route path="addservice" element={<AddService />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="addphotos" element={<AddPhotos />} />
          <Route path="addphotos/new" element={<AddPhotosFrom />} />
          <Route path="delivery-boys" element={<DeliveryBoys />} />
          <Route path="map" element={<MapComponent />} />
          <Route path="offers" element={<Offers />} />
          <Route path="shop-notes" element={<ShopNotes />} />
          <Route path="map2" element={<Map2 />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;

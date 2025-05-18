import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import Header from './Components/Header';
import Footer from './Components/Footer';

//paginas import
import Home from './Pages/Home';
import PropertyDetails from './Pages/PropertyDetails';
import SignUp from './Pages/Sign-up';
import Reviews from './Pages/Reviews';
import Contact from './Pages/Contact-us';
import About from './Pages/About-us';
import SignIn from './Pages/SignIn';
import Profile from './Pages/Profile-user';
import Booking from './Pages/Booking';
import Bed from './Pages/bed-rooms';
import Dashboard from './Pages/Dashboard';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import { useAuthStore } from './hooks/useAuthStore';
import { Loader } from './Components/Loader';

export default function App() {
  const { status: authStatus, checkAuthToken } = useAuthStore();

  // Lista que contiene los titulos del header
  const listaMenu = [
    {
      titulo: 'Nosotros',
      path: '/about-us',
    },
  ];

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (authStatus === 'checking') return <Loader />;

  return (
    <Box>
      <Header listaMenu={listaMenu} />
      <Routes>
        <Route path="/" element={<Home />} />
        {authStatus === 'not-authenticated' ? (
          <>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/propiedades/:id" element={<PropertyDetails />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="/bed-rooms" element={<Bed />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/ResetPassword/:token" element={<ResetPassword />} />
          </>
        )}
      </Routes>
      <Footer />
    </Box>
  );
}

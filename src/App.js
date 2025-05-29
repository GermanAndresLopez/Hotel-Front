import { React, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import Header from './Components/Header';
// import Footer from './Components/Footer';

//paginas import
import { Home } from './Pages/user/home/pages/home';
import Header from './Pages/user/home/components/header';
import Footer from './Pages/user/home/components/footer';
import PropertyDetails from './Pages/PropertyDetails';
import SignUp from './Pages/Sign-up';
import Reviews from './Pages/Reviews';
import Contact from './Pages/Contact-us';
import About from './Pages/About-us';
import SignIn from './Pages/SignIn';
import Profile from './Pages/Profile-user';
import { Box } from '@mui/material';
import Booking from './Pages/Booking';
import Bed from './Pages/bed-rooms';
import Bedold from './Pages/bed-roomsold';
import Dashboard from './Pages/DashboardHabitacion/Dashboard';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import { useSelector } from 'react-redux';
import AdministrarServicios from './Pages/AdminExtras/AdministrarServicios';
import GuestProductServiceView from './Pages/UserExtras/SolicitarProductos';
import { useAuthStore } from './hooks/useAuthStore';
import { Loader } from './Components/Loader';

export default function App() {
  const { rol } = useSelector((state) => state.auth);
  const { checkAuthToken, status, user } = useAuthStore();

  const listaMenu = [
    {
      titulo: 'NOSOTROS',
      path: '/about-us',
    },
  ];

  if (rol) {
    listaMenu.push({
      titulo: `ROL: ${rol}`,
      path: '#',
    });
  }

  useEffect(() => {
    (async function () {
      await checkAuthToken();
    })();
  }, []);

  if (status === 'checking') return <Loader />;

  return (
    <Box>
      <Header />
      <Routes>
        {status !== 'authenticated' ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/ResetPassword/:token" element={<ResetPassword />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/propiedades/:id" element={<PropertyDetails />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="/bed-rooms" element={<Bed />} />
            <Route path="/bed-roomsold" element={<Bedold />} />
            <Route
              path="/UserExtras/SolicitarProductos"
              element={<GuestProductServiceView />}
            />
            <Route path="/*" element={<Navigate to="/bed-rooms" />} />

            {user.rol === 'administrador' && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/AdminExtras/AdministrarServicios"
                  element={<AdministrarServicios />}
                />
              </>
            )}
          </>
        )}
      </Routes>
      <Footer />
    </Box>
  );
}

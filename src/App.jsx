import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Pages/user/home/components/header';
import Footer from './Pages/user/home/components/footer';

import { ThemeProvider } from './Pages/user/home/hooks/theme-provider'; // 👈 Importa tu ThemeProvider

// Pages
import { Home } from './Pages/user/home/pages/home';
import PropertyDetails from './Pages/PropertyDetails';
import SignUp from './Pages/SignUp';
import Reviews from './Pages/Reviews';
import Contact from './Pages/Contact-us';
import About from './Pages/About-us';
import SignIn from './Pages/SignIn';
import Profile from './Pages/Profile-user';
import { Box } from '@mui/material';
import Booking from './Pages/Booking';
import Bed from './Pages/bed-rooms';
import Dashboard from './Pages/Dashboard';
import { useAuthStore } from './hooks/auth/useAuthStore';
import ForgotPassword from './Pages/ForgotPassword';
import { Loader } from './Components/Loader';
import ResetPassword from './Pages/ResetPassword';
import AdministrarServicios from './Pages/AdministrarServicios';
import GuestProductServiceView from './Pages/GuestProductServiceView';

export default function App() {
  const { authStatus, checkAuthToken, user } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (authStatus === 'checking') return <Loader />;

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      {/* 👈 Aquí envolvemos todo */}
      <Box className="min-h-screen bg-background antialiased">
        <Header />

        <Routes>
          {authStatus === 'not-authenticated' ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/*" element={<Navigate to={'/'} />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/ResetPassword/:token" element={<ResetPassword />} />
            </>
          ) : (
            <>
              <Route path="/propiedades/:id" element={<PropertyDetails />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/profile" element={<Profile />} />

              {user.rol === 'administrador' && (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/AdminExtras/AdministrarServicios"
                    element={<AdministrarServicios />}
                  />
                </>
              )}

              <Route path="/Booking" element={<Booking />} />
              <Route path="/bed-rooms" element={<Bed />} />
              <Route path="/*" element={<Navigate to={'/bed-rooms'} />} />

              <Route
                path="/UserExtras/SolicitarProductos"
                element={<GuestProductServiceView />}
              />
            </>
          )}
        </Routes>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

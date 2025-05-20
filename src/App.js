import { React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import { Box } from '@mui/material';
import Booking from './Pages/Booking';
import Bed from './Pages/bed-rooms';
import Dashboard from './Pages/Dashboard';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import { useSelector } from 'react-redux';

export default function App() {
  
  const { rol } = useSelector((state) => state.auth);

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

  // Estado para saber si un usuario inicio sesion
  const [auth, setAuth] = useState({
    auth: false,
    userName: '',
  });

  

  const [room, setRoom] = useState({});


  const cambiarEstadoAuth = (nuevoEstado) => {
    setAuth(nuevoEstado);
  };

  // Funcion para cambiar el estado de la habitacion que se reservara
  const cambiarRoom = (nuevoEstado) => {
    setRoom(nuevoEstado);
  };

  return (
    <Box>
      <Header listaMenu={listaMenu} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
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
      </Routes>
      <Footer />
    </Box>
  );
}

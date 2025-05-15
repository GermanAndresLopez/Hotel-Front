import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

// Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ThemeProvider } from "./Pages/user/home/hooks/theme-provider";  // 👈 Importa tu ThemeProvider

// Pages
import { Home} from "./Pages/user/home/pages/home";
import PropertyDetails from "./Pages/PropertyDetails";
import SignUp from "./Pages/Sign-up";
import Reviews from "./Pages/Reviews";
import Contact from "./Pages/Contact-us";
import About from "./Pages/About-us";
import SignIn from "./Pages/Sign-in";
import Profile from "./Pages/Profile-user";
import Booking from "./Pages/Booking";
import Bed from "./Pages/bed-rooms";
import Dashboard from "./Pages/Dashboard";

export default function App() {
  const ListaMenu = [
    { titulo: "NOSOTROS", path: "/about-us" },
  ];

  const [auth, setAuth] = useState({ 
    auth: false,
    userName: ""
  });

  const [room, setRoom] = useState({});

  const cambiarEstadoAuth = (nuevoEstado) => {
    setAuth(nuevoEstado);
  };

  const cambiarRoom = (nuevoEstado) => {
    setRoom(nuevoEstado);
  };

  return (
    <ThemeProvider defaultTheme="dark" attribute="class">  {/* 👈 Aquí envolvemos todo */}
      <Box className="min-h-screen bg-background antialiased">
        {/* <Header ListaMenu={ListaMenu} auth={auth} cambiarEstadoAuth={cambiarEstadoAuth} />  */}

        <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn cambiarEstadoAuth={cambiarEstadoAuth} />} />
          <Route path='/propiedades/:id' element={<PropertyDetails />} />
          <Route path='/reviews' element={<Reviews />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/Booking' element={<Booking />} />
          <Route path='/bed-rooms' element={<Bed />} />
        </Routes>

        {/* <Footer /> */}
      </Box>
    </ThemeProvider>
  );
}

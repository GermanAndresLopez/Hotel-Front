import {React, useState} from "react";
import {Routes,Route} from 'react-router-dom';
import Header from "./Components/Header";
import Footer from "./Components/Footer";

//paginas import
import Home from "./Pages/Home";
import PropertyDetails from "./Pages/PropertyDetails";
import SignUp from "./Pages/Sign-up";
import Reviews from "./Pages/Reviews";
import Contact from "./Pages/Contact-us"
import About from "./Pages/About-us"
import SignIn from "./Pages/Sign-in"
import Profile from "./Pages/Profile-user"
import { Box} from "@mui/material";
import Booking from "./Pages/Booking";
export default function App() {

  // Lista que contiene los titulos del header
  const ListaMenu = [
    {
      titulo:"NOSOTROS",
      path:"/about-us"
    },
  ];

  // Estado para saber si un usuario inicio sesion
  const [auth, setAuth] = useState({ 
    auth: false,
    userName: ""
  });

  // Estado para obtener los datos de la habitacion que se reservara
  const [room, setRoom] = useState({});

  // Funcion para cambiar el estado de actividad del cliente
  const cambiarEstadoAuth = (nuevoEstado) => {
    setAuth(nuevoEstado);
  };

  // Funcion para cambiar el estado de la habitacion que se reservara
  const cambiarRoom = (nuevoEstado) => {
    setRoom(nuevoEstado);
  };

  return (
    <Box>
      <Header ListaMenu={ListaMenu} auth={auth} cambiarEstadoAuth={cambiarEstadoAuth}/> 
      <Routes> 
        <Route path='/' element ={<Home/>} />
        <Route path='/sign-up' element ={<SignUp/>} />
        <Route path='/sign-in' element ={<SignIn cambiarEstadoAuth={cambiarEstadoAuth}/>} />
        <Route path='/propiedades/:id' element={<PropertyDetails/>}/>
        <Route path='/reviews' element ={<Reviews/>} />
        <Route path='/contact-us' element ={<Contact/>} />
        <Route path='/about-us' element ={<About/>} />
        <Route path='/profile' element ={<Profile/>} />
        <Route path='/Booking' element ={<Booking/>} />
      </Routes>
      <Footer/>
    </Box>
  );
}

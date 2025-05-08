import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";

import React, { useState, Fragment, createContext } from "react";

import axios from "axios";
import Alert from "../Components/Alert";
import PaymentForm from "../Components/PaymentForm";
import AddressForm from "../Components/AdressForm";
import InvoiceForm from "../Components/InvoiceForm";
import BookingForm from "../Components/BookingForm";

const steps = ['Datos de reserva','Datos De Contacto', 'Detalles De Pago', 'Detalles De Orden'];
export const reservaContext = createContext();
export const userContext = createContext();
export const pagoContext = createContext();

function Booking({ room = { nombre: "", precio: 0 }, auth = { userName: "" } }) {
  const [alerta, setAlerta] = useState({ open: false, tipo: "info", texto: "" });

  const [reservas, setReservas] = useState({
    fechaIngreso: "",
    fechaSalida: "",
    adultos: 0,
    niños: 0,
    habitacion: room.nombre || "A disponibilidad",
  });

  const [contacto, setContacto] = useState({ nombre: "", apellido: "", correo: "", telefono: "" });
  
  const [pago, setPago] = useState({ titular: "", tarjeta: 0, fechaVencimiento: "", cvv: 0 });

  const guardarInfo = async () => {
    const updatedDatosReserva = {
      identificador: auth.userName,
      reservas,
      contacto,
      pago,
      precio: room.precio,
    };

    try {
      const result = await axios.post("https://hotel-back-vgip.onrender.com/api/createreserva", updatedDatosReserva);
      console.log(result);
      setAlerta({ open: true, tipo: "success", texto: "Reserva realizada!" });
    } catch (error) {
      console.error("Error en la solicitud POST:", error.message);
      setAlerta({ open: true, tipo: "warning", texto: "Error al realizar la reserva" });
    }
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if(activeStep === steps.length - 1){
      guardarInfo();
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4, pt: 20 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">Reserva</Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Typography variant="h5" gutterBottom>Muchas gracias por su Orden.</Typography>
        ) : (
          <Fragment>
            {activeStep === 0 && <reservaContext.Provider value={{ reservas, setReservas }}><BookingForm /></reservaContext.Provider>}
            {activeStep === 1 && <userContext.Provider value={{ contacto, setContacto }}><AddressForm /></userContext.Provider>}
            {activeStep === 2 && <pagoContext.Provider value={{ pago, setPago }}><PaymentForm /></pagoContext.Provider>}
            {activeStep === 3 && <InvoiceForm />}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {activeStep !== 0 && <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>Atras</Button>}
              <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>{activeStep === steps.length - 1 ? 'Place order' : 'Siguiente'}</Button>
            </Box>
          </Fragment>
        )}
      </Paper>
    </Container>
  );
}

export default Booking;
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

import axios from "../config/axios";
import Alert from "../Components/Alert";
import PaymentForm from "../Components/PaymentForm";
import AddressForm from "../Components/AdressForm";
import InvoiceForm from "../Components/InvoiceForm";
import BookingForm from "../Components/BookingForm";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

const steps = ['Datos de reserva', 'Datos De Contacto', 'Detalles De Pago', 'Confirmación'];
export const reservaContext = createContext();
export const userContext = createContext();
export const pagoContext = createContext();

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { room, user } = location.state || {};
  const [alerta, setAlerta] = useState({ open: false, tipo: "info", texto: "" });
  const [activeStep, setActiveStep] = useState(0);
  if (room?.precio <= 0 || !room?.precio) {
    navigate("/bed-rooms");
  }

  const [reserva, setReserva] = useState({

    habitacion: {
      id: room?._id || "",
      nombre: room?.nombre || "",
      precio: room?.precio || 0
    },
    fechas: {
      ingreso: null,
      salida: null,
      noches: 0
    },
    huespedes: {
      adultos: 1,
      niños: 0
    },
    contacto: {
      nombre: "",
      apellido: "",
      email: "",
      telefono: ""
    },
    pago: {
      metodo: "tarjeta",
      aceptoTerminos: false,
      detalles: {
        titular: "",
        numero: "",
        fechaVencimiento: "",
        cvv: ""
      },
      monto: room?.precio
    }
  });

  const calcularEstadia = (ingreso, salida) => {
    if (!ingreso || !salida) return 0;
    const diff = salida - ingreso;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const actualizarFechas = (ingreso, salida) => {
    const noches = calcularEstadia(ingreso, salida);
    const montoTotal = noches * reserva.habitacion.precio;

    setReserva(prev => ({
      ...prev,
      fechas: {
        ingreso,
        salida,
        noches
      },
      pago: {
        ...prev.pago,
        monto: montoTotal
      }
    }));
  };

  const [contacto, setContacto] = useState({ nombre: "", apellido: "", correo: "", telefono: "" });

  const [pago, setPago] = useState({ titular: "", tarjeta: 0, fechaVencimiento: "", cvv: 0 });

  const guardarReserva = async () => {
    try {
      // Validación básica
      if (!reserva.fechas.ingreso || !reserva.fechas.salida) {
        setAlerta({ open: true, tipo: "error", texto: "Debe seleccionar fechas de ingreso y salida" });
        return;
      }

      if (reserva.fechas.noches <= 0) {
        setAlerta({ open: true, tipo: "error", texto: "La fecha de salida debe ser posterior a la de ingreso" });
        return;
      }

      const reservaCompleta = {
        ...reserva,
        usuarioId: user.id,
        identificador: `RES-${Date.now()}`,
        estado: "pendiente"
      };
      console.log("📤 Enviando reserva al backend:", JSON.stringify(reservaCompleta, null, 2));

      const response = await axios.post(
        '/createreserva',
        reservaCompleta,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      console.log("✅ Respuesta del backend:", response.data);
      setAlerta({ open: true, tipo: "success", texto: "Reserva realizada con éxito!" });
      setActiveStep(activeStep + 1);

    } catch (error) {
      console.error("❌ Error al crear reserva:", error);

      const mensajeError =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Error desconocido al realizar la reserva";

      console.warn("🔎 Respuesta de error del backend:", error.response?.data);

      setAlerta({
        open: true,
        tipo: "error",
        texto: mensajeError,
      });
    }
  };




  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      guardarReserva();
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4, pt: 20 }}>
      <Alert
        open={alerta.open}
        tipo={alerta.tipo}
        texto={alerta.texto}
        onClose={() => setAlerta({ ...alerta, open: false })}
      />

      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Reserva - {room?.nombre}
        </Typography>

        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <Box textAlign="center">
            <Typography variant="h5" gutterBottom>
              ¡Reserva confirmada!
            </Typography>
            <Typography>
              Hemos enviado los detalles a tu correo electrónico.
            </Typography>
          </Box>
        ) : (
          <>
            <reservaContext.Provider value={{ reserva, setReserva, actualizarFechas }}>
              {activeStep === 0 && <BookingForm />}
            </reservaContext.Provider>

            <userContext.Provider value={{
              contacto: reserva.contacto,
              setContacto: (newContacto) => setReserva(prev => ({
                ...prev,
                contacto: newContacto
              }))
            }}>
              {activeStep === 1 && <AddressForm />}
            </userContext.Provider>

            <pagoContext.Provider value={{ reserva, setReserva }}>
              {activeStep === 2 && <PaymentForm />}
            </pagoContext.Provider>

            {activeStep === 3 && (
              <InvoiceForm
                habitacion={reserva.habitacion}
                fechas={reserva.fechas}
                huespedes={reserva.huespedes}
                total={reserva.pago.monto}
              />
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Atrás
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  (activeStep === 1 && (!reserva.contacto.nombre || !reserva.contacto.email)) ||
                  (activeStep === 2 && (
                    (reserva.pago.metodo === "tarjeta" &&
                      (!reserva.pago.detalles.titular || !reserva.pago.detalles.numero)) ||
                    !reserva.pago.aceptoTerminos
                  ))
                }
              >
                {activeStep === steps.length - 1 ? 'Confirmar Reserva' : 'Siguiente'}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Booking;
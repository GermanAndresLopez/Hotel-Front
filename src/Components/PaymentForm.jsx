import React, { useState, Fragment, useContext } from "react";
import {
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
  Alert,
  AlertTitle
} from '@mui/material';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import { pagoContext } from "../Pages/Booking";

export default function PaymentForm() {

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { reserva, setReserva } = useContext(pagoContext);
  const metodoPago = reserva.pago.metodo;

  //const [aceptoTerminos, setAceptoTerminos] = useState(false);

  // Para capturar la informacion del usuario
  const handleChangePago = (e) => {
    const { name, value } = e.target;
    setReserva(prev => ({
      ...prev,
      pago: {
        ...prev.pago,
        detalles: {
          ...prev.pago.detalles,
          [name]: value
        }
      }
    }));
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Método de Pago
      </Typography>

      <Grid container spacing={3}>
        {/* Selección de método de pago */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Método de pago *</InputLabel>
            <Select
              value={reserva.pago.metodo}
              onChange={(e) =>
                setReserva(prev => ({
                  ...prev,
                  pago: {
                    ...prev.pago,
                    metodo: e.target.value
                  }
                }))
              }
              label="Método de pago"
            >

              <MenuItem value="tarjeta">Tarjeta de crédito/débito</MenuItem>
              <MenuItem value="transferencia">Transferencia bancaria</MenuItem>
              <MenuItem value="efectivo">Efectivo en el hotel</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Campos específicos para tarjeta */}
        {metodoPago === "tarjeta" && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                Información de la tarjeta
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                name="titular"
                label="Nombre del titular"
                fullWidth
                value={reserva.pago.detalles.titular || ""}
                onChange={handleChangePago}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                name="numero"
                label="Número de tarjeta"
                fullWidth
                type="number"
                value={reserva.pago.detalles.numero || ""}
                onChange={handleChangePago}
                inputProps={{
                  maxLength: 16
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de vencimiento"
                  views={['month', 'year']}
                  minDate={dayjs()}
                  value={reserva.pago.detalles.fechaVencimiento ? dayjs(reserva.pago.detalles.fechaVencimiento) : null}
                  onChange={(newValue) => {
                    handleChangePago({
                      target: {
                        name: "fechaVencimiento",
                        value: newValue ? newValue.toDate() : null
                      }
                    });
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true
                    },
                    // Esto soluciona el problema de los colores translúcidos
                    desktopPaper: {
                      sx: {
                        '& .MuiPickersYear-yearButton, & .MuiPickersMonth-monthButton': {
                          color: 'text.primary'
                        },
                        '& .Mui-disabled': {
                          color: 'text.disabled'
                        }
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                name="cvv"
                label="CVV"
                fullWidth
                type="number"
                value={reserva.pago.detalles.cvv || ""}
                onChange={handleChangePago}
                inputProps={{
                  maxLength: 4
                }}
              />
            </Grid>
          </>
        )}

        {/* Campos para transferencia */}
        {metodoPago === "transferencia" && (
          <Grid item xs={12}>
            <Alert severity="info" variant="filled">
              <AlertTitle>Por favor realice la transferencia a la siguiente cuenta bancaria:</AlertTitle>

              <br />
              Banco: Bancolombia
              <br />
              Cuenta: xxxxxxxxx
              <br />
              A nombre de: Hotel Luxury
              <br />
              <strong>Referencia: RES-{reserva.habitacion.id.slice(0, 5).toUpperCase()}</strong>
            </Alert>
          </Grid>
        )}

        {/* Campos para efectivo */}
        {metodoPago === "efectivo" && (
          <Grid item xs={12}>
            <Alert
              severity="warning"
              sx={{
                bgcolor: '#fff8e1', // color de fondo personalizado para mejor contraste
                '& .MuiAlert-message': {
                  color: 'black' // fuerza el color del texto dentro del mensaje
                }
              }}
            >
              <Typography sx={{ fontWeight: 'bold', color: 'black' }}>
                Deberá pagar en efectivo al momento de su llegada al hotel.
              </Typography>
              <Typography sx={{ color: 'black' }}>
                Recuerde que necesita presentar su identificación.
              </Typography>
            </Alert>
          </Grid>
        )}

        {/* Resumen de pago */}
        <Grid item xs={12}>
          <Box sx={{
            p: 2,
            border: '1px solid #ddd',
            borderRadius: 1,
            backgroundColor: '#f9f9f9',
            color: 'text.primary' // Asegurar color negro
          }}>

            <Typography variant="subtitle1" gutterBottom>
              Resumen de pago
            </Typography>
            <Typography>
              Habitación: {reserva.habitacion.nombre}
            </Typography>
            <Typography>
              Estancia: {reserva.fechas.noches} noche(s)
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Total: ${reserva.pago.monto.toLocaleString()}
            </Typography>
          </Box>
        </Grid>

        {/* Términos y condiciones */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={reserva.pago.aceptoTerminos || false}
                onChange={(e) => {
                  setReserva(prev => ({
                    ...prev,
                    pago: {
                      ...prev.pago,
                      aceptoTerminos: e.target.checked
                    }
                  }));
                }}
                required
              />
            }
            label={
              <Typography sx={{ color: 'black', fontWeight: 'bold' }}>
                Acepto los términos y condiciones de reserva *
              </Typography>
            }
          />

        </Grid>
      </Grid>
    </>
  );
}
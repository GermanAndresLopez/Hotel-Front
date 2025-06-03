import React, { Fragment, useContext } from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
  Box,
  Alert,
  AlertTitle
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { reservaContext } from "../Pages/Booking";

export default function BookingForm() {
  // Manejamos los estados de las reservas
  const { reserva, actualizarFechas,setReserva } = useContext(reservaContext);

   const fechaMinimaSalida = reserva.fechas.ingreso 
    ? dayjs(reserva.fechas.ingreso).add(1, 'day') 
    : dayjs().add(1, 'day');

  // Para capturar la informacion del usuario
 /* const handleOnChange = (evento) => {
    setReservas({ ...reservas, [evento.target.name]: evento.target.value });
  };*/

  return (
    <Fragment>
      <Container>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          Datos De Reserva
        </Typography>
        <Grid container spacing={3}>
          {/* Fecha de ingreso */}
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de Ingreso"
                minDate={dayjs()}
                value={reserva.fechas.ingreso ? dayjs(reserva.fechas.ingreso) : null}
                onChange={(newDate) => {
                  const ingreso = newDate.toDate();
                  const salida = reserva.fechas.salida && newDate.isBefore(dayjs(reserva.fechas.salida)) 
                    ? reserva.fechas.salida 
                    : null;
                  actualizarFechas(ingreso, salida);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          {/* Fecha de salida */}
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de Salida"
                minDate={fechaMinimaSalida}
                disabled={!reserva.fechas.ingreso}
                value={reserva.fechas.salida ? dayjs(reserva.fechas.salida) : null}
                onChange={(newDate) => {
                  actualizarFechas(reserva.fechas.ingreso, newDate.toDate());
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    required: true
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>

          {/* Información de estadía */}
          {reserva.fechas.noches > 0 && (
            <Grid item xs={12}>
              <Alert variant="filled" severity="info" >
                <AlertTitle>Info</AlertTitle>
                Estancia: {reserva.fechas.noches} noche(s) - Total: ${reserva.pago.monto.toLocaleString()}
              </Alert>
            </Grid>
          )}

          {/* Habitación */}
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              fullWidth
              label="Habitación"
              value={reserva.habitacion.nombre}
            />
          </Grid>

          {/* Precio por noche */}
          <Grid item xs={12} sm={6}>
            <TextField
              disabled
              fullWidth
              label="Precio por noche"
              value={`$${reserva.habitacion.precio.toLocaleString()}`}
            />
          </Grid>

          {/* Cantidad de adultos */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Adultos *</InputLabel>
              <Select
                label="Adultos"
                value={reserva.huespedes.adultos}
                onChange={(e) => {
                  setReserva(prev => ({
                    ...prev,
                    huespedes: {
                      ...prev.huespedes,
                      adultos: e.target.value
                    }
                  }));
                }}
              >
                {[1, 2, 3, 4].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num} {num === 1 ? 'adulto' : 'adultos'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Cantidad de niños */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Niños</InputLabel>
              <Select
                label="Niños"
                value={reserva.huespedes.niños}
                onChange={(e) => {
                  setReserva(prev => ({
                    ...prev,
                    huespedes: {
                      ...prev.huespedes,
                      niños: e.target.value
                    }
                  }));
                }}
              >
                {[0, 1, 2, 3].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num} {num === 1 ? 'niño' : 'niños'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

import React, { useState, Fragment, useContext } from "react";
import {Typography, 
    Grid, 
    TextField, 
    FormControlLabel, 
    Checkbox} 
    from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { pagoContext } from "../Pages/Booking";

export default function PaymentForm() {

    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    // Estados del formulario de datos de la forma de pago
    const {pago, setPago} = useContext(pagoContext);
    
    // Para capturar la informacion del usuario
    const handleOnChange = (evento) => {
      setPago({ ...pago, [evento.target.name]: evento.target.value });
    };

  return (
    <React.Fragment>
        {/*- - Titulo de metodo de pago - -*/}
      <Typography variant="h6" gutterBottom>
        Metodo De Pago
      </Typography>
      <Grid container spacing={3}>
        
        {/*- - Titular - -*/}
        <Grid item xs={12} md={6}>
        <TextField
            required
            id="cardName"
            name="titular"
            label="Titular"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={handleOnChange}
        />
        </Grid>

        {/*- - Numero de la tarjeta - -*/}
        <Grid item xs={12} md={6}>
        <TextField
            required
            id="cardNumber"
            name="tarjeta"
            label="Número de tarjeta"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleOnChange}
        />
        </Grid>

        {/*- - Fecha de vencimiento - -*/}
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
            components={[
              'DatePicker',
              'MobileDatePicker',
              'DesktopDatePicker',
              'StaticDatePicker',
            ]}
          >
            <DemoItem>
              <DatePicker
                  label="Fecha De Vencimiento"
                  name = "fechaVencimiento"
                  defaultValue={dayjs('2023-09-17')}
                  onChange={(newDate) => setPago({...pago,fechaVencimiento:newDate.toDate()})}
                />
            </DemoItem>
          </DemoContainer>
              
          </LocalizationProvider>
        </Grid>

        {/*- - CVV - -*/}
        <Grid item xs={12} md={6}>
        <TextField
            required
            id="cvv"
            label="CVV"
            name="cvv"
            helperText="Últimos tres dígitos en la tira de firma"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={handleOnChange}
        />
        </Grid>

        {/*- - Acuerdos - -*/}
        <Grid item xs={12}>
        <Typography sx={{ color: "black" }}>
            <Checkbox {...label} required />
            Estoy de acuerdo con los términos y condiciones.
        </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
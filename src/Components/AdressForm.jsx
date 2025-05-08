import React, { Fragment, useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Container } from "@mui/material";
import { userContext } from "../Pages/Booking";

export default function AddressForm() {
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - -  -- - - - -- - - - - - - -- - -

  // Llamamos el estado que controla los datos del usuario
  const { contacto, setContacto } = useContext(userContext);

  // Para capturar la informacion del usuario
  const handleOnChange = (evento) => {
    setContacto({ ...contacto, [evento.target.name]: evento.target.value });
  };

  return (
    <Fragment>
      {/*- - - - - - - - - Formulario de Cliente - - - - - - - - -*/}
      <Container>
        {/*- - Titulo de datos de contacto - -*/}
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          Datos De Contacto
        </Typography>

        <Grid container spacing={5}>
          {/*- - Nombre- -*/}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="nombre"
              label="Nombre"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={handleOnChange}
            />
          </Grid>

          {/*- - Apellido - -*/}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="apellido"
              label="Apellido"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={handleOnChange}
            />
          </Grid>

          {/*- - Correo - -*/}
          <Grid item xs={6} sm={6}>
            <TextField
              required
              id="email"
              name="correo"
              label="Correo"
              fullWidth
              variant="standard"
              onChange={handleOnChange}
            />
          </Grid>

          {/*- - Telefono - -*/}
          <Grid item xs={6} sm={6}>
            <TextField
              required
              id="phone"
              name="telefono"
              label="Telefono"
              fullWidth
              variant="standard"
              onChange={handleOnChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              sx={{ color: "black" }}
              control={
                <Checkbox color="primary" name="saveAddress" value="yes" />
              }
              label="Usar esta información para detalles de pago"
            />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

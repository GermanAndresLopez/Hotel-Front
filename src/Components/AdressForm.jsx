import React, { Fragment, useContext, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Container
} from "@mui/material";
import { userContext } from "../Pages/Booking";

export default function AddressForm() {
  //- - - - - - - - - - - - - - - - - - - - - - - - - - - -  -- - - - -- - - - - - - -- - -

  // Llamamos el estado que controla los datos del usuario
  const { contacto, setContacto } = useContext(userContext);

  // Para capturar la informacion del usuario
  const handleOnChange = (evento) => {
    const { name, value } = evento.target;
    setContacto({
      ...contacto,
      [name]: value
    });
  };

  return (
    <Fragment>
      <Container>
        <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
          Datos De Contacto
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="nombre"
              label="Nombre"
              fullWidth
              value={contacto.nombre || ""}
              onChange={handleOnChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="apellido"
              label="Apellido"
              fullWidth
              value={contacto.apellido || ""}
              onChange={handleOnChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="email"
              label="Correo electrónico"
              type="email"
              fullWidth
              value={contacto.email || ""}
              onChange={handleOnChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="telefono"
              label="Teléfono"
              fullWidth
              value={contacto.telefono || ""}
              onChange={handleOnChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Usar esta información para detalles de pago"
            />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

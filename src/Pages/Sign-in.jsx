// import fetch from "fetch";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import imagen from "../assets/images/logo.png";
import { useState } from "react";
import axios from "axios";
import "../index.css";

import { Button, Container, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";

export default function Sign_in({ cambiarEstadoAuth }) {
  const navigate = useNavigate();

  // Estado para mostrar alerta
  const [alerta, setAlerta] = useState({
    open: false,
    tipo: "info",
    texto: "",
  });

  // estados
  const [usuario, setUsuario] = useState({
    nombreUsuario: "",
    password: "",
  });

  // formulario funcion
  const manejarFormulario = async (evento) => {
    evento.preventDefault();
    try {
      const respuesta = await axios({
        method: "POST",
        url: "https://hotel-back-vgip.onrender.com/api/login",
        data: usuario,
      });

      // Alertas dependiendo de la respuesta
      if (respuesta.data.auth === false) {
        // Se cambia el estado de la alerta
        setAlerta({
          open: true,
          tipo: "error",
          texto: "Usuario o Contraseña incorrectos!",
        });
      } else {
        cambiarEstadoAuth({
          auth: respuesta.data.auth,
          userName: respuesta.data.usuario.nombreUsuario,
        }); // Cambiar el estado de "auth"
        navigate("/");
      }
    } catch (error) {
      // Se cambia el estado de la alertas
      setAlerta({
        open: true,
        tipo: "warning",
        texto: "Error al verificar los datos",
      });
    }
  };

  // capturando usuario
  const manejarCambios = (evento) => {
    setUsuario({ ...usuario, [evento.target.name]: evento.target.value });
    // console.log(evento.name, evento.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          borderRadius: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#191919",
          mt: 20,
          mb: 10,
        }}
      >
        <Box sx={{ m: 1 }}>
          <img src={imagen} alt="" />
        </Box>
        <Typography
          component="h1"
          variant="h5"
          color="secondary"
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Iniciar Sesión
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={manejarFormulario}
          sx={{ m: 2, width: "60%" }}
        >
          {/*- - Nombre de usuario - -*/}
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 1 }}>
            <AccountCircle
              sx={{
                color: "primary",
                marginRight: "1px",
                marginBottom: "0.5px",
              }}
            />
            <TextField
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "white", // Cambia el color de la línea después de hacer clic
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "white", // Cambia el color de la línea antes de hacer clic
                },
                "&:hover .MuiInput-underline": {
                  borderBottomColor: "white", // Cambia el color de la línea en hover
                },
              }}
              name="nombreUsuario"
              id="standard-basic"
              variant="standard"
              label="Nombre De Usuario"
              color="secondary"
              required
              fullWidth
              onChange={manejarCambios}
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{
                "aria-label": "nombreUsuario",
                style: { color: "white" },
              }}
            />
          </Box>

          {/*- - Contraseña - -*/}
          <Box sx={{ display: "flex", alignItems: "flex-end", mb: 1 }}>
            <LockIcon
              sx={{
                color: "primary",
                marginRight: "1px",
                marginBottom: "0.5px",
              }}
            />
            <TextField
              sx={{
                "& .MuiInput-underline:after": {
                  borderBottomColor: "white", // Cambia el color de la línea después de hacer clic
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "white", // Cambia el color de la línea antes de hacer clic
                },
                "&:hover .MuiInput-underline": {
                  borderBottomColor: "white", // Cambia el color de la línea en hover
                },
              }}
              name="password"
              size="normal"
              variant="standard"
              label="Contraseña"
              type="password"
              required
              fullWidth
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{
                "aria-label": "Contraseña",
                style: { color: "white" },
              }}
              onChange={manejarCambios}
            />
          </Box>

          {/*- - Mensaje para recuperar contraseña - -*/}
          <Box
            display="flex"
            justifyContent="flex-end"
            margin="2px"
            sx={{ mb: 1 }}
          >
            <Typography
              variant="body2"
              color="primary"
              sx={{ fontSize: "14px", cursor: "pointer" }}
            >
              <Link>¿olvidaste tu contraseña?</Link>
            </Typography>
          </Box>

          {/* Notificación de alerta */}
          <Alert alerta={alerta} setAlerta={setAlerta} />

          {/*- - Boton del formulario - -*/}
          <Box
            display="flex"
            justifyContent="center"
            sx={{ width: "100%", mb: 1 }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "12px", margin: "1px", width: "100%" }}
              type="submit"
            >
              Iniciar Sesion
            </Button>
          </Box>

          {/*- - Mensaje para ir a crear una cuenta - -*/}
          <Box display="flex" justifyContent="center" margin="2px">
            <Typography
              variant="body2"
              color="secondary"
              sx={{ fontSize: "14px", paddingRight: "1px", cursor: "pointer" }}
              onClick={() => navigate("/sign-up")}
            >
              ¿No tienes cuenta?<Link color="primary">Registrarse</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

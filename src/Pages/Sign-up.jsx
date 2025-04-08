import { useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/AlternateEmail";
import imagen from "../assets/images/logo.png";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import "../index.css";
import { Button, Container, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import api from "../config/axios";

export default function Sign_up() {
  const navigate = useNavigate();

  // Estado para mostrar alerta
  const [alerta, setAlerta] = useState({
    open: false,
    tipo: "info",
    texto: "",
  });

  const checkboxRef = useRef(null);

  // para validar el email
  const emailValidation = (email) => {
    // expresion regular para validar email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // formulario funcion
  const manejarFormulario = async (evento) => {
    evento.preventDefault();

    const data = new FormData(evento.currentTarget);

    console.log("Nombre de usuario: " + data.get("username"));
    console.log("Correo: " + data.get("email"));
    console.log("Contraseña: " + data.get("password"));
    console.log("Terminos: " + data.get("check"));

    // Condicional para saber si se escribio un nombre de usuario
    if (data.get("username") === "") {
      setAlerta({
        open: true,
        tipo: "info",
        texto: "El nombre de usuario campo es requerido",
      });
      return;
    }

    // Condicional para saber si se escribio algo en correo
    if (data.get("email") === "") {
      setAlerta({
        open: true,
        tipo: "info",
        texto: "El email campo es requerido",
      });
      return;
    }

    // Condicional para saber si se escribio una contraseña
    if (data.get("password") === "") {
      setAlerta({
        open: true,
        tipo: "info",
        texto: "La contraseña campo es requerido",
      });
      return;
    }

    // Verifica si el checkbox está marcado
    if (!checkboxRef.current.checked) {
      console.log("El checkbox está marcado");
      setAlerta({
        open: true,
        tipo: "info",
        texto: "Es requerido aceptar los terminos y condiciones",
      });
      return;
    }

    //Condicional para verifical que el email este correcto
    if (!emailValidation(data.get("email"))) {
      setAlerta({
        open: true,
        tipo: "warning",
        texto: "El email no es valido",
      });
      return;
    }

    // Capturamos la informacion en un objeto
    const usuario = {
      nombreUsuario: data.get("username"),
      correo: data.get("email"),
      password: data.get("password"),
    };

    try {
      const respuesta = await api.post("api/registrarse",usuario);
      console.log("res:", respuesta.data);

      // Se cambia el estado de la alerta
      setAlerta({
        open: true,
        tipo: "success",
        texto: "Usuario registrado!",
      });

      navigate("/sign-in");
    } catch (error) {
      // Se cambia el estado de la alerta
      setAlerta({
        open: true,
        tipo: "error",
        texto: "Usuario Registrado, Intente con otros datos.",
      });
    }
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
        {/*- - Logo de la pagina - - */}
        <Box sx={{ m: 1 }}>
          <img src={imagen} alt="" />
        </Box>

        {/*- - Titulo de registro - -*/}
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
          Registrarse
        </Typography>

        {/*- - Formulario - -*/}
        <Box
          component="form"
          noValidate
          onSubmit={manejarFormulario}
          sx={{ m: 2, width: "60%" }}
        >
          {/*- - Nombre de usuario - -*/}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
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
              name="username"
              id="standard-basic"
              variant="standard"
              label="Nombre De Usuario"
              color="secondary"
              required
              fullWidth
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
            />
          </Box>

          {/*- - Correo del usuario - -*/}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <EmailIcon
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
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              variant="standard"
              color="secondary"
              InputLabelProps={{ style: { color: "white" } }}
              inputProps={{ style: { color: "white" } }}
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
              inputProps={{ style: { color: "white" } }}
            />
          </Box>

          {/*- - Mensaje para recuperar contraseña - -*/}
          <Box sx={{ mb: 1 }}>
            <Typography
              variant="body2"
              color="secondary"
              sx={{ fontSize: "14px", cursor: "pointer" }}
            >
              <Checkbox
                {...label}
                inputRef={checkboxRef}
                required
                name="check"
                size="normal"
              />
              He leído y acepto los términos y condiciones
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
              Registrar
            </Button>
          </Box>

          {/*- - Mensaje para ir a crear una cuenta - -*/}
          <Box display="flex" justifyContent="center" margin="2px">
            <Typography
              variant="body2"
              color="secondary"
              sx={{ fontSize: "14px", paddingRight: "1px", cursor: "pointer" }}
              onClick={() => navigate("/sign-in")}
            >
              ¿Ya tienes una cuenta?<Link color="primary">Iniciar Sesion</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

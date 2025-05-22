import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  TextField,
  Checkbox,
  Button,
  Container,
  Typography,
} from '@mui/material';
import { AccountCircle, Lock, Email } from '@mui/icons-material';

import '../index.css';
import imagen from '../assets/images/logo.png';
import { useForm } from '../hooks/useForm';
import { useAuthStore } from '../hooks/auth/useAuthStore';
import { CustomAlert } from '../Components/CustomAlert';

const signUpForm = {
  username: '',
  email: '',
  password: '',
};

const formValidations = {
  username: [
    (value = '') => value.trim().length !== 0,
    'Debe ingresar el nombre de usuario',
  ],
  email: [
    (value = '') => {
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return regex.test(value);
    },
    'Debe ingresar un correo valido',
  ],
  password: [
    (value = '') => value.trim().length !== 0,
    'Debe ingresar la contraseña',
  ],
};

export default function SignUp() {
  const [openAlert, setOpenAlert] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { startSignUp, errorMessage } = useAuthStore();
  const {
    email,
    emailValid,
    isFormPosted,
    isFormValid,
    onInputChange,
    password,
    passwordValid,
    setIsFormPosted,
    username,
    usernameValid,
  } = useForm(signUpForm, formValidations);

  // formulario funcion
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsFormPosted(true);
    if (!isFormValid || !isChecked) return;

    await startSignUp(username, email, password);
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          borderRadius: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#191919',
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
            fontFamily: 'monospace',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Registrarse
        </Typography>

        {/*- - Formulario - -*/}
        <form noValidate onSubmit={handleSubmit} sx={{ m: 2, width: '60%' }}>
          {/*- - Nombre de usuario - -*/}
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle
              sx={{
                color: 'primary',
                marginRight: '1px',
                marginBottom: '0.5px',
              }}
            />
            <TextField
              sx={{
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white', // Cambia el color de la línea después de hacer clic
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white', // Cambia el color de la línea antes de hacer clic
                },
                '&:hover .MuiInput-underline': {
                  borderBottomColor: 'white', // Cambia el color de la línea en hover
                },
              }}
              name="username"
              variant="standard"
              label="Nombre De Usuario"
              color="secondary"
              value={username}
              fullWidth
              error={!!usernameValid && isFormPosted}
              helperText={isFormPosted && usernameValid}
              onChange={onInputChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{
                'aria-label': 'nombreUsuario',
                style: { color: 'white' },
              }}
            />
          </Box>

          {/*- - Correo del usuario - -*/}
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Email
              sx={{
                color: 'primary',
                marginRight: '1px',
                marginBottom: '0.5px',
              }}
            />
            <TextField
              sx={{
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white', // Cambia el color de la línea después de hacer clic
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white', // Cambia el color de la línea antes de hacer clic
                },
                '&:hover .MuiInput-underline': {
                  borderBottomColor: 'white', // Cambia el color de la línea en hover
                },
              }}
              name="email"
              variant="standard"
              label="Email"
              color="secondary"
              value={email}
              fullWidth
              error={!!emailValid && isFormPosted}
              helperText={isFormPosted && emailValid}
              onChange={onInputChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{
                'aria-label': 'nombreUsuario',
                style: { color: 'white' },
              }}
            />
          </Box>

          {/*- - Contraseña - -*/}
          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
            <Lock
              sx={{
                color: 'primary',
                marginRight: '1px',
                marginBottom: '0.5px',
              }}
            />
            <TextField
              sx={{
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white', // Cambia el color de la línea después de hacer clic
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'white', // Cambia el color de la línea antes de hacer clic
                },
                '&:hover .MuiInput-underline': {
                  borderBottomColor: 'white', // Cambia el color de la línea en hover
                },
              }}
              name="password"
              variant="standard"
              label="Contraseña"
              color="secondary"
              value={password}
              fullWidth
              error={!!passwordValid && isFormPosted}
              helperText={isFormPosted && passwordValid}
              onChange={onInputChange}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{
                'aria-label': 'nombreUsuario',
                style: { color: 'white' },
              }}
            />
          </Box>

          {/*- - Terminos y condiciones - -*/}
          <Box sx={{ mb: 1 }}>
            <Typography
              variant="body2"
              color="secondary"
              sx={{ fontSize: '14px', cursor: 'pointer' }}
            >
              <Checkbox
                required
                name="terms"
                size="large"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              He leído y acepto los términos y condiciones
            </Typography>
          </Box>

          {/* Notificación de alerta */}
          <CustomAlert
            open={openAlert}
            message={errorMessage}
            onClose={handleClose}
          />

          {/*- - Boton del formulario - -*/}
          <Box
            display="flex"
            justifyContent="center"
            sx={{ width: '100%', mb: 1 }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: '12px', margin: '1px', width: '100%' }}
              type="submit"
            >
              Registrar
            </Button>
          </Box>

          {/*- - Mensaje para ir a crear una cuenta - -*/}
          <Box display="flex" justifyContent="center" margin="2px">
            <Typography variant="body2" color="secondary" marginRight="4px">
              ¿Ya tienes cuenta?
            </Typography>
            <Link to="/sign-in">
              <Typography variant="body2" color="primary">
                Iniciar sesión
              </Typography>
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

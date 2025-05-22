import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

import '../index.css';
import imagen from '../assets/images/logo.png';
import { useAuthStore } from '../hooks/auth/useAuthStore';
import { useForm } from '../hooks/useForm';
import { CustomAlert } from '../Components/CustomAlert';

const signInForm = {
  username: '',
  password: '',
};

const formValidations = {
  username: [
    (value = '') => value.trim().length !== 0,
    'Debe ingresar el nombre de usuario',
  ],
  password: [
    (value = '') => value.trim().length !== 0,
    'Debe ingresar la contraseña',
  ],
};

export default function SignIn() {
  const [openAlert, setOpenAlert] = useState(false);
  const { errorMessage, startSignIn } = useAuthStore();
  const {
    isFormPosted,
    isFormValid,
    onInputChange,
    password,
    passwordValid,
    setIsFormPosted,
    username,
    usernameValid,
  } = useForm(signInForm, formValidations);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsFormPosted(true);
    if (!isFormValid) return;

    await startSignIn(username, password);
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
        <img src={imagen} alt="" />
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
          Iniciar Sesión
        </Typography>

        <form
          noValidate
          onSubmit={handleSubmit}
          style={{ margin: '30px', width: '60%' }}
        >
          {/*- - Nombre de usuario - -*/}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <AccountCircle
              sx={{
                color: 'primary',
                margin: '10px 0.5px 0 0',
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
              id="standard-basic"
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

          {/*- - Contraseña - -*/}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
              size="normal"
              variant="standard"
              label="Contraseña"
              type="password"
              value={password}
              fullWidth
              error={!!passwordValid && isFormPosted}
              helperText={isFormPosted && passwordValid}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{
                'aria-label': 'Contraseña',
                style: { color: 'white' },
              }}
              onChange={onInputChange}
            />
          </Box>

          {/*- - Mensaje para recuperar contraseña - -*/}
          <Box
            display="flex"
            justifyContent="flex-end"
            margin="2px"
            sx={{ mb: 1 }}
          >
            <Link to="/ForgotPassword">
              <Typography
                variant="body2"
                color="primary"
                sx={{ fontSize: '14px', cursor: 'pointer' }}
              >
                ¿Olvidaste tu contraseña?
              </Typography>
            </Link>
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
              Iniciar Sesion
            </Button>
          </Box>

          {/*- - Mensaje para ir a crear una cuenta - -*/}
          <Box display="flex" justifyContent="center" margin="2px">
            <Typography variant="body2" color="secondary" marginRight="4px">
              ¿No tienes cuenta?
            </Typography>
            <Link to="/sign-up">
              <Typography variant="body2" color="primary">
                Registrate
              </Typography>
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

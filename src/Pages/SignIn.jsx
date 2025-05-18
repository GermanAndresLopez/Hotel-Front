import { Link } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

import '../index.css';
import imagen from '../assets/images/logo.png';
import Alert from '../Components/Alert';
import { useSignIn } from '../hooks/auth/useSignIn';

export default function SignIn() {
  const {
    alerta,
    setAlerta,
    handleSubmit,
    isFormSubmitted,
    nombreUsuario,
    nombreUsuarioValid,
    onInputChange,
    password,
    passwordValid,
  } = useSignIn();

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
              name="nombreUsuario"
              id="standard-basic"
              variant="standard"
              label="Nombre De Usuario"
              color="secondary"
              value={nombreUsuario}
              fullWidth
              error={!!nombreUsuarioValid && isFormSubmitted}
              helperText={isFormSubmitted && nombreUsuarioValid}
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
            <LockIcon
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
              error={!!passwordValid && isFormSubmitted}
              helperText={isFormSubmitted && passwordValid}
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
            <Link>
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
          <Alert alerta={alerta} setAlerta={setAlerta} />

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
            <Typography
              variant="body2"
              color="secondary"
              sx={{ fontSize: '14px', paddingRight: '1px', cursor: 'pointer' }}
            >
              ¿No tienes cuenta?{' '}
              <Link to="/sign-up" style={{ color: '#580EF6' }}>
                Registrarse
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

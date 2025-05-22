import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import Alert from '../Components/Alert';
import api from '../config/axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({
    open: false,
    tipo: 'info',
    texto: '',
  });

  const validarCorreo = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setAlerta({
        open: true,
        tipo: 'warning',
        texto: 'El campo de correo no puede estar vacío.',
      });
      return;
    }

    if (email.length < 6) {
      setAlerta({
        open: true,
        tipo: 'warning',
        texto: 'El correo debe tener al menos 6 caracteres.',
      });
      return;
    }

    if (!validarCorreo(email)) {
      setAlerta({
        open: true,
        tipo: 'warning',
        texto: 'Por favor, ingresa un correo válido.',
      });
      return;
    }

    try {
      await api.get(`/solicitar-recuperacion?correo=${email}`);
      setAlerta({
        open: true,
        tipo: 'success',
        texto:
          'Se ha enviado un enlace de recuperación,porfavor revise su correo electronico.',
      });
    } catch (error) {
      setAlerta({
        open: true,
        tipo: 'warning',
        texto: 'Error al procesar la solicitud.',
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ backgroundColor: '#191919', mt: 20, p: 4, borderRadius: '30px' }}
      >
        <Typography variant="h5" color="secondary" align="center" gutterBottom>
          Recuperar Contraseña
        </Typography>

        <Alert alerta={alerta} setAlerta={setAlerta} />

        <form onSubmit={handleSubmit}>
          <TextField
            label="Correo electrónico"
            variant="standard"
            fullWidth
            required
            sx={{
              mb: 2,
              input: { color: 'white' },
              '& .MuiInputLabel-root': { color: 'white' },
              '& .MuiInput-underline:before': { borderBottomColor: 'white' },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button fullWidth variant="contained" color="primary" type="submit">
            Restablecer Contraseña
          </Button>
        </form>
      </Box>
    </Container>
  );
}

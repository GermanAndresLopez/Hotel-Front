import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../config/axios';
import { Container, Box, TextField, Typography, Button } from '@mui/material';

function ResetPassword() {
  const { token } = useParams();
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (nuevaPassword !== confirmarPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await api.post(`/reset-password/${token}`, {
        nuevaPassword,
      });
      setMensaje(response.data.message || 'Contraseña restablecida con éxito.');
      setTimeout(() => navigate('/sign-in'), 3000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Error al restablecer contraseña.';
      setError('Error: ' + msg);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor: '#191919',
          padding: 4,
          mt: 10,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" color="secondary" gutterBottom>
          Restablecer Contraseña
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Nueva contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={nuevaPassword}
            onChange={(e) => setNuevaPassword(e.target.value)}
            required
            InputLabelProps={{ style: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
            sx={{
              '& .MuiInput-underline:before': { borderBottomColor: 'white' },
              '& .MuiInput-underline:after': { borderBottomColor: 'white' },
            }}
          />

          <TextField
            label="Confirmar contraseña"
            type="password"
            fullWidth
            margin="normal"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            required
            InputLabelProps={{ style: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
            sx={{
              '& .MuiInput-underline:before': { borderBottomColor: 'white' },
              '& .MuiInput-underline:after': { borderBottomColor: 'white' },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, borderRadius: 2 }}
          >
            Guardar nueva contraseña
          </Button>

          {mensaje && (
            <Typography color="green" sx={{ mt: 2 }}>
              {mensaje}
            </Typography>
          )}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
}

export default ResetPassword;

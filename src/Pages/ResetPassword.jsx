import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../config/axios'; 

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
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await api.post(`api/reset-password/${token}`, { nuevaPassword });
      setMensaje(response.data.message || "Contraseña restablecida con éxito.");
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || "Error al restablecer contraseña.";
      setError("Error: " + msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Restablecer Contraseña</h2>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={nuevaPassword}
        onChange={(e) => setNuevaPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmarPassword}
        onChange={(e) => setConfirmarPassword(e.target.value)}
        required
      />
      <button type="submit">Guardar nueva contraseña</button>

      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default ResetPassword;
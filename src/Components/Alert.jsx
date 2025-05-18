import React from 'react';
import { Alert, Snackbar } from '@mui/material';

export default function Alerta({ alerta, setAlerta }) {
  return (
    <>
      <Snackbar
        open={alerta.open}
        autoHideDuration={2000}
        onClose={() => setAlerta({ open: false, tipo: alerta.tipo, texto: '' })}
      >
        <Alert variant="filled" severity={alerta.tipo}>
          {alerta.texto}
        </Alert>
      </Snackbar>
    </>
  );
}

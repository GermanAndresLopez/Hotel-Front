import React from 'react';
import { Alert, Snackbar } from '@mui/material';


export default function Alerta({ open, tipo, texto, onClose }) {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={onClose}
      >
        <Alert variant="filled" severity={tipo}>
          {texto}
        </Alert>
      </Snackbar>
    </>
  );
}

import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

export default function CustomAlert({
  open = false,
  severity,
  children,
  onClose,
}) {
  const [isOpen, setIsOpen] = useState(open);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
        <Alert variant="filled" severity={severity}>
          {children}
        </Alert>
      </Snackbar>
    </>
  );
}

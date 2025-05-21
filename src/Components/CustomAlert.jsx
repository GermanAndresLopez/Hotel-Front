import { Alert, Snackbar } from '@mui/material';

export const CustomAlert = ({
  open = false,
  message = '',
  severity = 'error',
  onClose = () => {},
}) => {
  return (
    <>
      <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
        <Alert variant="filled" severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

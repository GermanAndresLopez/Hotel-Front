import { CircularProgress } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

export const Loader = () => {
  return (
    <Grid2
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', padding: 4 }}
    >
      <Grid2 container direction="row" justifyContent="center">
        <CircularProgress color="secondary" />
      </Grid2>
    </Grid2>
  );
};

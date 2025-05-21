import React from 'react';
import { Container, Skeleton, Stack } from '@mui/material';

export default function Profile() {
  return (
    <div className="h-screen">
      <h1>Perfil</h1>
    </div>
    // <Container
    //   maxWidth="md"
    //   sx={{ background: '#191919', marginBottom: 5, marginTop: 10 }}
    // >
    //   {/*- - Esto esta de luejo mientras se pone algo - -*/}
    //   <Stack spacing={1} sx={{ marginBottom: 5 }}>
    //     {/* For variant="text", adjust the height via font-size */}
    //     <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    //     {/* For other variants, adjust the size with `width` and `height` */}
    //     <Skeleton variant="circular" width={100} height={100} />
    //     <Skeleton variant="rectangular" width={410} height={200} />
    //     <Skeleton variant="rounded" width={410} height={200} />
    //   </Stack>
    // </Container>
  );
}

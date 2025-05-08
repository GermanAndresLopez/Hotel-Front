import React from "react";
import imagen from "../assets/images/hotel_s.png";
import { Box, Container, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";

// Estilo de la imagen de la habitacion
const Img = styled("img")({
  width: 550,
  height: 400,
  objectFit: "cover",
  objectPosition: "center",
  borderRadius:"5%"
})

export default function Home() {
  return (
    <Box sx={{marginTop: 15,
      marginBottom: 6}}>
      <Container maxWidth="xl">
        <Grid container spacing={3} >
          {/*- - Bienvenida- -*/}
          <Grid item sm={12} md={6} sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center", // Centra verticalmente
                flexDirection: "column"
              }}>
            <Box maxWidth="sm" sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column"
              }}>
              <Typography component="h1" sx={{fontSize: 50, 
                  
                  textAlign: "center",
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color:"blue",
                  margin:5,
                  textDecoration: 'none'}}>
                Bienvenido
              </Typography>
              <Typography component={"p"}>
              Descubre un refugio de comodidad y aventura en el Hotel Los Misioneros. 
              Sumérgete en la belleza natural de nuestros destinos, donde la hospitalidad 
              y el lujo se encuentran para crear experiencias inolvidables.<br /><br />
              Sumérgete en la serenidad de nuestros destinos, donde el canto de las aves y el susurro del viento entre los árboles te acompañan en cada paso.
              <br />
              Disfruta de instalaciones modernas, gastronomía local e internacional, y actividades pensadas para todos los gustos. 
              <br />Desde caminatas ecológicas y paseos en bicicleta, hasta momentos de relajación en nuestras zonas de spa.<br /><br /> 
Aquí, la hospitalidad se combina con el lujo para crear recuerdos que durarán toda la vida.<br />
<br /><strong> ¡TU PROXIMA AVENTURA COMIENZA AQUI!</strong>
              </Typography>
            </Box>
          </Grid>
          {/* imagen main */}
          <Grid item sm={12} md={6}>
            <Box sx={{display:"flex", justifyContent:"center"}}>
              <Img src={imagen} alt='' />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

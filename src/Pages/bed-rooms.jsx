import React, { useState } from "react";
import { Box, Container, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const habitaciones = [
  {
    id: 1,
    nombre: "Suite Presidencial",
    descripcion: "Una suite lujosa con vista al mar.",
    capacidad: 4,
    precio: 350000,
    imagen: "https://tse4.mm.bing.net/th?id=OIP.nfepFd1KATgmLo93pip8yQHaFj&pid=Api",
  },
  {
    id: 2,
    nombre: "Habitación Deluxe",
    descripcion: "Una habitación cómoda con todas las comodidades.",
    capacidad: 2,
    precio: 250000,
    imagen: "https://tse2.mm.bing.net/th?id=OIP.7a6k3sHqNy5t24LAAdS3ZQHaE8&pid=Api",
  },
  {
    id: 3,
    nombre: "Habitación Doble",
    descripcion: "Perfecta para amigos o parejas que viajan juntos.",
    capacidad: 2,
    precio: 150000,
    imagen: "https://tse2.mm.bing.net/th?id=OIP.iDNphjE7qtyrltkV2L36GwHaE8&pid=Api",
  }
];

export default function Habitaciones() {
  const navigate = useNavigate();
  const [auth] = useState(true); // Simulación de autenticación

  const handleReservar = (habitacion) => {
    if (!auth) {
      alert("Inicie sesión para poder reservar.");
      return;
    }
    alert(`Has reservado: ${habitacion.nombre}`);
  };

  return (
    <Box sx={{ marginTop: 15, marginBottom: 5 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          color="secondary"
          sx={{
            textAlign: "center",
            fontSize: 50,
            fontFamily: 'monospace',
            fontWeight: 700,
            textDecoration: 'none',
            marginBottom: 10,
          }}
        >
          Habitaciones
        </Typography>
        <Grid container spacing={2}>
          {habitaciones.map((habitacion) => (
            <Grid key={habitacion.id} item md={4} sm={12} sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={habitacion.imagen}
                  alt={habitacion.nombre}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" color="primary" component="div">
                    {habitacion.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {habitacion.descripcion}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Capacidad: {habitacion.capacidad} personas
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${habitacion.precio} por noche
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate(`/habitacion/${habitacion.id}`)}>Ver Detalles</Button>
                  <Button size="small" color="success" onClick={() => navigate("/Booking")}>
  Reservar
</Button>

                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

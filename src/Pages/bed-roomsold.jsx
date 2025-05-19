import { React, useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Habitacion from "../Components/CardHabitacion";
import axios from "axios";
import Alert from "../Components/Alert";

export default function Bed({ cambiarRoom, auth }) {
  // Estado para las habitaciones
  const [habitaciones, setHabitaciones] = useState([]);

  // Estado para mostrar alerta
  const [alerta, setAlerta] = useState({
    open: false,
    tipo: "info",
    texto: "",
  });

  const activarAlerta = () => {
    setAlerta({
      open: true,
      tipo: "info",
      texto: "Inicie sesion para poder reservar!",
    });
  };

  // Traemos los datos de las habitaciones de la base de datos
  useEffect(() => {
    const obtenerHabitaciones = async () => {
      const result = await axios({
        method: "GET",
        url: "https://hotel-back-vgip.onrender.com/api/Habitaciones",
      });
      setHabitaciones(result.data.habitaciones);
    };
    obtenerHabitaciones();
  }, []);

  return (
    <Box sx={{marginTop: 15,
      marginBottom: 5,}}>
      {/*- - Titulo - -*/}
      <Box sx={{alignContent:"center"}}>
        <Typography
          variant="h1"
          color="secondary"
          component="div"
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
        {/*- - Contenido - -*/}
      </Box>
      
      <Container maxWidth="lg" >
        <Grid container spacing={1}>
          {/*- - Carta de la habitacion - -*/}
          {habitaciones.map((bed, i) => (
            <Grid key={i} item md={6} sm={12} sx={{display:"flex",justifyContent:"center"}}>
                <Box sx={{margin:2}}>
                  <Habitacion
                    key={i}
                    bed={bed}
                    auth={auth}
                    activarAlerta={activarAlerta}
                    cambiarRoom={cambiarRoom}
                  />
                </Box>
            </Grid>
              
          ))}
          {/*- - Alerta - -*/}
          <Alert alerta={alerta} setAlerta={setAlerta} />
        </Grid>
      </Container>
      
    </Box>
  );
}

import { Box, Button, Card, CardActions, CardContent, CardMedia, Icon, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";
import { useNavigate } from "react-router-dom";
import imagen from "../assets/images/Habitacion-1/h-1.jpg"



// Responsive del carusel de trabajadores
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 1,
    
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// Para cargar las imagenes de las habitaciones
const habitaciones =  require.context('../assets/images',true);

// Funcion que retorna la carta de la habitacion
export default function Habitacion({ bed, auth, activarAlerta, cambiarRoom }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (auth.auth === true) {
      cambiarRoom(bed);
      navigate("/booking");
    } else {
      activarAlerta();
    }
  };


  return (
    
    <Card sx={{ bgcolor:"#191919",maxWidth:{xs:"315px", sm:"350px", md:"450px"}}}>
      <Carousel showDots={true} responsive={responsive}>
        {bed.imagen.map((i, index) => (
          
          <img className="w-full h-auto object-cover" style={{ height: "250px" }} key={index} 
            src={habitaciones(i)} alt="" />
          
        ))}
      </Carousel>
      <CardContent sx={{minHeight:266}}>
        {/*- - Nombre se la habitacion - -*/}
        <Typography gutterBottom variant="h5" component="div">
          {bed.nombre}
        </Typography>

        {/*- - Capacidad de personas - -*/}
        <Typography variant="p">
          <Icon>
            <AirlineSeatIndividualSuiteIcon />
          </Icon>{" "}
          {bed.capacidad} Personas
        </Typography>

        {/*- - Caracteristicas - -*/}
        <Typography variant="p" color="primary">
          <br/>{bed.caracteristicas.join(" - ")}
        </Typography>

        {/*- - Descripcion de la habitacion - -*/}
        <Typography variant="body2" color="secondary">
        {bed.descripcion}
        </Typography>
      </CardContent>

      
      <CardActions>
        
        {/*- - Precio - -*/}
        <Box sx={{display:"flex", flexGrow:1,color: "white" }}>
          <p>Precio: ${bed.precio} COP</p>
        </Box>

        {/*- - Boton de reservar - -*/}
        <Button sx={{display:"flex", flexGrow:0}} variant="contained" onClick={handleClick}>
          Reservar
        </Button>
      </CardActions>
    </Card>
    
    
  );
}

import { React, useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import imagen from "../assets/images/hotel_s.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../Components/Card";
import axios from "axios";

// Lista de objetos con informacion esencial del hotel
const informacion = [
  {
    nombre: "Los Misioneros",
    // eslint-disable-next-line no-multi-str
    descripcion:
    // eslint-disable-next-line no-multi-str
      "En el corazón de Valledupar, te esperamos con los brazos abiertos para brindarte una \
        experiencia única llena de confort y hospitalidad. Nuestro compromiso es hacer que cada momento de \
        tu estadía sea inolvidable, ofreciéndote un ambiente acogedor, instalaciones de calidad y un servicio \
        personalizado que superará todas tus expectativas. Ya sea que estés aquí por negocios o por placer, \
        te garantizamos una estancia placentera donde podrás relajarte, explorar la belleza de la región y \
        disfrutar de nuestras comodidades de primer nivel. En el Hotel Los Misioneros, estamos listos para \
        hacer realidad tus sueños de un viaje perfecto. ¡Te damos la bienvenida a tu nuevo hogar lejos de casa!",
  },
  {
    nombre: "Mision",
    // eslint-disable-next-line no-multi-str
    descripcion:
    // eslint-disable-next-line no-multi-str
      "Nuestra misión es brindar una experiencia de hospedaje excepcional en Valledupar - Cesar,\
         superando las expectativas de nuestros huéspedes en términos de servicio, comodidad y calidad. Nos \
         comprometemos a crear un ambiente acogedor y agradable, donde cada detalle sea cuidadosamente \
         atendido para asegurar la satisfacción total de nuestros clientes. Trabajamos en equipo con pasión \
         y dedicación, enfocados en ofrecer una estancia inolvidable que refleje nuestro compromiso con la \
         excelencia y la hospitalidad.",
  },
  {
    nombre: "Vision",
    // eslint-disable-next-line no-multi-str
    descripcion:
      // eslint-disable-next-line no-multi-str
      "Nuestra visión es convertirnos en el referente de excelencia en la industria \
        hotelera de Valledupar - Cesar, siendo reconocidos por ofrecer una experiencia única y memorable \
        a nuestros huéspedes. Nos esforzamos por ser el destino preferido para aquellos que buscan calidad, \
        comodidad y un servicio impecable. Buscamos constantemente innovar y superar los estándares \
        establecidos, creando así un legado en la hospitalidad y dejando una huella perdurable en cada \
        persona que nos visite.",
  },
];

// Responsive del carusel de trabajadores
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function About() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const obtenerEmpleados = async () => {
      const result = await axios({
        method: "GET",
        url: "https://hotel-back-vgip.onrender.com/api/empleados",
      });
      setEmpleados(result.data.empleados);
    };
    obtenerEmpleados();
  }, []);

  console.log(empleados);
  console.log(typeof empleados);
  console.log(empleados[0]);

  return (
    <Box sx={{marginTop: 15,
      marginBottom: 5}}>
      {/*- - Titulo - -*/}
      <Box>
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
          Nosotros
        </Typography>
      </Box>

      {/*- - Contenido - -*/}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/*- - Introduccion- -*/}
          <Grid item md={7} sm={12}>
            <Box sx={{ background: "#191919", padding: 5, borderRadius:'3%' }}>
              <Typography
                variant="h1"
                color="primary"
                sx={{ fontSize: 30, margin: 2, textAlign: "center",fontFamily: 'monospace',
                fontWeight: 700,
                textDecoration: 'none', }}
              >
                {informacion[0].nombre}
              </Typography>
              <Typography color="secondary" variant="p">{informacion[0].descripcion}</Typography>
              <Box sx={{justifyContent: 'center',flexGrow: 1, display: { xs: 'flex', md: 'flex' }}}>
                <img
                  className="hotel-main rounded-lg mt-10 w-4/5"
                  src={imagen}
                  alt=""
                />
              </Box>
              
            </Box>
          </Grid>

          {/*- - Recorrido para mostrar la mision y la vision - -*/}
          <Grid item container spacing={3} sm={12} md={5}>
            {informacion.slice(1).map((i) => (
              <Grid key={i.nombre} item md={12} sm={6}>
                <Box
                  sx={{
                    background: "#191919",
                    padding: 2,
                    marginBottom: 2,
                    borderRadius:'3%'
                  }}
                >
                  <Typography
                    variant="h1"
                    color="primary"
                    sx={{ fontSize: 30, margin: 2,fontFamily: 'monospace',
                    fontWeight: 700,
                    textDecoration: 'none' }}
                  >
                    {i.nombre}
                  </Typography>
                  <Typography variant="p">{i.descripcion}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
          

          {/*- - Carrusel de trabajadores - -*/}
          <Grid item xs={12}>
            <Box sx={{ padding: 5, marginBottom: 3 }}>
              <Typography
                variant="h1"
                color="primary"
                sx={{ fontSize: 30, margin: 2, textAlign: "center",fontFamily: 'monospace',
                fontWeight: 700,
                textDecoration: 'none'}}
              >
               
              </Typography>
              <Carousel showDots={false} responsive={responsive}>
                {empleados.map((info, i) => (
                  <Box key={i} sx={{ margin: 2 }}>
                    <Card datos={info} />
                  </Box>
                ))}
              </Carousel>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

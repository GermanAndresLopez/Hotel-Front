import React from 'react'
import {Box, Container, Grid, Typography} from "@mui/material";
import imagen from "../assets/images/mapa.jpg";
import styled from "@emotion/styled";


// Estilo de la imagen de la habitacion
const Img = styled("img")({
    width: 400,
    height: 250,
    objectFit: "cover",
    objectPosition: "center",
    borderRadius:"3%"
})

const Contact = () => {
    return (
        <Box sx={{marginTop: 15,
            marginBottom: 5,}}>
            {/*- - Titulo - -*/}
            <Box>
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
                Contacto
                </Typography>
            </Box>
            {/*- - Contenido- -*/}
            <Container 
                maxWidth="md"
                
            >
                <Grid container spacing={3} >
                    {/*- - Introduccion- -*/}
                    <Grid item sm={12} md={6}>
                        <Box sx={{ background: "#191919", padding: 5, borderRadius:"3%"}}>
                            <Typography variant='h1' color= "primary" sx={{fontSize: 30,
                                margin: 2,
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                textDecoration: 'none'}}>
                                Información de contacto
                            </Typography>
                            <Typography variant='ul'>
                                Teléfonos Fijos:<br/>+57 (5) 8576694 <br/>+57 (5) 8769453<br/><br/>
                                Celulares:<br/>- 3025068293 <br/>- 3045968342 <br/>- 3205869345<br/><br/>
                                E-mail:<br/>admin@losmisiones.com
                            </Typography>
                        </Box>
                    </Grid>
                    
                    {/*- - Ubicacion - -*/}
                    <Grid item sm={12} md={6}>
                        <Box sx={{ background: "#191919", padding: 5, borderRadius:"3%"}}>
                            <Typography variant='h1' color= "primary" sx={{fontSize: 30, margin: 2, 
                                textAlign: 'center',
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                textDecoration: 'none',}}>
                                Ubicacion
                            </Typography>
                            <Typography variant='p' sx={{marginBottom: 10}}>
                                Direccion: <br/>Transversal 20 #10-20
                            </Typography>
                            <Img src={imagen} alt=''/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Contact
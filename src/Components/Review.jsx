import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { useState, useEffect } from "react";

export default function Review() {

    // Datos del cliente
    const [cliente, setCliente] = useState({
        Nombre: "Marcos",
        Apellido: "Perez",
        Correo: "Marcos054@gmail.com",
        Telefono: "30495864",
    })

    // Datos de la tarjeta
    const [tarjeta, setTarjeta] = useState({
        
        Titular: "Marcos Perez",
        Numero: "4066-7485-9284-5500",
        Fecha: "04/2025",
        CVV: "775"
        
    })

    // Datos de la reserva
    const [reserva, setReserva] = useState({
        fechaIngreso: "11/06/2023",
        fechaSalida: "15/06/2023",
        cantidadAdultos: 2,
        cantidadNinos: 1,
        habitacion: "Suite Exclusiva con Jacuzzi",
        totalPagar: "400.000"
    })

    const titulosReserva =["Fecha De Ingreso:", "Fecha De Salida:", "Adultos:", "Niños:", "Habitacion:"]
    const cant = [0,1,2,3,4]

  return (
    <React.Fragment>
        <Container>

            {/*- - Informacion de reserva - -*/}
            <Typography variant="h6" gutterBottom sx={{color: "black"}}>
                Resumen De Reserva
            </Typography>
            <List disablePadding>
                
                {cant.map((i) => (
                    <ListItem key={i} sx={{ py: 1, px: 0 }}>
                        <ListItemText sx={{color: "black"}} primary={titulosReserva[i]} secondary={Object.values(reserva)[i]} />
                        
                    </ListItem>
                ))}
                
                <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText sx={{color: "black"}} primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "black" }}>
                    ${reserva.totalPagar}
                </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>

                {/*- - Informacion de contacto - -*/}
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2, color: "black" }}>
                        Contacto
                    </Typography>

                    {Object.entries(cliente).map(([clave, valor]) => (
                        <Typography key={clave} gutterBottom sx={{color: "black"}}>{clave} : {valor}</Typography>
                    ))}

                </Grid>

                {/*- - Detalles de pago - -*/}
                <Grid item  xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2, color: "black" }}>
                        Detalles De Pago
                    </Typography>
                    
                    {Object.entries(tarjeta).map(([clave, valor]) => (
                        <Typography key={clave} gutterBottom sx={{color: "black"}}>{clave} : {valor}</Typography>
                    ))}
                </Grid>

            </Grid>
        </Container>
    </React.Fragment>
  );
}
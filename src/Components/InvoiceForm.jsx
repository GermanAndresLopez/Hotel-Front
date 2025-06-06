import * as React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
  Box
} from "@mui/material";

const products = [
  {
    name: 'Habitacion',
    desc: 'Cargo Reserva en linea',
    price: '10.000',
  },
  {
    name: 'Servicio al cuarto',
    desc: 'Costo de servicio',
    price: '20.000',
  },
  
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = [];
const payments = [];

export default function InvoiceForm({ habitacion, fechas, huespedes, total }) {
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
        Resumen de su reserva
      </Typography>

      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="Habitación"
            secondary={habitacion.nombre}
            primaryTypographyProps={{ sx: { color: 'text.primary', fontWeight: 'bold' } }}
            secondaryTypographyProps={{ sx: { color: 'text.primary' } }}
          />
          <Typography sx={{ color: 'text.primary' }}>
            ${habitacion.precio.toLocaleString()} x {fechas.noches} noches
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="Huéspedes"
            primaryTypographyProps={{ sx: { color: 'text.primary', fontWeight: 'bold' } }}
          />
          <Typography sx={{ color: 'text.primary' }}>
            {huespedes.adultos} adulto{huespedes.adultos > 1 ? 's' : ''}
            {huespedes.niños > 0 && `, ${huespedes.niños} niño${huespedes.niños > 1 ? 's' : ''}`}
          </Typography>
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="Fechas"
            primaryTypographyProps={{ sx: { color: 'text.primary', fontWeight: 'bold' } }}
          />
          <Typography sx={{ color: 'text.primary' }}>
            {new Date(fechas.ingreso).toLocaleDateString()} - {new Date(fechas.salida).toLocaleDateString()}
          </Typography>
        </ListItem>

        <Divider sx={{ my: 1 }} />

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="Total"
            primaryTypographyProps={{ sx: { color: 'text.primary', fontWeight: 'bold' } }}
          />
          <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary' }}>
            ${total.toLocaleString()}
          </Typography>
        </ListItem>
      </List>

      <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          Su reserva está casi lista. Al hacer clic en "Confirmar Reserva", acepta nuestras políticas de cancelación.
        </Typography>
      </Box>
    </>
  );
}

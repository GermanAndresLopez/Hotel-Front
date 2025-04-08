import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

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

export default function InvoiceForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
        Resumen de orden
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText 
              primary={product.name} 
              secondary={product.desc} 
              sx={{ color: 'primary.main' }}
            />
            <Typography variant="body2" sx={{ color: 'primary.main' }}>{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main' }}>
            $180.000
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, color: 'primary.main' }}>
            Envio
          </Typography>
          <Typography gutterBottom sx={{ color: 'primary.main' }}>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, color: 'primary.main' }}>
            Detalles de pago
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom sx={{ color: 'primary.main' }}>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom sx={{ color: 'primary.main' }}>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
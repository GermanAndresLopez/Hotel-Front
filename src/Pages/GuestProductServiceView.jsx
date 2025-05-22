import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const mockItems = [
  {
    id: 1,
    nombre: 'Kit de Aseo',
    descripcion: 'Incluye shampoo, jabón y cepillo de dientes.',
    precio: '30.000',
    categoria: 'Producto',
    imagen:
      'https://m.media-amazon.com/images/I/71K3vbBovIL._AC_UF1000,1000_QL80_.jpg',
    repetible: true,
  },
  {
    id: 2,
    nombre: 'Spa Relax',
    descripcion: 'Sesión de 1 hora de spa con aromaterapia.',
    precio: '50.000',
    categoria: 'Servicio',
    imagen: 'https://www.operarelax.com/data/1366/spa11.jpg',
    repetible: false,
  },
];

export default function GuestProductServiceView() {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [historial, setHistorial] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const handleOpen = (item) => {
    setSelectedItem(item);
    setCantidad(1);
    setFecha('');
    setHora('');
    setOpen(true);
    setMensaje('');
  };

  const handleConfirmar = () => {
    const nuevaSolicitud = {
      ...selectedItem,
      cantidad,
      fecha,
      hora,
      estado: 'Pendiente',
    };
    setHistorial([...historial, nuevaSolicitud]);
    setOpen(false);
    setMensaje('Solicitud registrada correctamente.');
  };

  return (
    <Container sx={{ mt: 10, mb: 5 }}>
      <Typography
        variant="h4"
        color="secondary"
        sx={{ fontFamily: 'monospace', mb: 4 }}
      >
        Productos y Servicios Disponibles
      </Typography>
      <Grid container spacing={4}>
        {mockItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                backgroundColor: '#191919',
                color: 'white',
                borderRadius: '16px',
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={item.imagen}
                alt={item.nombre}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" color="secondary">
                  {item.nombre}
                </Typography>
                <Typography variant="body2" color="white">
                  {item.descripcion}
                </Typography>
                <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                  Precio: ${item.precio}
                </Typography>
                <Typography variant="body2" color="primary">
                  Categoría: {item.categoria}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpen(item)}
                >
                  Solicitar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#191919',
            borderRadius: '20px',
            boxShadow: 24,
            p: 4,
            color: 'white',
          }}
        >
          <Typography
            variant="h6"
            color="secondary"
            sx={{ fontFamily: 'monospace', mb: 2 }}
          >
            Confirmar Solicitud
          </Typography>
          <Typography>{selectedItem?.nombre}</Typography>
          <Typography color="primary">${selectedItem?.precio}</Typography>
          {selectedItem?.repetible && (
            <TextField
              label="Cantidad"
              type="number"
              variant="standard"
              value={cantidad}
              fullWidth
              onChange={(e) => setCantidad(parseInt(e.target.value))}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ min: 1, style: { color: 'white' } }}
              sx={{ mt: 2 }}
            />
          )}
          {selectedItem?.categoria === 'Servicio' && (
            <>
              <TextField
                label="Fecha"
                type="date"
                variant="standard"
                fullWidth
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                InputLabelProps={{ shrink: true, style: { color: 'white' } }}
                inputProps={{ style: { color: 'white' } }}
                sx={{ mt: 2 }}
              />
              <TextField
                label="Hora"
                type="time"
                variant="standard"
                fullWidth
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                InputLabelProps={{ shrink: true, style: { color: 'white' } }}
                inputProps={{ style: { color: 'white' } }}
                sx={{ mt: 2 }}
              />
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, borderRadius: '12px' }}
            onClick={handleConfirmar}
          >
            Confirmar
          </Button>
        </Box>
      </Modal>

      {mensaje && (
        <Typography color="success.main" sx={{ mt: 4 }}>
          {mensaje}
        </Typography>
      )}

      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          color="secondary"
          sx={{ fontFamily: 'monospace', mb: 2 }}
        >
          Historial de Solicitudes
        </Typography>
        {historial.length === 0 ? (
          <Typography color="white">No hay solicitudes registradas.</Typography>
        ) : (
          historial.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                backgroundColor: '#191919',
                borderRadius: '16px',
                p: 2,
                mb: 2,
                border: '1px solid #580EF6',
                color: 'white',
              }}
            >
              <Typography variant="subtitle1" color="secondary">
                {item.nombre} - {item.estado}
              </Typography>
              <Typography variant="body2">
                {item.cantidad ? `Cantidad: ${item.cantidad}` : ''}{' '}
                {item.fecha ? `| Fecha: ${item.fecha}` : ''}{' '}
                {item.hora ? `| Hora: ${item.hora}` : ''}
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Container>
  );
}

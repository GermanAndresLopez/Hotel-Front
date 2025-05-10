import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import api from '../config/axios';

const Dashboard = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [abierto, setAbierto] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    const obtenerHabitaciones = async () => {
      const { data } = await api.get('api/habitaciones');
      setHabitaciones(data.habitaciones);
    };

    obtenerHabitaciones();
  }, []);

  const handleOpen = (room = null) => {
    setEditingRoom(
      room || {
        identificador: crypto.randomUUID(),
        nombre: '',
        imagen: '',
        descripcion: '',
        capacidad: 1,
        caracteristicas: '',
        precio: 0,
      }
    );
    setAbierto(true);
  };

  const handleClose = () => {
    setEditingRoom(null);
    setAbierto(false);
  };

  const handleSave = () => {
    if (
      !editingRoom?.nombre ||
      editingRoom.capacidad < 1 ||
      editingRoom.precio < 0
    )
      return;

    const existe = habitaciones.find((h) => h.id === editingRoom.id);
    if (existe) {
      setHabitaciones(
        habitaciones.map((h) => (h.id === editingRoom.id ? editingRoom : h))
      );
    } else {
      setHabitaciones([...habitaciones, editingRoom]);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    await api.delete(`api/habitaciones/${id}`);

    setHabitaciones(
      habitaciones.filter((habitacion) => habitacion.identificador !== id)
    );
  };

  return (
    <Box sx={{ marginTop: 12, marginBottom: 5 }}>
      <Typography
        variant="h1"
        color="secondary"
        component="div"
        sx={{
          textAlign: 'center',
          fontSize: 50,
          fontFamily: 'monospace',
          fontWeight: 700,
          textDecoration: 'none',
          marginBottom: 10,
        }}
      >
        Panel de administración
      </Typography>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
          Gestión de Habitaciones
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          Añadir Habitación
        </Button>

        <Table sx={{ mt: 2, backgroundColor: '#1e1e1e' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Nombre</TableCell>
              <TableCell sx={{ color: 'white' }}>Capacidad</TableCell>
              <TableCell sx={{ color: 'white' }}>Precio</TableCell>
              <TableCell sx={{ color: 'white' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {habitaciones.map((habitacion) => (
              <TableRow key={habitacion.identificador}>
                <TableCell sx={{ color: 'white' }}>
                  {habitacion.nombre}
                </TableCell>
                <TableCell sx={{ color: 'white' }}>
                  {habitacion.capacidad}
                </TableCell>
                <TableCell sx={{ color: 'white' }}>
                  ${habitacion.precio}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleOpen(habitacion)}
                    sx={{ color: 'white' }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(habitacion.identificador)}
                    sx={{ color: 'white' }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={abierto} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>
            {editingRoom?.id ? 'Editar Habitación' : 'Nueva Habitación'}
          </DialogTitle>
          <DialogContent
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
          >
            <TextField
              label="Nombre"
              value={editingRoom?.nombre || ''}
              onChange={(e) =>
                setEditingRoom({ ...editingRoom, nombre: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Imagen (URL)"
              value={editingRoom?.imagen || ''}
              onChange={(e) =>
                setEditingRoom({ ...editingRoom, imagen: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Descripción"
              value={editingRoom?.descripcion || ''}
              onChange={(e) =>
                setEditingRoom({ ...editingRoom, descripcion: e.target.value })
              }
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Capacidad"
              type="number"
              value={editingRoom?.capacidad || ''}
              onChange={(e) =>
                setEditingRoom({
                  ...editingRoom,
                  capacidad: parseInt(e.target.value),
                })
              }
              fullWidth
            />
            <TextField
              label="Características"
              value={editingRoom?.caracteristicas || ''}
              onChange={(e) =>
                setEditingRoom({
                  ...editingRoom,
                  caracteristicas: e.target.value,
                })
              }
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              label="Precio"
              type="number"
              value={editingRoom?.precio || ''}
              onChange={(e) =>
                setEditingRoom({
                  ...editingRoom,
                  precio: parseFloat(e.target.value),
                })
              }
              fullWidth
              InputProps={{ startAdornment: '$' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSave} variant="contained">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Dashboard;

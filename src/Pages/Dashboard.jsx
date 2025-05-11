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
import { useDashboard } from '../hooks/useDashboard';

const Dashboard = () => {
  const {
    editingRoom,
    handleClose,
    handleDelete,
    handleEditingRoom,
    handleOpen,
    handleSave,
    open,
    rooms,
  } = useDashboard();

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
            {rooms.map((habitacion) => (
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

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
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
                handleEditingRoom({ ...editingRoom, nombre: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Imagen (URL)"
              value={editingRoom?.imagen || ''}
              onChange={(e) =>
                handleEditingRoom({ ...editingRoom, imagen: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Descripción"
              value={editingRoom?.descripcion || ''}
              onChange={(e) =>
                handleEditingRoom({
                  ...editingRoom,
                  descripcion: e.target.value,
                })
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
                handleEditingRoom({
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
                handleEditingRoom({
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
                handleEditingRoom({
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

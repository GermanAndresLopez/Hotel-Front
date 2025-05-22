import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Button
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export const RoomTable = ({ rooms, handleOpen, handleDelete }) => {
  return (
    <>
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
    </>
  );
};
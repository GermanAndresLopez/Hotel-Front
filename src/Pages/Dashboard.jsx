import {
  Box,
  Button,
  Chip,
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
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Delete, Edit } from '@mui/icons-material';
import { useDashboard } from '../hooks/useDashboard';
import { Avatar } from '@mui/material';

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

  const [currentImage, setCurrentImage] = useState('');
  const [currentFeature, setCurrentFeature] = useState('');
  ///
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      handleEditingRoom({
        ...editingRoom,
        imagen: [...editingRoom.imagen, ...newImages],
      });
    },
    [editingRoom]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });
  ////

  const handleAddImage = () => {
    if (
      currentImage &&
      !editingRoom.imagen.some(
        (img) => img === currentImage || img.preview === currentImage
      ) &&
      (currentImage.startsWith('http') || currentImage.startsWith('data:image'))
    ) {
      handleEditingRoom({
        ...editingRoom,
        imagen: [...editingRoom.imagen, currentImage],
      });
      setCurrentImage('');
    } else if (currentImage) {
      console.error('La URL de la imagen no es válida');
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...editingRoom.imagen];
    if (newImages[index]?.preview) {
      URL.revokeObjectURL(newImages[index].preview);
    }
    newImages.splice(index, 1);
    handleEditingRoom({ ...editingRoom, imagen: newImages });
  };

  const handleAddFeature = () => {
    if (
      currentFeature &&
      !editingRoom.caracteristicas.includes(currentFeature)
    ) {
      handleEditingRoom({
        ...editingRoom,
        caracteristicas: [...editingRoom.caracteristicas, currentFeature],
      });
      setCurrentFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = [...editingRoom.caracteristicas];
    newFeatures.splice(index, 1);
    handleEditingRoom({ ...editingRoom, caracteristicas: newFeatures });
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
            {editingRoom?.identificador
              ? 'Editar Habitación'
              : 'Nueva Habitación'}
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

            {/* Área de Imágenes Modificada */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Imágenes
              </Typography>

              {/* Drag & Drop Area */}
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed',
                  borderColor: isDragActive ? 'primary.main' : 'grey.500',
                  borderRadius: 1,
                  p: 3,
                  textAlign: 'center',
                  mb: 2,
                  cursor: 'pointer',
                }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <Typography>Suelta las imágenes aquí...</Typography>
                ) : (
                  <Typography>
                    Arrastra y suelta imágenes aquí, o haz clic para seleccionar
                  </Typography>
                )}
              </Box>

              {/* Input para URLs de imágenes */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                  label="Añadir URL de imagen"
                  value={currentImage}
                  onChange={(e) => setCurrentImage(e.target.value)}
                  fullWidth
                />
                <Button
                  onClick={handleAddImage}
                  variant="outlined"
                  disabled={!currentImage}
                >
                  Agregar URL
                </Button>
              </Box>

              {/* Previsualización de imágenes */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {editingRoom?.imagen?.map((img, index) => (
                  <Box key={index} sx={{ position: 'relative' }}>
                    <Avatar
                      variant="rounded"
                      src={img.preview || img}
                      sx={{
                        width: 100,
                        height: 100,
                        cursor: 'pointer',
                        objectFit: 'cover', // Esto asegura que la imagen cubra todo el espacio
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        color: 'error.main',
                        backgroundColor: 'background.paper',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>

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
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Características
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  label="Nueva característica"
                  value={currentFeature}
                  onChange={(e) => setCurrentFeature(e.target.value)}
                  fullWidth
                />
                <Button onClick={handleAddFeature} variant="outlined">
                  Agregar
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {editingRoom?.caracteristicas?.map((feature, index) => (
                  <Chip
                    key={index}
                    label={feature}
                    onDelete={() => handleRemoveFeature(index)}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </Box>
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

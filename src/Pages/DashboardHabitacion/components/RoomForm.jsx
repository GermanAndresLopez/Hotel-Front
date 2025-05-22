import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  TextField,
  Typography,
  Button,
  Chip,
  IconButton,
  Avatar
} from '@mui/material';
import { Delete } from '@mui/icons-material';

export const RoomForm = ({
  editingRoom,
  handleEditingRoom,
  handleAddImage,
  handleRemoveImage,
  handleAddFeature,
  handleRemoveFeature
}) => {
  const [currentImage, setCurrentImage] = useState('');
  const [currentFeature, setCurrentFeature] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    handleEditingRoom({
      ...editingRoom,
      imagen: [...editingRoom.imagen, ...newImages]
    });
  }, [editingRoom, handleEditingRoom]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Nombre"
        value={editingRoom?.nombre || ''}
        onChange={(e) =>
          handleEditingRoom({ ...editingRoom, nombre: e.target.value })
        }
        fullWidth
      />

      {/* Área de Imágenes */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Imágenes</Typography>

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
            cursor: 'pointer'
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
            onClick={() => {
              handleAddImage(currentImage);
              setCurrentImage('');
            }}
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
                  objectFit: 'cover'
                }}
              />
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: 'error.main',
                  backgroundColor: 'background.paper'
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
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Características</Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <TextField
            label="Nueva característica"
            value={currentFeature}
            onChange={(e) => setCurrentFeature(e.target.value)}
            fullWidth
          />
          <Button onClick={() => {
            handleAddFeature(currentFeature);
            setCurrentFeature('');
          }} variant="outlined">
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
    </Box>
  );
};
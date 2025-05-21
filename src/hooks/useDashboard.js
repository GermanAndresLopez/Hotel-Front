import { useEffect, useState } from 'react';
import api from '../config/axios';

export const useDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const { data } = await api.get('api/habitaciones');
        setRooms(data.habitaciones || data); // Ajuste para diferentes formatos de respuesta
      } catch (err) {
        setError("Error al cargar habitaciones");
        console.error(err);
      }
    };
    getRooms();
  }, []);

  const handleEditingRoom = (room) => {
    setEditingRoom(room);
  };

  const handleOpen = (room = null) => {
    setEditingRoom(
      room || {
        identificador: crypto.randomUUID(),
        nombre: '',
        imagen: [],
        descripcion: '',
        capacidad: 1,
        caracteristicas: [],
        precio: 0,
      }
    );
    setOpen(true);
    setError(null);
  };

  const handleClose = () => {
    setEditingRoom(null);
    setOpen(false);
    setError(null);
  };

  const handleSave = async () => {
    if (!editingRoom?.nombre || editingRoom.capacidad < 1 || editingRoom.precio < 0) {
      setError("Nombre, capacidad y precio son requeridos");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      // Agregar campos básicos
      formData.append('identificador', editingRoom.identificador);
      formData.append('nombre', editingRoom.nombre);
      formData.append('descripcion', editingRoom.descripcion || '');
      formData.append('capacidad', editingRoom.capacidad);
      formData.append('precio', editingRoom.precio);

      // Agregar características como array JSON
      formData.append('caracteristicas', JSON.stringify(editingRoom.caracteristicas));

      // Agregar imágenes (solo archivos nuevos)
      const existingImages = [];
      editingRoom.imagen.forEach((img, i) => {
        if (img.file) {
          formData.append('imagen', img.file);
        } else {
          existingImages.push(img);
        }
      });
      formData.append('imagen', JSON.stringify(existingImages));

      // Agregar URLs de imágenes existentes (para edición)
      if (editingRoom._id) {
        const existingImages = editingRoom.imagen
          .filter(img => !img.file)
          .map(img => img.preview || img);
        formData.append('existingImages', JSON.stringify(existingImages));
      }

      // Configurar headers para autenticación
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };
      let response;
      if (editingRoom._id) {
        response = await api.put(`api/habitaciones/${editingRoom._id}`, formData, config);
      } else {
        response = await api.post('api/habitaciones', formData, config);
      }

      // Actualizar estado local con la respuesta del servidor
     const updatedRooms = editingRoom._id
      ? rooms.map(r => r._id === editingRoom._id ? response.data : r)
      : [...rooms, response.data];
    
    setRooms(updatedRooms);
    handleClose();
    } catch (err) {
      console.error("Error al guardar:", err);
      setError(err.response?.data?.message || "Error al guardar la habitación");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`api/habitaciones/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRooms(rooms.filter(habitacion => habitacion._id !== id));
    } catch (err) {
      console.error("Error al eliminar:", err);
      setError("Error al eliminar la habitación");
    }
  };

  return {
    editingRoom,
    handleClose,
    handleDelete,
    handleEditingRoom,
    handleOpen,
    handleSave,
    open,
    rooms,
    loading,
    error
  };
};
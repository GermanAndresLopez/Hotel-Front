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
        const { data } = await api.get('/habitaciones');
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

  const refreshRooms = async () => {
    try {
      const { data } = await api.get('/habitaciones');
      setRooms(data.habitaciones || data);
    } catch (err) {
      setError("Error al actualizar la lista de habitaciones");
      console.error(err);
    }
  };

  const handleOpen = (room = null) => {
    setEditingRoom(
      room || {
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
    editingRoom?.imagen?.forEach(img => {
      if (img.preview) URL.revokeObjectURL(img.preview);
    });
    setEditingRoom(null);
    setOpen(false);
  };
  /*
    const verifyAuth = async () => {
      try {
        await api.get('/verify');
        setAuthChecked(true);
        return true;
      } catch (error) {
        setError("No estás autenticado. Redirigiendo...");
        setTimeout(() => window.location.href = '/sign-in', 2000);
        return false;
      }
    };*/

  const handleSave = async () => {
    const isNewRoom = !editingRoom.identificador || editingRoom.identificador === '';
    try {
      if (!document.cookie.includes('token=') && !localStorage.getItem('token')) {
        setError("No hay sesión activa. Por favor inicie sesión.");
      }
      console.log('Datos cooke:', document.cookie);
      console.log('Datos local:', localStorage.getItem('token'));
      await api.get('/verify');
    } catch (error) {
      setError("Sesión expirada. Redirigiendo...");
    }


    if (!editingRoom?.nombre || editingRoom.capacidad < 1 || editingRoom.precio < 0) {
      setError("Nombre, capacidad y precio son requeridos");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      const roomId = isNewRoom ? crypto.randomUUID() : editingRoom.identificador;

      // 1. Preparar datos para debug (antes de enviar)
      const debugData = {
        basicData: {
          identificador: editingRoom.identificador,
          nombre: editingRoom.nombre,
          descripcion: editingRoom.descripcion,
          capacidad: editingRoom.capacidad,
          precio: editingRoom.precio,
          caracteristicas: editingRoom.caracteristicas
        },
        images: {
          newFiles: editingRoom.imagen.filter(img => img.file).map(img => ({
            name: img.file.name,
            type: img.file.type,
            size: img.file.size
          })),
          existingUrls: editingRoom.imagen
            .filter(img => !img.file)
            .map(img => img.preview || img)
        }
      };

      console.group('Datos a enviar al backend');
      console.log('Datos básicos:', debugData.basicData);
      console.log('Imágenes nuevas:', debugData.images.newFiles);
      console.log('URLs existentes:', debugData.images.existingUrls);
      console.groupEnd();

      // 2. Agregar campos al FormData
      // Siempre enviar el identificador (nuevo o existente)
      formData.append('identificador', roomId);
      formData.append('nombre', editingRoom.nombre);
      formData.append('descripcion', editingRoom.descripcion || '');
      formData.append('capacidad', Number(editingRoom.capacidad));
      formData.append('precio', Number(editingRoom.precio));
      formData.append('caracteristicas', JSON.stringify(editingRoom.caracteristicas));

      // 3. Procesar imágenes
      const imageFiles = editingRoom.imagen.filter(img => img.file).map(img => img.file);
      imageFiles.forEach(file => formData.append('imagen', file));

      const existingImageUrls = editingRoom.imagen
        .filter(img => !img.file)
        .map(img => img.preview || img);

      if (existingImageUrls.length > 0) {
        formData.append('existingImages', JSON.stringify(existingImageUrls));
      }

      // 4. Mostrar contenido real del FormData
      console.group('FormData real que se enviará');
      for (let [key, value] of formData.entries()) {
        if (key === 'imagen' && value instanceof File) {
          console.log(key, {
            name: value.name,
            type: value.type,
            size: value.size + ' bytes'
          });
        } else {
          console.log(key, value);
        }
      }
      console.groupEnd();

      // 5. Configurar y enviar
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };

      const endpoint = isNewRoom
        ? '/habitaciones'
        : `/habitaciones/${editingRoom.identificador}`;

      const method = isNewRoom ? 'post' : 'put';

      console.log(`Enviando ${method.toUpperCase()} a ${endpoint}`);
      const response = await api[method](endpoint, formData, config);
      console.log('Respuesta del backend:', response.data);

      // 6. Actualizar estado
      if (response.data && response.data.data) {
        // Actualizar el estado basado en la respuesta del backend
        setRooms(prevRooms => {
          if (isNewRoom) {
            return [response.data.data, ...prevRooms];
          } else {
            return prevRooms.map(room =>
              room.identificador === editingRoom.identificador
                ? response.data.data
                : room
            );
          }
        });

        handleClose();
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }

      handleClose();
    } catch (err) {
      console.error("Error completo:", err);
      console.log('Respuesta de error del backend:', err.response?.data);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Error al guardar la habitación"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        '¿Está seguro que desea eliminar esta habitación? Esta acción no se puede deshacer.'
      );

      if (!confirmDelete) return;

      const response = await api.delete(`/habitaciones/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const success = response.data.deletedCount === 1 ||
        (response.data.data?.acknowledged && response.data.data.deletedCount === 1) ||
        response.data.status.includes("eliminada");

      if (success) {
        setRooms(prevRooms => prevRooms.filter(r => r.identificador !== id));
      } else {
        await refreshRooms();
        setError("No se pudo confirmar la eliminación. Los datos se han actualizado.");
      }
    } catch (err) {
      console.error("Error al eliminar:", err);
      setError(err.response?.data?.message || "Error al eliminar la habitación");
      // Actualizar la lista por si acaso
      await refreshRooms();
    }
  };

  return {
    refreshRooms,
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
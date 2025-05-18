import { useEffect, useState } from 'react';
import api from '../config/axios';

export const useDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    const getRooms = async () => {
      const { data } = await api.get('api/habitaciones');
      setRooms(data.habitaciones);
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
        imagen: '',
        descripcion: '',
        capacidad: 1,
        caracteristicas: '',
        precio: 0,
      }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setEditingRoom(null);
    setOpen(false);
  };

  const handleSave = () => {
    if (
      !editingRoom?.nombre ||
      editingRoom.capacidad < 1 ||
      editingRoom.precio < 0
    )
      return;

    const existe = rooms.find((h) => h.id === editingRoom.id);
    if (existe) {
      setRooms(rooms.map((h) => (h.id === editingRoom.id ? editingRoom : h)));
    } else {
      setRooms([...rooms, editingRoom]);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    await api.delete(`api/habitaciones/${id}`);

    setRooms(rooms.filter((habitacion) => habitacion.identificador !== id));
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
  };
};

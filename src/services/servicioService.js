import api from '../config/axios';


export const obtenerServicios = () => api.get('/servicios');

export const crearServicio = (servicio) => api.post('/servicios', servicio);

export const eliminarServicio = (id) => api.delete(`/servicios/${id}`);


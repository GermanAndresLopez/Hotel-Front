import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  MenuItem,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import api from '../config/axios';

const AdministrarServicios = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    precio: '',
    categoria: 'servicio',
    imagen: '',
    descripcion: '',
    capacidad: '',
  });

  const [errores, setErrores] = useState({});
  const [servicios, setServicios] = useState([]);
  const [imagenPreview, setImagenPreview] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [servicioEditando, setServicioEditando] = useState(null);
  const [servicioEliminar, setServicioEliminar] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const token = localStorage.getItem('token');

  const categorias = [
    { value: 'servicio', label: 'Servicio' },
    { value: 'productos', label: 'Producto' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });

    if (errores[name]) {
      setErrores({ ...errores, [name]: '' });
    }

    if (name === 'imagen') {
      setImagenPreview(value);
    }
  };

  const obtenerServicios = async () => {
    try {
      const res = await api.get('servicios', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setServicios(res.data.services);
    } catch (err) {
      console.error('Error al obtener servicios:', err);
    }
  };

  useEffect(() => {
    obtenerServicios();
  }, []);

  const generarIdentificador = () =>
    `SERV-${Math.floor(Math.random() * 9000) + 1000}`;

  const validarFormulario = () => {
    const nuevosErrores = {};
    let valido = true;

    if (!formulario.nombre) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
      valido = false;
    }
    if (!formulario.precio) {
      nuevosErrores.precio = 'El precio es obligatorio';
      valido = false;
    }
    if (!formulario.categoria) {
      nuevosErrores.categoria = 'La categoría es obligatoria';
      valido = false;
    }
    if (!formulario.imagen) {
      nuevosErrores.imagen = 'La imagen es obligatoria';
      valido = false;
    }
    if (!formulario.descripcion) {
      nuevosErrores.descripcion = 'La descripción es obligatoria';
      valido = false;
    }
    if (!formulario.capacidad) {
      nuevosErrores.capacidad = 'La capacidad es obligatoria';
      valido = false;
    }

    setErrores(nuevosErrores);
    return valido;
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombre: '',
      precio: '',
      categoria: 'servicio',
      imagen: '',
      descripcion: '',
      capacidad: '',
    });
    setImagenPreview('');
    setModoEdicion(false);
    setServicioEditando(null);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    const datos = {
      nombre: formulario.nombre,
      precio: Number(formulario.precio),
      categoria:
        formulario.categoria.toLowerCase() === 'productos'
          ? 'producto'
          : 'servicio',
      imagen: [formulario.imagen],
      descripcion: formulario.descripcion,
      capacidad: Number(formulario.capacidad),
    };

    try {
      if (modoEdicion && servicioEditando) {
        await api.put(`servicios/${servicioEditando}`, datos, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setSnackbar({
          open: true,
          message: 'Servicio actualizado con éxito',
          severity: 'success',
        });
      } else {
        await api.post(
          'servicios',
          { ...datos, identificador: generarIdentificador() },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setSnackbar({
          open: true,
          message: 'Servicio creado con éxito',
          severity: 'success',
        });
      }

      obtenerServicios();
      limpiarFormulario();
    } catch (err) {
      console.error('Error al guardar:', err);
      setSnackbar({
        open: true,
        message: 'Error al guardar el servicio',
        severity: 'error',
      });
    }
  };

  const handleEditar = (servicio) => {
    setFormulario({
      nombre: servicio.nombre,
      precio: servicio.precio,
      categoria: servicio.categoria === 'producto' ? 'productos' : 'servicio',
      imagen: servicio.imagen[0] || '',
      descripcion: servicio.descripcion,
      capacidad: servicio.capacidad,
    });
    setImagenPreview(servicio.imagen[0] || '');
    setModoEdicion(true);
    setServicioEditando(servicio.identificador); //
  };

  const handleEliminarConfirmado = async () => {
    try {
      await api.delete(`servicios/${servicioEliminar}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setSnackbar({
        open: true,
        message: 'Servicio eliminado correctamente',
        severity: 'info',
      });
      obtenerServicios();
    } catch (error) {
      console.error('Error al eliminar:', error);
      setSnackbar({
        open: true,
        message: 'Error al eliminar servicio',
        severity: 'error',
      });
    } finally {
      setServicioEliminar(null);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          borderRadius: '30px',
          backgroundColor: '#191919',
          mt: 10,
          mb: 10,
          p: 4,
          color: 'white',
        }}
      >
        <Typography
          variant="h5"
          color="secondary"
          textAlign="center"
          sx={{ fontFamily: 'monospace', fontWeight: 700, mb: 3 }}
        >
          Administrar Servicios
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleGuardar}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}
        >
          <TextField
            label="Nombre del servicio"
            name="nombre"
            variant="standard"
            color="secondary"
            value={formulario.nombre}
            onChange={handleChange}
            error={!!errores.nombre}
            helperText={errores.nombre}
            InputLabelProps={{ style: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
            fullWidth
          />
          <TextField
            label="Precio"
            name="precio"
            type="number"
            variant="standard"
            color="secondary"
            value={formulario.precio}
            onChange={handleChange}
            error={!!errores.precio}
            helperText={errores.precio}
            InputLabelProps={{ style: { color: 'white' } }}
            inputProps={{ min: 0, style: { color: 'white' } }}
            fullWidth
          />
          <TextField
            select
            label="Categoría"
            name="categoria"
            variant="standard"
            color="secondary"
            value={formulario.categoria}
            onChange={handleChange}
            error={!!errores.categoria}
            helperText={errores.categoria}
            InputLabelProps={{ style: { color: 'white' } }}
            SelectProps={{ style: { color: 'white' } }}
            fullWidth
          >
            {categorias.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="URL de Imagen"
            name="imagen"
            variant="standard"
            color="secondary"
            value={formulario.imagen}
            onChange={handleChange}
            error={!!errores.imagen}
            helperText={errores.imagen}
            InputLabelProps={{ style: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
            fullWidth
          />
          {imagenPreview && (
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <img
                src={imagenPreview}
                alt="Vista previa"
                style={{ width: '150px', borderRadius: '10px' }}
              />
            </Box>
          )}
          <TextField
            label="Descripción"
            name="descripcion"
            variant="standard"
            color="secondary"
            value={formulario.descripcion}
            onChange={handleChange}
            error={!!errores.descripcion}
            helperText={errores.descripcion}
            InputLabelProps={{ style: { color: 'white' } }}
            inputProps={{ style: { color: 'white' } }}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Stock"
            name="capacidad"
            variant="standard"
            type="number"
            color="secondary"
            value={formulario.capacidad}
            onChange={handleChange}
            error={!!errores.capacidad}
            helperText={errores.capacidad}
            InputLabelProps={{ style: { color: 'white' } }}
            inputProps={{ min: 0, style: { color: 'white' } }}
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: '12px', mt: 2 }}
            type="submit"
          >
            {modoEdicion ? 'Actualizar Servicio' : 'Guardar Servicio'}
          </Button>
        </Box>

        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'monospace' }}
        >
          Lista de Servicios
        </Typography>

        <Grid container spacing={2}>
          {servicios.map((s) => (
            <Grid item xs={12} sm={6} md={4} key={s._id}>
              <Card sx={{ backgroundColor: '#1f1f1f', borderRadius: '16px' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={s.imagen?.[0] || ''}
                  alt={s.nombre}
                />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    color="white"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {s.nombre}
                  </Typography>
                  <Typography variant="body2" color="secondary">
                    ${s.precio}
                  </Typography>
                  <Typography variant="body2" color="white" sx={{ mt: 1 }}>
                    {s.descripcion}
                  </Typography>
                  <Typography variant="body2" color="white" sx={{ mt: 1 }}>
                    Capacidad: {s.capacidad}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleEditar(s)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => setServicioEliminar(s.identificador)}
                  >
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            width: '100%',
            backgroundColor: '#0d47a1', // azul oscuro
            color: 'white', // texto blanco para contraste
            '& .MuiAlert-icon': {
              color: 'white', // ícono blanco también
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={!!servicioEliminar}
        onClose={() => setServicioEliminar(null)}
      >
        <DialogTitle>¿Estás seguro de eliminar este servicio?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setServicioEliminar(null)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleEliminarConfirmado} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdministrarServicios;

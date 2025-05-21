import {
    Box,
    Button,
    Container,
    Typography,
    TextField,
    MenuItem,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
  } from '@mui/material';
  import { useState } from 'react';
  
  const categorias = ['Alimentos', 'Utensilios', 'Servicios'];
  
  export default function AdministrarProductos() {
    const [productos, setProductos] = useState([]);
    const [formulario, setFormulario] = useState({
      nombre: '',
      precio: '',
      categoria: '',
      imagen: '',
    });
    const [errores, setErrores] = useState({});
    const [imagenPreview, setImagenPreview] = useState('');
  
    const validarCampos = () => {
      const nuevosErrores = {};
      if (!formulario.nombre.trim()) nuevosErrores.nombre = 'Campo requerido';
      if (!formulario.precio || formulario.precio <= 0)
        nuevosErrores.precio = 'Precio válido requerido';
      if (!formulario.categoria) nuevosErrores.categoria = 'Selecciona una categoría';
      if (!formulario.imagen.trim()) nuevosErrores.imagen = 'URL requerida';
      setErrores(nuevosErrores);
      return Object.keys(nuevosErrores).length === 0;
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormulario((prev) => ({ ...prev, [name]: value }));
  
     
      if (name === 'imagen') {
        setImagenPreview(value);
      }
    };
  
    const handleGuardar = (e) => {
      e.preventDefault();
      if (!validarCampos()) return;
  
      const nuevoProducto = {
        id: Date.now(),
        ...formulario,
      };
      setProductos((prev) => [...prev, nuevoProducto]);
      setFormulario({ nombre: '', precio: '', categoria: '', imagen: '' });
      setImagenPreview('');
      setErrores({});
    };
  
    const handleEliminar = (id) => {
      setProductos(productos.filter((p) => p.id !== id));
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
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            color="secondary"
            textAlign="center"
            sx={{ fontFamily: 'monospace', fontWeight: 700, mb: 2 }}
          >
            Administrar Productos Adicionales
          </Typography>
  
          {/* Formulario */}
          <Box
            component="form"
            noValidate
            onSubmit={handleGuardar}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}
          >
            <TextField
              label="Nombre del producto"
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
              variant="standard"
              type="number"
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
              label="Categoría"
              name="categoria"
              select
              variant="standard"
              color="secondary"
              value={formulario.categoria}
              onChange={handleChange}
              error={!!errores.categoria}
              helperText={errores.categoria}
              fullWidth
              InputLabelProps={{ style: { color: 'white' } }}
              SelectProps={{ style: { color: 'white' } }}
            >
              {categorias.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
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
  
            <Button variant="contained" color="primary" sx={{ borderRadius: '12px' }} type="submit">
              Guardar Producto
            </Button>
          </Box>
  
          
          {categorias.map((cat) => {
            const filtrados = productos.filter((p) => p.categoria === cat);
            if (filtrados.length === 0) return null;
  
            return (
              <Box key={cat} sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'monospace' }}
                >
                  {cat}
                </Typography>
                <Grid container spacing={2}>
                  {filtrados.map((p) => (
                    <Grid item xs={12} sm={6} md={4} key={p.id}>
                      <Card sx={{ backgroundColor: '#1f1f1f', borderRadius: '16px' }}>
                        <CardMedia component="img" height="140" image={p.imagen} alt={p.nombre} />
                        <CardContent>
                          <Typography
                            variant="subtitle1"
                            color="white"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {p.nombre}
                          </Typography>
                          <Typography variant="body2" color="secondary">
                            ${p.precio}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          {/* Editar real no implementado aún */}
                          <Button size="small" color="secondary" disabled>
                            Editar
                          </Button>
                          <Button size="small" color="error" onClick={() => handleEliminar(p.id)}>
                            Eliminar
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
          })}
        </Box>
      </Container>
    );
  }
  
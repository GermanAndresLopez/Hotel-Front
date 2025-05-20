import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../config/axios"; // Axios configurado para realizar peticiones al backend
import "../index.css";


const CATEGORIES = [
  { value: "food", label: "Alimento" },
  { value: "utensil", label: "Utensilio" },
  { value: "service", label: "Servicio" },
];


const schema = (isEdit = false) =>
  yup.object({
    nombre: yup.string().required("Obligatorio"),
    precio: yup
      .number()
      .typeError("Numérico")
      .positive("Debe ser > 0")
      .required("Obligatorio"),
    categoria: yup
      .string()
      .oneOf(CATEGORIES.map((c) => c.value))
      .required("Obligatorio"),
    imagen: yup.mixed().test({
      name: "fileRequired",
      message: "Imagen obligatoria",
      test: (value) => (isEdit ? true : value && value.length > 0), 
    }),
  });

export default function ExtrasAdmin() {
  const [data, setData] = useState([]); // Lista de productos/servicios
  const [loading, setLoading] = useState(false); // Carga de datos
  const [open, setOpen] = useState(false); // Estado del modal
  const [editing, setEditing] = useState(null); // Objeto en edición

  // Obtener datos del backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/extras");
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar fetch al cargar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Eliminar un producto existente
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    try {
      await api.delete(`/api/extras/${id}`);
      setData((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Agrupar productos por categoría
  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat.value] = data.filter((p) => p.categoria === cat.value);
    return acc;
  }, {});

  return (
    <Container maxWidth="lg" sx={{ mt: 15, mb: 10 }}>
      {/* Encabezado con botón para crear nuevo */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" color="secondary" sx={{ fontFamily: "monospace", fontWeight: 700 }}>
          Productos / Servicios
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Nuevo
        </Button>
      </Box>

      {/* Mostrar loading si está cargando */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        // Mostrar productos agrupados por categoría
        CATEGORIES.map((cat) => (
          <Box key={cat.value} mt={4}>
            <Typography variant="h6" color="primary" textTransform="capitalize">
              {cat.label}
            </Typography>
            <Grid container spacing={2} mt={1}>
              {/* Si no hay productos en esta categoría */}
              {grouped[cat.value].length === 0 && (
                <Typography variant="body2" color="third.main" sx={{ ml: 2 }}>
                  Sin registros.
                </Typography>
              )}
              {/* Tarjetas de productos */}
              {grouped[cat.value].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Card sx={{ position: "relative" }}>
                    <CardMedia component="img" height="140" image={item.imagenUrl} />
                    <CardContent>
                      <Typography>{item.nombre}</Typography>
                      <Typography color="third.main">${item.precio}</Typography>
                    </CardContent>
                    <CardActions sx={{ position: "absolute", top: 8, right: 8 }}>
                      <IconButton onClick={() => { setEditing(item); setOpen(true); }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}

      {/* Modal para crear / editar */}
      <ExtraDialog open={open} onClose={() => setOpen(false)} onSaved={fetchData} producto={editing} />
    </Container>
  );
}

// formulario para nuevo/editar producto
function ExtraDialog({ open, onClose, onSaved, producto }) {
  const isEdit = Boolean(producto);
  const [preview, setPreview] = useState(producto?.imagenUrl || null); 

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: producto?.nombre || "",
      precio: producto?.precio || "",
      categoria: producto?.categoria || "",
      imagen: null,
    },
    resolver: yupResolver(schema(isEdit)),
  });

  // Ver cambios en el campo imagen para mostrar vista previa
  const watchedImage = watch("imagen");
  useEffect(() => {
    if (watchedImage && watchedImage.length) {
      setPreview(URL.createObjectURL(watchedImage[0]));
    }
  }, [watchedImage]);

  // Manejar envío del formulario
  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("nombre", values.nombre);
    formData.append("precio", values.precio);
    formData.append("categoria", values.categoria);
    if (values.imagen) formData.append("imagen", values.imagen[0]);

    try {
      if (isEdit) {
        await api.put(`/api/extras/${producto._id}`, formData);
      } else {
        await api.post("/api/extras", formData);
      }
      onSaved();
      onClose();
      reset();
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    }
  };

  // Resetear el formulario al abrir el modal
  useEffect(() => {
    if (open) {
      reset({
        nombre: producto?.nombre || "",
        precio: producto?.precio || "",
        categoria: producto?.categoria || "",
        imagen: null,
      });
      setPreview(producto?.imagenUrl || null);
    }
  }, [open, producto, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{isEdit ? "Editar" : "Nuevo"} producto / servicio</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          {/* Campo nombre */}
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Nombre" fullWidth margin="normal" error={!!errors.nombre} helperText={errors.nombre?.message} />
            )}
          />
          {/* Campo precio */}
          <Controller
            name="precio"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Precio" type="number" fullWidth margin="normal" error={!!errors.precio} helperText={errors.precio?.message} />
            )}
          />
          {/* Campo categoría */}
          <Controller
            name="categoria"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Categoría" fullWidth margin="normal" error={!!errors.categoria} helperText={errors.categoria?.message} >
                {CATEGORIES.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </TextField>
            )}
          />
          {/* Campo imagen */}
          <Controller
            name="imagen"
            control={control}
            render={({ field }) => (
              <TextField {...field} type="file" inputProps={{ accept: "image/*" }} fullWidth margin="normal" error={!!errors.imagen} helperText={errors.imagen?.message} />
            )}
          />
          {/* Vista previa */}
          {preview && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" display="block">Vista previa:</Typography>
              <img src={preview} alt="preview" style={{ width: "100%", borderRadius: 12 }} />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>{isEdit ? "Guardar" : "Crear"}</Button>
      </DialogActions>
    </Dialog>
  );
}

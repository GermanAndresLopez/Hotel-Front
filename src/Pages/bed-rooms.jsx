import React, { useState, useEffect } from "react";
import {
  Box, Container, Grid, Typography, Card, CardMedia, CardContent,
  CardActions, Button, Dialog, DialogContent, DialogActions, 
  DialogTitle, useMediaQuery, Divider, IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from '@mui/material/styles';
import {
  People as CapacityIcon,
  Star as StarIcon,
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon
} from '@mui/icons-material';

export default function Habitaciones() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [auth] = useState(true);
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await axios.get("https://hotel-back-vgip.onrender.com/api/habitaciones");
        setHabitaciones(response.data.habitaciones);
        const initialIndices = {};
        response.data.habitaciones.forEach(room => {
          initialIndices[room._id] = 0;
        });
        setCurrentImageIndex(initialIndices);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHabitaciones();
  }, []);

  const handleReservar = (habitacion) => {
    if (!auth) {
      alert("Inicie sesión para poder reservar.");
      return;
    }
    navigate("/Booking", { state: { room: habitacion } });
  };

  const handleOpenDetails = (habitacion) => {
    setSelectedRoom(habitacion);
    setOpenDialog(true);
  };

  const handleCloseDetails = () => {
    setOpenDialog(false);
  };

  const nextImage = (roomId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: (prev[roomId] + 1) % habitaciones.find(r => r._id === roomId).imagen.length
    }));
  };

  const prevImage = (roomId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: (prev[roomId] - 1 + habitaciones.find(r => r._id === roomId).imagen.length) %
        habitaciones.find(r => r._id === roomId).imagen.length
    }));
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Typography variant="h6">Cargando habitaciones...</Typography>
    </Box>
  );

  if (error) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Typography variant="h6" color="error">Error al cargar las habitaciones: {error}</Typography>
    </Box>
  );

  return (
    <Box sx={{ marginTop: 15, marginBottom: 5 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          color="primary"
          sx={{
            textAlign: "center",
            fontSize: { xs: 36, sm: 50 },
            fontFamily: 'monospace',
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          Nuestras Habitaciones
        </Typography>

        <Grid container spacing={4}>
          {habitaciones.map((habitacion) => (
            <Grid key={habitacion._id} item xs={12} sm={6} md={4}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 3
                }
              }}>
                <Box sx={{ 
                  position: 'relative', 
                  height: 250,
                  overflow: 'hidden'
                }}>
                  <CardMedia
                    component="img"
                    image={habitacion.imagen[currentImageIndex[habitacion._id] || 0]}
                    alt={`${habitacion.nombre} - Imagen ${currentImageIndex[habitacion._id] + 1}`}
                    sx={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {habitacion.imagen.length > 1 && (
                    <>
                      <IconButton
                        sx={{
                          position: 'absolute',
                          left: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.7)'
                          }
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage(habitacion._id);
                        }}
                      >
                        <PrevIcon />
                      </IconButton>

                      <IconButton
                        sx={{
                          position: 'absolute',
                          right: 8,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.7)'
                          }
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage(habitacion._id);
                        }}
                      >
                        <NextIcon />
                      </IconButton>

                      <Box sx={{
                        position: 'absolute',
                        bottom: 8,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 1
                      }}>
                        {habitacion.imagen.map((_, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: currentImageIndex[habitacion._id] === index ?
                                'primary.main' : 'rgba(255,255,255,0.5)',
                              cursor: 'pointer'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(prev => ({
                                ...prev,
                                [habitacion._id]: index
                              }));
                            }}
                          />
                        ))}
                      </Box>
                    </>
                  )}
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="div" 
                    color="primary"
                    sx={{ 
                      fontWeight: 'bold',
                      mb: 1  // Reducido el margen inferior
                    }}
                  >
                    {habitacion.nombre}
                  </Typography>

                  {habitacion.descripcion && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2,
                        minHeight: '4.5em',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {habitacion.descripcion}
                    </Typography>
                  )}

                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    p: 1,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <CapacityIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                      Capacidad: {habitacion.capacidad} persona{habitacion.capacidad > 1 ? 's' : ''}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography 
                      variant="subtitle2" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'text.primary'
                      }}
                    >
                      Características principales:
                    </Typography>
                    <Box
                      component="ul"
                      sx={{
                        pl: 2,
                        mb: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                      }}
                    >
                      {habitacion.caracteristicas.slice(0, 3).map((caract, index) => (
                        <Box
                          component="li"
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <StarIcon color="primary" sx={{ fontSize: '1rem', mr: 1 }} />
                          <Typography variant="body2" sx={{ color: 'text.primary' }}>
                            {caract}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{
                      mt: 'auto',
                      fontWeight: 'bold',
                      textAlign: 'right'
                    }}
                  >
                    Precio: ${habitacion.precio.toLocaleString()} por noche
                  </Typography>
                </CardContent>

                <CardActions sx={{ 
                  justifyContent: 'space-between', 
                  px: 2, 
                  pb: 2,
                  pt: 0 
                }}>
                  <Button
                    size="medium"
                    color="primary"
                    onClick={() => handleOpenDetails(habitacion)}
                    sx={{ fontWeight: 'bold' }}
                  >
                    Ver Detalles
                  </Button>
                  <Button
                    size="medium"
                    variant="contained"
                    color="success"
                    onClick={() => handleReservar(habitacion)}
                    sx={{ 
                      fontWeight: 'bold',
                      px: 3
                    }}
                  >
                    Reservar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Dialog de Detalles mejorado */}
      {selectedRoom && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDetails}
          fullScreen={isMobile}
          maxWidth="md"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: 2
            }
          }}
        >
          <DialogTitle sx={{ 
            backgroundColor: '#bdaff8',  // Color más suave
            color: '#291a6c',
            py: 3
          }}>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {selectedRoom.nombre}
            </Typography>
            <Typography variant="h5">
              Precio: ${selectedRoom.precio.toLocaleString()} por noche
            </Typography>
          </DialogTitle>

          <DialogContent dividers sx={{ pt: 3 }}>
            {/* Carrusel en el diálogo */}
            <Box sx={{ 
              position: 'relative', 
              height: isMobile ? 250 : 400,
              mb: 4,
              borderRadius: 2,
              overflow: 'hidden'
            }}>
              <CardMedia
                component="img"
                image={selectedRoom.imagen[currentImageIndex[selectedRoom._id] || 0]}
                alt={`${selectedRoom.nombre} - Imagen ${currentImageIndex[selectedRoom._id] + 1}`}
                sx={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              
              {selectedRoom.imagen.length > 1 && (
                <>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      left: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                      }
                    }}
                    onClick={() => prevImage(selectedRoom._id)}
                  >
                    <PrevIcon fontSize="large" />
                  </IconButton>

                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                      }
                    }}
                    onClick={() => nextImage(selectedRoom._id)}
                  >
                    <NextIcon fontSize="large" />
                  </IconButton>

                  <Box sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 1
                  }}>
                    {selectedRoom.imagen.map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          backgroundColor: currentImageIndex[selectedRoom._id] === index ?
                            'primary.main' : 'rgba(255,255,255,0.5)',
                          cursor: 'pointer'
                        }}
                        onClick={() => setCurrentImageIndex(prev => ({
                          ...prev,
                          [selectedRoom._id]: index
                        }))}
                      />
                    ))}
                  </Box>
                </>
              )}
            </Box>

            {/* Contenido en una sola columna */}
            <Box sx={{ 
              backgroundColor: 'background.paper',
              p: 3,
              borderRadius: 2,
              boxShadow: 1
            }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 'bold',
                  mb: 2,
                  pb: 1,
                  borderBottom: '2px solid',
                  borderColor: 'primary.main'
                }}
              >
                Descripción
              </Typography>
              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  whiteSpace: 'pre-line',
                  color: 'text.primary',
                  mb: 3
                }}
              >
                {selectedRoom.descripcion}
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mt: 2,
                mb: 3,
                p: 2,
                backgroundColor: 'action.hover',
                borderRadius: 1
              }}>
                <CapacityIcon color="primary" sx={{ mr: 2, fontSize: '2rem' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  Capacidad: {selectedRoom.capacidad} persona{selectedRoom.capacidad > 1 ? 's' : ''}
                </Typography>
              </Box>

              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 'bold',
                  mb: 2,
                  pb: 1,
                  borderBottom: '2px solid',
                  borderColor: 'primary.main'
                }}
              >
                Características
              </Typography>
              <Box sx={{ mb: 2 }}>
                {selectedRoom.caracteristicas.map((caract, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 1,
                    mb: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      borderRadius: 1
                    }
                  }}>
                    <StarIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="body1" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                      {caract}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </DialogContent>

          <DialogActions sx={{ 
            justifyContent: 'space-between', 
            px: 4, 
            py: 3,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}>
            <Button 
              onClick={handleCloseDetails} 
              color="primary"
              size="large"
              sx={{ fontWeight: 'bold' }}
            >
              Cerrar
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleCloseDetails();
                handleReservar(selectedRoom);
              }}
              size="large"
              sx={{ 
                fontWeight: 'bold',
                px: 4
              }}
            >
              Reservar Ahora
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
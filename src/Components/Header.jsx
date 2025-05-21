import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../index.css';
import {
  Button,
  MenuItem,
  Menu,
  IconButton,
  Box,
  Typography,
  AppBar,
  Container,
  Toolbar,
  Avatar,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/images/logo.png';
import IconButtom from './IconButtom';

export default function Header({ listaMenu }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const navigate = useNavigate();

  const menu = [
    {
      titulo: 'Perfil',
      path: '/profile',
    },
    {
      titulo: 'Panel de administración',
      path: '/dashboard',
      rolesPermitidos: ['administrador'],
    },
    {
      titulo: 'Administrar productos adicionales',
      path: '/AdminExtras/AdministrarProductos',
      rolesPermitidos: ['administrador'],
    },

    {
      titulo: 'Reservas',
      path: '/Booking',
    },
    {
      titulo: 'Habitaciones',
      path: '/bed-rooms',
    },
    {
      titulo: 'Cerrar Sesion',
      path: 'Cerrar',
    },
  ];

  const menuFiltrado = menu.filter((item) => {
    if (!item.rolesPermitidos) return true;
    return user && item.rolesPermitidos.includes(user.rol);
  });

  return (
    <AppBar
      color="third"
      sx={{
        backdropFilter: 'blur(5px) saturate(131%)',
        WebkitBackdropFilter: 'blur(5px) saturate(131%)',
        backgroundColor: 'rgba(17, 25, 40, 0.62)',
        borderRadius: '0px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.125)',
      }}
    >
      <Container maxWidth="x1" color="inherit">
        <Toolbar disableGutters>
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <img className="logo-main" src={logo} alt="" />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'flex' },
                flexGrow: 0,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Hotel
            </Typography>
          </Link>

          {/* Menú Responsive solo botón hamburguesa */}
          <Box
            sx={{
              justifyContent: 'flex-end',
              flexGrow: 1,
              display: 'flex',
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* Mostrar usuario y rol en móvil */}
              {user && (
                <Box sx={{ px: 2, py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32 }} />
                    <Box>
                      <Typography variant="body1">Bienvenido, {user.nombre}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Rol: {user.rol}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                </Box>
              )}

              {/* Menú */}
              {menuFiltrado.map((page) => (
                <MenuItem
                  key={page.titulo}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                >
                  <Typography textAlign="center">{page.titulo}</Typography>
                </MenuItem>
              ))}

              {/* Registro / Login si no está autenticado */}
              {!user && (
                <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(2, 1fr)', p: 2 }}>
                  <Button
                    key={98}
                    sx={{ color: 'black' }}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate('/sign-in');
                    }}
                  >
                    Iniciar Sesión
                  </Button>

                  <Button
                    key={97}
                    className="bg-[#580ef6]"
                    variant="contained"
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate('/sign-up');
                    }}
                  >
                    Registrarse
                  </Button>
                </Box>
              )}
            </Menu>
          </Box>

          

          {/* Registro o Avatar en escritorio */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {!user ? (
              <Box sx={{ alignItems: 'flex-start' }}>
                <Button
                  key={96}
                  sx={{
                    transition: '0.2s',
                    '&:hover': { transform: 'scale(1.05)' },
                    borderRadius: '100px',
                    mr: 2,
                  }}
                  onClick={() => navigate('/sign-in')}
                  variant="outlined"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  key={95}
                  variant="contained"
                  onClick={() => navigate('/sign-up')}
                  sx={{
                    transition: '0.2s',
                    '&:hover': { transform: 'scale(1.05)' },
                    borderRadius: '100px',
                  }}
                >
                  Registrarse
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="white">
                  Bienvenido {user.rol}
                </Typography>
                <Typography variant="body1" color="white">
                  
                  {user.nombreUsuario}
                </Typography>
                <IconButtom menu={menuFiltrado} user={user} />
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

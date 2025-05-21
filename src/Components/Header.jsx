import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/images/logo.png';
import IconButtom from './IconButtom';
import { useAuthStore } from '../hooks/auth/useAuthStore';

export default function Header({ listaMenu }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { user } = useAuthStore();

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
          {/*- - Icono Responsive - - */}
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

          {/*- - Menu Responsive - -*/}
          <Box
            sx={{
              justifyContent: 'flex-end',
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            {user ? <IconButtom menu={menu} user={user} /> : null}
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
              {/*- - Generamos los botones del menu - -*/}
              {listaMenu.map((page) => (
                <MenuItem key={page.titulo} onClick={() => navigate(page.path)}>
                  <Typography textAlign="center">{page.titulo}</Typography>
                </MenuItem>
              ))}

              {/*- - Si no se ha iniciado sesion generamos los botones de registro - -*/}

              {!user ? (
                <Box
                  sx={{ display: 'grid', gridTemplateRows: 'repeat(2, 1fr)' }}
                >
                  {/*- - Boton Iniciar sesion - -*/}
                  <Button
                    key={98}
                    className="hover:text-violet-900"
                    sx={{ color: 'black' }}
                    onClick={() => navigate('/sign-in')}
                  >
                    Iniciar Sesion
                  </Button>

                  {/* Botón Registrar */}
                  <Button
                    key={97}
                    className="bg-[#580ef6]"
                    variant="contained"
                    onClick={() => navigate('/sign-up')}
                  >
                    Registrarse
                  </Button>
                </Box>
              ) : null}
            </Menu>
          </Box>

          {/*- - Generamos los botones del encabezado - -*/}
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {listaMenu.map((page) => (
              <Button
                key={page.path}
                onClick={() => navigate(page.path)}
                sx={{
                  transition: '0.2s',
                  '&:hover': { transform: 'scale(1.05)' },
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}
              >
                {page.titulo}
              </Button>
            ))}
          </Box>

          {/*- - Ponemos los botones de registro o avatar del usuario - -*/}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {/*- - Botones de Login y Registro de usuario - -*/}
            {!user ? (
              <Box sx={{ alignItems: 'flex-start' }}>
                {/*- - Boton Iniciar sesion - -*/}
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
                  Iniciar Sesion
                </Button>

                {/* Botón Registrar */}
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
              <IconButtom menu={menu} user={user} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

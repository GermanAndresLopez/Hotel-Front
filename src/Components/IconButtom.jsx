import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import userImage from '../assets/images/Clientes/c-1.jpg';
import { useAuthStore } from '../hooks/auth/useAuthStore';

export default function IconButtom({ menu, user }) {
  const navigate = useNavigate();
  const { startLogout } = useAuthStore();

  // Estado para abrir el submenu de usuario
  const [anchorElUser, setAnchorElUser] = useState(null);

  //Función Para Abrir el Menu de Usuario
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  //Función para Cerrar el Menú de Usuario
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //Evento
  const onLogout = async () => {
    await startLogout();
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Abrir Configuracion">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt={user?.nombreUsuario}
              src={userImage}
              sx={{ bgcolor: '#580EF6' }}
            />
          </IconButton>
        </Tooltip>
        {/*- - Menu de opciones de usuario - -*/}
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          // keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {/*- - Opciones del menu de usuario - -*/}
          {menu.map((item) => (
            <MenuItem
              key={item.titulo}
              onClick={() =>
                item.path === 'Cerrar' ? onLogout() : navigate(item.path)
              }
            >
              <Typography textAlign="center">{item.titulo}</Typography>
            </MenuItem>
          ))}

          <MenuItem onClick={onLogout}>
            <Typography textAlign="center">Cerrar sesión</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}

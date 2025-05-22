export const menu = [
  {
    titulo: 'Perfil',
    path: '/profile',
  },

  {
    titulo: 'Servicios y productos',
    path: '/UserExtras/SolicitarProductos',
  },

  {
    titulo: 'Reservas',
    path: '/Booking',
  },

  {
    titulo: 'Habitaciones',
    path: '/bed-rooms',
  },
];

export const menuAdmin = [
  ...menu,
  {
    titulo: 'Administrar productos adicionales',
    path: '/AdminExtras/AdministrarServicios',
  },

  {
    titulo: 'Panel de administración',
    path: '/dashboard',
  },
];

export const menu = [
  {
    titulo: 'Perfil',
    path: '/profile',
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
    titulo: 'Panel de administración',
    path: '/dashboard',
  },
];

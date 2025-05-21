import { useDispatch } from 'react-redux';

import api from '../../config/axios';
import { onLogin, onLogout } from '../../store/auth/authSlice';

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const startSignIn = async (username, password) => {
    try {
      const { data } = await api.post('login', {
        nombreUsuario: username,
        password,
      });

      const { auth, message, usuario } = data;

      // Si no es valido no iniciar sesión
      if (!auth) {
        dispatch(onLogout(message));
        return;
      }

      dispatch(onLogin(usuario));
    } catch (error) {
      dispatch(onLogout(error.message));
    }
  };

  return {
    startSignIn,
  };
};

import { useDispatch, useSelector } from 'react-redux';

import api from '../config/axios';
import { chekingCredentials, onLogin, onLogout } from '../store/auth/authSlice';
import { delay } from '../lib/delay';

export const useAuthStore = () => {
  const { errorMessage, status, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startSignIn = async (username, password) => {
    try {
      const res = await api.post('login', {
        nombreUsuario: username,
        password,
      });

      const { auth, usuario } = res.data;

      if (!auth) {
        dispatch(onLogout('Usuario o contraseña incorrecta'));
        return;
      }

      dispatch(chekingCredentials());
      await delay(1000);

      dispatch(
        onLogin({
          name: usuario.nombreUsuario,
          rol: usuario.rol,
        })
      );
    } catch (error) {
      dispatch(onLogout('Error al iniciar sesión'));
    }
  };

  const startLogout = async () => {
    try {
      await api.post('logout');
      localStorage.removeItem('token');
      dispatch(onLogout(null));
    } catch (error) {
      dispatch(onLogout(error));
    }
  };

  const checkAuthToken = async () => {
    try {
      const res = await api.get('verificar');
      const { auth, usuario } = res.data;

      if (!auth) {
        dispatch(onLogout(null));
        return;
      }

      dispatch(
        onLogin({
          name: usuario.nombreUsuario,
          rol: usuario.rol,
        })
      );
    } catch (error) {
      dispatch(onLogout(null));
    }
  };

  return {
    checkAuthToken,
    errorMessage,
    startLogout,
    startSignIn,
    status,
    user,
  };
};

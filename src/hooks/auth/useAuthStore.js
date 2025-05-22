import { useDispatch, useSelector } from 'react-redux';

import api from '../../config/axios';
import { onLogin, onLogout } from '../../store/auth/authSlice';

export const useAuthStore = () => {
  const { status, errorMessage, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startSignIn = async (username, password) => {
    try {
      const { data } = await api.post('login', {
        nombreUsuario: username,
        password,
      });

      const { auth, usuario } = data;

      // Si no es valido no iniciar sesión
      if (!auth) {
        dispatch(
          onLogout('El nombre de usuario o la contraseña son incorrectos')
        );
        return;
      }

      dispatch(onLogin(usuario));
    } catch (error) {
      dispatch(onLogout(error.message));
    }
  };

  const startSignUp = async (username, email, password) => {
    try {
      const { data } = await api.post('registrarse', {
        nombreUsuario: username,
        correo: email,
        password,
      });

      const { auth, mensaje, usuario } = data;

      if (!auth) {
        dispatch(onLogout(mensaje[0]));
        return;
      }

      dispatch(onLogin(usuario));
    } catch {
      dispatch(onLogout('No fue posible registrar el usuario'));
    }
  };

  const startLogout = async () => {
    try {
      await api.post('logout');
      dispatch(onLogout());
    } catch (error) {
      dispatch(onLogout(error.message));
    }
  };

  const checkAuthToken = async () => {
    try {
      const { data } = await api.get('verificar');

      const { auth, message, usuario } = data;

      // Si no es valido no iniciar sesión
      if (!auth) {
        dispatch(onLogout(message));
        return;
      }

      dispatch(onLogin(usuario));
    } catch {
      dispatch(onLogout());
    }
  };

  return {
    authStatus: status,
    checkAuthToken,
    errorMessage,
    startLogout,
    startSignIn,
    startSignUp,
    user,
  };
};

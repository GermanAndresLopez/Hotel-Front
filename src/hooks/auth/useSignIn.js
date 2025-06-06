import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import api from '../../config/axios';
import { useForm } from '../useForm';
import { onLogin } from '../../store/auth/authSlice';

const signInForm = {
  nombreUsuario: '',
  password: '',
};

const formValidations = {
  nombreUsuario: [
    (value = '') => value.trim().length !== 0,
    'Debe ingresar el nombre de usuario',
  ],
  password: [
    (value = '') => value.trim().length !== 0,
    'Debe ingresar la contraseña',
  ],
};

export const useSignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    formState,
    isFormSubmitted,
    isFormValid,
    nombreUsuario,
    nombreUsuarioValid,
    onInputChange,
    password,
    passwordValid,
    setIsFormSubmitted,
  } = useForm(signInForm, formValidations);

  // Estado para mostrar alerta
  const [alerta, setAlerta] = useState({
    open: false,
    tipo: 'info',
    texto: '',
  });

  // formulario funcion
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsFormSubmitted(true);
    if (!isFormValid) return;

    try {
      const { data } = await api.post('login', formState, {
        withCredentials: true // Asegura que las cookies se reciban
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('auth', JSON.stringify({
        isAuthenticated: true,
        user: data.usuario // Asegúrate que esto contiene el _id
      }));

      const { auth, usuario } = data;
      console.log('Usuario recibido del backend:', usuario);

      if (auth) {
        // Guardar datos de usuario en Redux/localStorage si es necesario
        dispatch(onLogin({
          isAuthenticated: true,
          user: data.usuario
        }));

        navigate('/');
      }

      // Alertas dependiendo de la respuesta
      if (!auth) {
        setAlerta({
          open: true,
          tipo: 'error',
          texto: 'Usuario o Contraseña incorrectos!',
        });

        return;
      }

      dispatch(onLogin(usuario));
      navigate('/');
    } catch (error) {
      // Se cambia el estado de la alertas
      setAlerta({
        open: true,
        tipo: 'warning',
        texto: 'Error al verificar los datos',
      });
    }
  };

  return {
    alerta,
    handleSubmit,
    isFormSubmitted,
    nombreUsuario,
    nombreUsuarioValid,
    onInputChange,
    password,
    passwordValid,
    setAlerta,
    navigate,
  };
};

import { useCallback, useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState({
    isFormPosted: false,
    ...initialForm,
  });
  const [formValidation, setFormValidation] = useState({});
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const createValidators = useCallback(() => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  }, [formState, formValidations]);

  useEffect(() => {
    createValidators();
  }, [createValidators]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const setIsFormPosted = (isFormPosted) => {
    setFormState({
      isFormPosted,
      ...formState,
    });
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    ...formValidation,
    formState,
    isFormValid,
    onInputChange,
    onResetForm,
    setIsFormPosted,
  };
};

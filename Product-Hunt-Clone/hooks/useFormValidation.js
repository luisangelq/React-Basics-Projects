import { useState, useEffect } from "react";

import {registerForm, loginForm, newProductForm} from "../helpers/validations/ValidateForm";
import {errorAlert} from "../helpers/validations/AlertHandler";

const useFormValidation = (initialState, fn) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        fn();
      }
      setIsSubmitting(false);
    }
  }, [errors]);

  const handleChange = (e) => {
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  //Submit belongs to the register page
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = registerForm(values);
    setErrors(errors);
    errorAlert(errors);
    setIsSubmitting(true);
  };

  //Submit belongs to the login page
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = loginForm(values);
    setErrors(errors);
    errorAlert(errors);
    setIsSubmitting(true);
  }

  const handleNewProductSubmit = (e) => {
    e.preventDefault();
    const errors = newProductForm(values);
    setErrors(errors);
    errorAlert(errors);
    setIsSubmitting(true);
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleRegisterSubmit,
    handleLoginSubmit,
    handleNewProductSubmit
  };
};

export default useFormValidation;

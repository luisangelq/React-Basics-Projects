import { useState, useEffect } from "react";

import ValidateForm from "../helpers/validations/ValidateForm";
import ErrorHandler from "../helpers/validations/ErrorHandler";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = ValidateForm(values);
    setErrors(errors);
    ErrorHandler(errors);
    setIsSubmitting(true);
  };

  

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

export default useFormValidation;

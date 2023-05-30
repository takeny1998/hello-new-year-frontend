import { useState } from "react";

const useForm = (initValues) => {
  const [values, setValues] = useState(initValues);
  const [isSubmtting, setIsSubmitting] = useState(false);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setValues((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitHandler = (event, onSubmit, validate) => {
    setIsSubmitting(true);
    event.preventDefault();
    const errors = validate(values);

    let errorMessage = "";

    for (const error in errors) {
      errorMessage += `[${error}] ${errors[error]}\n`;
    }

    if (errorMessage.length === 0) {
      onSubmit(values);
    } else {
      alert(errorMessage);
    }
    setIsSubmitting(false);
  };

  const updateValues = (values) => {
    setValues((prevState) => {
      return { ...prevState, values };
    });
  };

  return {
    changeHandler,
    submitHandler,
    updateValues,
    isSubmtting,
  };
};

export default useForm;

import { useState } from "react";


const useForm = (initValues) => {
    const [ values, setValues ] = useState(initValues);

    const changeHandler = (event) => {
        const { name, value } = event.target;
        
        setValues((prevState) => {
            return { ...prevState, [name]: value };
        });
    };

    const submitHandler = (event, onSubmit, validate) => {
        event.preventDefault();
        const errors = validate(values);

        let errorMessage = '';

        for (const error in errors) {
            errorMessage += `[${error}] ${errors[error]}\n`;
        }
        
        if (errorMessage.length === 0) {
            onSubmit(values);
        } else {
            alert(errorMessage);
        }
    };

    return {
        changeHandler,
        submitHandler
    };
}

export default useForm;
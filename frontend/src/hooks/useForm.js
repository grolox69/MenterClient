import { useState } from 'react';

export default function useForm(initialValues, validate) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = function(event) {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        })
        validate({[name] : value})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    }
}
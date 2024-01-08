import React from 'react';
import { useField } from 'formik';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

const CustomDateInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input {...field} {...props} type="date" />
            {meta.touched && meta.error ? (
                <FormErrorMessage>{meta.error}</FormErrorMessage>
            ) : null}
        </FormControl>
    );
};

export default CustomDateInput;
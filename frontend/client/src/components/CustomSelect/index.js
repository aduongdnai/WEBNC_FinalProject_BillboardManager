// CustomSelect.js
import React from 'react';
import { Select, FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useField, Field } from 'formik';

const CustomSelect = ({ label, options, ...props }) => {
    const [field, meta] = useField(props);


    return (
        <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel>{label}</FormLabel>
            <Select
                minWidth={'272px'}
                {...field}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.key} value={option.value}>
                        {option.value}
                    </option>
                ))}
            </Select>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
};

export default CustomSelect;

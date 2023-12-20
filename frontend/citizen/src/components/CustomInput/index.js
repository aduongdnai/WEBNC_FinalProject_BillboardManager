import { useField, Field } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react'
const CustomInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel>{label}</FormLabel>
            <Input as={Field}

                {...field}
                {...props}

            >
            </Input>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    )
}
export default CustomInput;
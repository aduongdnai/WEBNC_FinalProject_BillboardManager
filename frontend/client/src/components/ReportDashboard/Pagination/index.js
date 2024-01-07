import React from 'react';
import { ButtonGroup, Button, Box } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageButtons = () => {
        const buttons = [];

        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <Button  key={i} onClick={() => onPageChange(i)} colorScheme={currentPage === i ? 'teal' : 'gray'}>
                    {i}
                </Button>
            );
        }

        return buttons;
    };

    return (
        <Box mt={4} display="flex" justifyContent="center">
            <ButtonGroup>
                <Button onClick={() => onPageChange(currentPage - 1)} isDisabled={currentPage === 1}>
                    &lt;
                </Button>
                {renderPageButtons()}
                <Button onClick={() => onPageChange(currentPage + 1)} isDisabled={currentPage === totalPages}>
                    &gt;
                </Button>
            </ButtonGroup>
        </Box>
    );
};

export default Pagination;

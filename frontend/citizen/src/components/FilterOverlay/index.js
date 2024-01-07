import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Spacer, Switch } from '@chakra-ui/react';
function FilterOverlay({ onFilterChange }) {
    const [planned, setPlanned] = React.useState(false);
    const [reported, setReported] = React.useState(false);

    const handleFilterChange = () => {
        onFilterChange({ planned, reported });
    };

    return (
        <Box position="absolute" bottom={0} right={0} p={4} backgroundColor="rgba(255, 255, 255, 0.8)">
            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="planned-switch" mb="0">
                    Chưa quy hoạch
                </FormLabel>
                <Spacer></Spacer>
                <Switch id="planned-switch" isChecked={planned} onChange={(e) => setPlanned(e.target.checked)} />
            </FormControl>
            <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="reported-switch" mb="0">
                    Báo cáo
                </FormLabel>
                <Spacer></Spacer>
                <Switch id="reported-switch" isChecked={reported} onChange={(e) => setReported(e.target.checked)} />
            </FormControl>
            <Button colorScheme='blue' size='sm' mt="2" onClick={handleFilterChange}>Apply Filters</Button>
        </Box>
    );
}
export default FilterOverlay;
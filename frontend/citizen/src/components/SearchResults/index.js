import React from 'react'

import { Box, Grid, Text, VStack, } from '@chakra-ui/react'

import './style.css'
import { useDispatch } from 'react-redux'
import { setViewport, } from '../actions/viewportAction'
const SearchResults = ({ searchResults, setSearchResults }) => {
    //console.log(searchResults);
    const dispatch = useDispatch()
    const changeViewport = (location) => {
        setSearchResults(null)
        const newViewport = {
            latitude: location.lat,
            longitude: location.lng,
            zoom: 12,
            transitionDuration: 5000, // Adjust the zoom level as needed

        };

        dispatch(setViewport(newViewport));

    }
    if (searchResults == null) {
        return null;
    }
    return (
        <Box borderTopWidth='1px' pt={2} pb={4}>
            <Grid className='search-result-box' gridRowGap='1rem'>
                {searchResults.map(({ formatted_address, place_id, geometry }) => (
                    <Box
                        _hover={{
                            background: 'teal.500',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                        key={place_id}
                        onClick={() => changeViewport(geometry.location)}
                    >
                        <Grid
                            sx={{

                                height: '30px',
                                overflow: 'hidden',
                            }}
                        >
                            <VStack align='start'>
                                <Text noOfLines={1}>{formatted_address}</Text>
                            </VStack>
                        </Grid>
                    </Box>
                ))}
            </Grid>
        </Box>
    )
}

export default SearchResults

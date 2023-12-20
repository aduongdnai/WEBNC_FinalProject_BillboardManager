import React from 'react'

import { Box, Grid, Text, VStack, Flex } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import './style.css'
import { useDispatch } from 'react-redux'
import { setViewport, setFlyViewport } from '../actions/viewportAction'
const SearchResults = ({ searchResults, setSearchResults }) => {
    //console.log(searchResults);
    const dispatch = useDispatch()
    const changeViewport = (location) => {
        setSearchResults([])
        const newViewport = {
            latitude: location.lat,
            longitude: location.lng,
            zoom: 12,
            transitionDuration: 5000, // Adjust the zoom level as needed

        };

        dispatch(setViewport(newViewport));

    }
    return (
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
    )
}

export default SearchResults

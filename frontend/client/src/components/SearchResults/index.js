import React from 'react'

import { Box, Grid, Text, VStack, Flex } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import './style.css'
const SearchResults = ({ searchResults }) => {
    console.log(searchResults);
    return (
        <Grid className='search-result-box' gridRowGap='1rem'>
            {searchResults.map(({ formatted_address }) => (
                <Box

                    _hover={{
                        background: 'teal.500',
                        color: 'white',
                        cursor: 'pointer',
                    }}
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

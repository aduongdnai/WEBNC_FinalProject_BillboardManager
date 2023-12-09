import React from 'react'

import { Box, Grid, Text, VStack } from '@chakra-ui/react'
import { nanoid } from 'nanoid'

const SearchResults = ({ searchResults }) => {
    console.log(searchResults);
    return (
        <Grid gridRowGap='1rem'>
            {searchResults.map(({ formatted_address }) => (
                <Box
                    key={nanoid()}
                    _hover={{
                        background: 'teal.500',
                        color: 'white',
                        cursor: 'pointer',
                    }}
                    p='.5rem 1rem'
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

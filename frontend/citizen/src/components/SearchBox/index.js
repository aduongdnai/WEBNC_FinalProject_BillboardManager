import React, { useState, useEffect, useRef } from 'react'
import { Box, Flex, Center, chakra } from '@chakra-ui/react'
import axios from 'axios'

import { SearchIcon } from '@chakra-ui/icons'

import SearchResults from '../SearchResults'
import mapAPI from '../../apis/mapApi'
const SearchBox = () => {
    const [queryText, setQueryText] = useState('')
    const [searchResults, setSearchResults] = useState([])


    const handleChange = (e) => setQueryText(e.target.value)

    useEffect(() => {
        if (!queryText) {
            setSearchResults([])

        }
        else {
            ; (async () => {
                const result = await mapAPI.adressToGeoCode(queryText);
                if (result) {
                    setSearchResults(result.results)
                    //console.log(result.results[0].formatted_address);
                }

            })()
        }

    }, [queryText])

    return (
        <Box
            sx={{
                rounded: 'lg',
                overflow: 'hidden',
                bg: 'transparent',
                shadow: 'lg',
                maxW: '600px',
                width: '90%',
                mt: '1rem',
                mx: 'auto',
            }}

        >
            <Flex pos='relative' align='strech' zIndex={10}>
                <chakra.input
                    type=''
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck='false'
                    maxLength={64}
                    sx={{
                        w: '100%',
                        h: '68px',
                        pl: '68px',
                        fontWeight: 'medium',
                        outline: 0,
                    }}
                    placeholder='Search Movies'
                    value={queryText}
                    onChange={handleChange}

                />

                <Center pos='absolute' left={7} h='68px'>
                    <SearchIcon color='teal.500' boxSize='20px' />
                </Center>
            </Flex>

            {queryText && (
                <Box maxH='70vh' p='0' overflowY='auto' bg='white' position='relative' zIndex={10}>
                    <Box px={4}>
                        
                            <SearchResults searchResults={searchResults} setSearchResults={setSearchResults} />
                      
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default SearchBox

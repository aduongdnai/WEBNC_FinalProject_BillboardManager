import React from 'react';
import { Box } from '@chakra-ui/react';
import AdBoardEditRequestListCBSO from './CB_So.js';
import { Card, CardBody, CardFooter } from '@chakra-ui/react'
import AdBoardEditRequestListCBQuanPhuong from './CB_quanphuong.js';
import { useSelector } from 'react-redux';


function AdBoardEditRequestList(props) {
    const user = useSelector(state => state.auth.userData);
    return (
        <Box width={"100%"}>
            <Card maxW='8xl'>
                <CardBody>
                    {user.role === "CB-So" ?
                        <AdBoardEditRequestListCBSO> </AdBoardEditRequestListCBSO>
                        : <AdBoardEditRequestListCBQuanPhuong > </AdBoardEditRequestListCBQuanPhuong>}


                </CardBody>

                <CardFooter>

                </CardFooter>
            </Card>

        </Box>

    );
}

export default AdBoardEditRequestList;
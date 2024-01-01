import React, { useState } from 'react'
import {
    Flex,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    IconButton,
    useDisclosure,
    Input,
    Button,
    Center
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import {FiUser} from 'react-icons/fi'
import { CiLogin,CiLogout } from "react-icons/ci";
import { BsTable } from "react-icons/bs";
import { MdOutlineManageAccounts } from "react-icons/md";


export default function Sidebar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    return (
        <Flex
            pos="sticky"
            marginTop="2.5vh"
            flexDir="column"
            justifyContent="space-between"
        >
        <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Billboard Manager</DrawerHeader>

                <DrawerBody>
                        <Button
                            background="none"
                            fontSize='15px'
                            ref={btnRef}
                            _hover={{ backgroundColor: "#AEC8CA" }}
                            leftIcon={<BsTable />}
                            width={'270px'}
                            justifyContent={"start"}
                            onClick={() => {

                            }}
                        >
                            Table Management
                        </Button>
                        <Button
                            background="none"
                            fontSize='15px'
                            ref={btnRef}
                            width={'270px'}
                            justifyContent={"start"}
                            _hover={{ backgroundColor: "#AEC8CA" }}
                            leftIcon={<MdOutlineManageAccounts />}
                            onClick={() => {

                            }}
                        >
                            Acount 
                        </Button>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
            <Flex
                p="5%"
                flexDir="column"
                w="60px"
                alignItems="center"
                as="nav"
            >
                <IconButton
                    background="none"
                    fontSize='25px'
                    ref={btnRef}
                    mt={5}
                    _hover={{ backgroundColor: "#AEC8CA" }}
                    icon={<HamburgerIcon />}
                    onClick={onOpen}
                />
                <IconButton
                    background="none"
                    mt={5}
                    fontSize='25px'
                    icon={<CiLogin />}
                    onClick={() => {
                        
                    }}
                    _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
                />
                {/* <IconButton
                    background="none"
                    mt={5}
                    _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
                    // icon={<HamburgerIcon />}
                    onClick={() => {
                        // if (navSize == "small")
                        //     changeNavSize("large")
                        // else
                        //     changeNavSize("small")
                    }}
                /> */}
            </Flex>
        </Flex>
    )
}
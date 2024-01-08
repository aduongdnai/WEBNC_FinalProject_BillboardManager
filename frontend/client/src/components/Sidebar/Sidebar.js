import React, { useState } from "react";
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
  Center,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FiUser } from "react-icons/fi";
import { CiLogin, CiLogout } from "react-icons/ci";
import { BsTable } from "react-icons/bs";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BsFillPinMapFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useUser } from "../LoginSignup/userContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { username, logout } = useUser();
  const handleLogout = () => {
    logout(); // Gọi hàm logout khi người dùng nhấn logout
  };
  return (
    <Flex
      pos="sticky"
      marginTop="2.5vh"
      flexDir="column"
      justifyContent="space-between"
    >
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Billboard Manager</DrawerHeader>

          {username ? (
            <span>
              <DrawerHeader>Welcome, {username} </DrawerHeader> |
              <DrawerBody>
                <Button
                  size="sm"
                  rounded="md"
                  color={["primary.500", "primary.500", "white", "white"]}
                  bg={["white", "white", "primary.500", "primary.500"]}
                  _hover={{
                    bg: [
                      "primary.100",
                      "primary.100",
                      "primary.600",
                      "primary.600",
                    ],
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>{" "}
              </DrawerBody>
            </span>
          ) : (
            <Link href="/login">
              <DrawerBody>
                <Button
                  size="sm"
                  rounded="md"
                  color={["primary.500", "primary.500", "white", "white"]}
                  bg={["white", "white", "primary.500", "primary.500"]}
                  _hover={{
                    bg: [
                      "primary.100",
                      "primary.100",
                      "primary.600",
                      "primary.600",
                    ],
                  }}
                >
                  Login
                </Button>
              </DrawerBody>
            </Link>
          )}
          <DrawerBody>
            <Button
              background="none"
              fontSize="15px"
              ref={btnRef}
              width={"270px"}
              justifyContent={"start"}
              _hover={{ backgroundColor: "#AEC8CA" }}
              leftIcon={<BsFillPinMapFill />}
              onClick={() => navigate("/")}
            >
              Map
            </Button>
            <Button
              background="none"
              fontSize="15px"
              ref={btnRef}
              _hover={{ backgroundColor: "#AEC8CA" }}
              leftIcon={<BsTable />}
              width={"270px"}
              justifyContent={"start"}
              onClick={() => navigate("/manage")}
            >
              Table Management
            </Button>
            <Button
              background="none"
              fontSize="15px"
              ref={btnRef}
              width={"270px"}
              justifyContent={"start"}
              _hover={{ backgroundColor: "#AEC8CA" }}
              leftIcon={<MdOutlineManageAccounts />}
              onClick={() => navigate("/account")}
            >
              Account
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Flex p="5%" flexDir="column" w="60px" alignItems="center" as="nav">
        <IconButton
          background="none"
          fontSize="25px"
          ref={btnRef}
          mt={5}
          _hover={{ backgroundColor: "#AEC8CA" }}
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
        <IconButton
          background="none"
          mt={5}
          fontSize="25px"
          icon={<CiLogin />}
          onClick={() => {}}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
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
  );
}

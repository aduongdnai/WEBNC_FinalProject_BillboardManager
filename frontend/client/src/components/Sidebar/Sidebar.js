import React, { useState } from "react";
import {
  Flex,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
  Button,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { HamburgerIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { CiLogin, CiLogout } from "react-icons/ci";
import { BsTable, BsClipboard2Check, BsPersonFillAdd, BsArrowRightCircle } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { MdOutlineManageAccounts } from "react-icons/md";
import { BsFillPinMapFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useUser } from "../LoginSignup/userContext";
import store from "../../store";
import { logout } from "../actions/authAction";
import { useSelector } from "react-redux"


export default function Sidebar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  //const { username, area } = useUser();
  const handleLogout = () => {
    store.dispatch(logout())
    navigate('/login')

  };

  const userData = useSelector((state) => state.auth.userData);

  return (
    <Flex
      pos="sticky"
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

          {userData ? (
            <DrawerHeader>Welcome, {userData.username} </DrawerHeader>
          ) : (
            <DrawerHeader></DrawerHeader>
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
              onClick={() => navigate("/table-area")}
            >
              Location Management
            </Button>
            <Button
              background="none"
              fontSize="15px"
              ref={btnRef}
              _hover={{ backgroundColor: "#AEC8CA" }}
              leftIcon={<WarningTwoIcon />}
              width={"270px"}
              justifyContent={"start"}
              onClick={() => navigate("/report")}
            >
              Report Management
            </Button>
            <Button
              background="none"
              fontSize="15px"
              ref={btnRef}
              _hover={{ backgroundColor: "#AEC8CA" }}
              leftIcon={<BsClipboard2Check />}
              width={"270px"}
              justifyContent={"start"}
              onClick={() => navigate("/advertisinglicense")}
            >
              Advertising License Management
            </Button>
            <Button
              background="none"
              fontSize="15px"
              ref={btnRef}
              width={"270px"}
              justifyContent={"start"}
              _hover={{ backgroundColor: "#AEC8CA" }}
              leftIcon={<BsArrowRightCircle />}
              onClick={() => navigate("/adboard-edit-request-list")}
            >
              Request Inspector Ads Board
            </Button>
            <Button
              background="none"
              fontSize="15px"
              ref={btnRef}
              width={"270px"}
              justifyContent={"start"}
              _hover={{ backgroundColor: "#AEC8CA" }}
              leftIcon={<BsArrowRightCircle />}
              onClick={() => navigate("/adlocation-edit-request-list")}
            >
              Request Inspector Ads Location
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
            {userData && userData.role === "CB-So" ? (<><Button
              background="none"
              fontSize="15px"
              ref={btnRef}
              width={"270px"}
              justifyContent={"start"}
              _hover={{ backgroundColor: "#AEC8CA" }}
              leftIcon={<BsPersonFillAdd />}
              onClick={() => navigate("/signup")}
            >
              Cấp phát tài khoản
            </Button>
              <Button
                background="none"
                fontSize="15px"
                ref={btnRef}
                width={"270px"}
                justifyContent={"start"}
                _hover={{ backgroundColor: "#AEC8CA" }}
                leftIcon={<BsArrowRightCircle />}
                onClick={() => navigate("/report-types")}
              >
                Report Types Management
              </Button>

              <Button
                background="none"
                fontSize="15px"
                ref={btnRef}
                width={"270px"}
                justifyContent={"start"}
                _hover={{ backgroundColor: "#AEC8CA" }}
                leftIcon={<ImLocation2 />}
                onClick={() => navigate("/manage-district")}
              >
                District Management
              </Button>
            </>) : (<></>)}
            {userData ?
              (
                <Tooltip label='Logout'>
                  <Button
                    background="none"
                    mt={5}
                    fontSize="25px"
                    leftIcon={<CiLogout />}
                    onClick={handleLogout}
                    _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
                  >
                    Logout
                  </Button>
                </Tooltip>
              ) :
              (
                <Tooltip label='Login'>
                  <IconButton
                    background="none"
                    mt={5}
                    fontSize="25px"
                    icon={<CiLogin />}
                    onClick={() => navigate('/login')}
                    _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
                  />
                </Tooltip>
              )
            }
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
          onClick={userData ? (onOpen) : (onClose)}
        />

        {/* <Tooltip label='Login'>
          <IconButton
            background="none"
            mt={5}
            fontSize="25px"
            icon={<CiLogin />}
            onClick={() => navigate('/login')}
            _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          />
        </Tooltip> */}
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

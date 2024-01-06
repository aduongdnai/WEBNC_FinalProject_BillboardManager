import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ChakraProvider,
  HStack,
  IconButton,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";

const ButtonPagination = (props) => {
  const {
    children,
    index,
    setPageIndex,
    pageIndex,
    colorScheme = "teal",
  } = props;

  return (
    <Button
      size="sm"
      onClick={() => {
        setPageIndex(index);
      }}
      colorScheme={colorScheme}
      variant={pageIndex === index ? "solid" : "link"}
    >
      {children}
    </Button>
  );
};



const PaginationTable = (props) => {
  const {
    pageSize,
    setPageSize,
    pageIndex,
    setPageIndex,
    totalItemsCount,
    pageSizeOptions = [10, 25, 50],
    showOptions = true,
    labelOptions = "Rows per page",
    colorScheme = "teal",
  } = props;

  const showButtons = () => {
    let buttons = [];

    let totalIndex;

    if (parseInt(totalItemsCount / pageSize) < totalItemsCount / pageSize) {
      totalIndex = parseInt(totalItemsCount / pageSize) + 1;
    } else {
      totalIndex = parseInt(totalItemsCount / pageSize);
    }

    if (totalIndex < 5) {
      for (let index = 0; index < totalIndex; index++) {
        buttons.push(
          <ButtonPagination
            colorScheme={colorScheme}
            setPageIndex={setPageIndex}
            index={index}
            pageIndex={pageIndex}
          >
            {index + 1}
          </ButtonPagination>
        );
      }
    }

    if (totalIndex >= 5) {
      if (pageIndex < 3) {
        for (let index = 0; index <= 5; index++) {
          buttons.push(
            <ButtonPagination
              colorScheme={colorScheme}
              setPageIndex={setPageIndex}
              index={index}
              pageIndex={pageIndex}
            >
              {index + 1}
            </ButtonPagination>
          );
        }
      } else if (pageIndex >= totalIndex - 2) {
        for (let index = totalIndex - 5; index < totalIndex; index++) {
          buttons.push(
            <ButtonPagination
              colorScheme={colorScheme}
              setPageIndex={setPageIndex}
              index={index}
              pageIndex={pageIndex}
            >
              {index + 1}
            </ButtonPagination>
          );
        }
      } else {
        for (let index = pageIndex - 2; index < pageIndex + 3; index++) {
          buttons.push(
            <ButtonPagination
              colorScheme={colorScheme}
              setPageIndex={setPageIndex}
              index={index}
              pageIndex={pageIndex}
            >
              {index + 1}
            </ButtonPagination>
          );
        }
      }
    }

    // Si en el indice que está es mayor a cero muestra el boton para volver atrás
    buttons.unshift(
      <IconButton
        icon={<ArrowLeftIcon />}
        size="sm"
        onClick={() => {
          setPageIndex(pageIndex - 1);
        }}
        isDisabled={!(pageIndex > 0)}
        colorScheme={colorScheme}
        variant="link"
      >
        Atras
      </IconButton>
    );

    buttons.push(
      <IconButton
        icon={<ArrowRightIcon />}
        size="sm"
        onClick={() => {
          setPageIndex(pageIndex + 1);
        }}
        isDisabled={!(pageIndex + 1 < totalIndex)}
        colorScheme={colorScheme}
        variant="link"
      >
        Atras
      </IconButton>
    );

    return buttons;
  };

  return (
    <ChakraProvider>
      <HStack w="100%" p={2}>
        <HStack w="40%">
          {showOptions && (
            <>
              <Text fontSize="sm"> {labelOptions}: </Text>
              <Select
                w="auto"
                size="sm"
                variant="unstyled"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(e.target.value);
                }}
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt.id} value={opt}>
                    {opt}
                  </option>
                ))}
              </Select>
            </>
          )}
        </HStack>
        <Box w="60%" justifyContent="right" display="flex">
          <HStack>{showButtons()}</HStack>
        </Box>
      </HStack>
    </ChakraProvider>
  );
};

export default PaginationTable;
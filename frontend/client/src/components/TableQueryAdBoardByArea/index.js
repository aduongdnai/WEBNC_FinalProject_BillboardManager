import {
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tooltip
} from '@chakra-ui/react';
import { FaEye, FaPen } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import adLocationAPI from '../../apis/adLocationApi';
import adBoardApi from '../../apis/adBoardApi';
import { useEffect, useState } from 'react';
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { useUser } from '../LoginSignup/userContext';
// import {PaginationTable} from "table-pagination-chakra-ui";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { setViewport } from '../actions/viewportAction';
import { useDispatch } from 'react-redux';
import { FaMap, FaArrowCircleRight } from "react-icons/fa";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { useToast } from "@chakra-ui/react"
import EditAdBoardForm from './EditAdBoardForm';
import AdvertisingLicenseRequestForm from '../AdvertisingLicenseRequestForm';
import AdvertisingLicenseRequestApi from '../../apis/advertisingLicenseRequestApi.js';



function imageFormatter(cell, row, rowIndex) {
  return (
    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
      <CloudinaryImage key={rowIndex} publicId={row.image} width="150" height="150" />
    </CloudinaryContext>
  )
}




function TableQueryAdBoardByArea(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useToast();
  var id;
  const { isOpen: isNormalOpen, onOpen: onNormalOpen, onClose: onNormalClose } = useDisclosure();
  const { isOpen: isRequestLicenseOpen, onOpen: onRequestLicenseOpen, onClose: onRequestLicenseClose } = useDisclosure();
  if (!props.area) id = location.state.location._id || "";
  else id = props.area;
  const navigate = useNavigate();
  // const { area } = useUser();
  const [adBoard, setAdBoard] = useState(null);
  const [selectedAdBoard, setSelectedAdBoard] = useState(null);
  const [update, setUpdate] = useState(false);
  // const { SearchBar } = Search;
  useEffect(() => {
    const fetchData = async () => {
      try {

        const result = await adBoardApi.getAdBoardByLocationID(id);
        const ans = result.data.map((element) => {
          return {
            ...element,
            expiryDate: element.expiryDate ? new Date(element.expiryDate).toLocaleDateString() : "No expiry date",
            hasLicense: element.advertisingLicense_id ? "Yes" : "No"
          }
        })
        setAdBoard(ans);
        setUpdate(false);

      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };

    // Call the fetchData function when the component mounts or when viewport changes
    fetchData();
  }, [update]);


  const handleChangeViewPort = () => {
    navigate("/");
    const newViewport = {
      latitude: location.state.location.coordinates.coordinates[1],
      longitude: location.state.location.coordinates.coordinates[0],
      zoom: 20,
      transitionDuration: 5000, // Adjust the zoom level as needed

    };
    dispatch(setViewport(newViewport));
  }

  const handleEditClick = (location) => {
    setSelectedAdBoard(location);
    onNormalOpen();
  };

  const handleSubmit = (data) => {
    // Xử lý logic khi submit form
    console.log(data);
  };

  const handleRequestLicenseClick = (row) => {
    setSelectedAdBoard(row)
    if (row.hasLicense === "Yes" && row.expiryDate !== "No expiry date") {
      toast({
        title: "Điểm quảng cáo đã được cấp phép",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
    else if (row.hasLicense === "Yes" && row.expiryDate === "No expiry date") {
      toast({
        title: "Điểm quảng cáo đã được gửi yêu cầu cấp phép",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
    else {

      onRequestLicenseOpen();
    }
  }
  const columns = [
    {
      dataField: 'boardType',
      text: 'Board Type'
    },
    {
      dataField: 'width',
      text: 'Width'
    },
    {
      dataField: 'height',
      text: 'Height'
    },
    {
      dataField: 'expiryDate',
      text: 'Expired Date'
    },
    {
      dataField: 'hasLicense',
      text: 'Has License'
    },
    {
      dataField: 'action',
      isDummyField: true,
      text: 'Action',
      formatter: (cellContent, row) => {
        return (
          <div style={{ display: "flex" }}>
            <Tooltip label="Xem trên bản đồ" fontSize="md" placement='top'>
              <span>
                <Icon
                  variant="unstyled"
                  as={FaMap}
                  w={5}
                  h={5}
                  marginRight={5}
                  // marginLeft={2} 
                  onClick={() => handleChangeViewPort(row)}
                  _hover={{ color: 'blue' }}
                />
              </span>
            </Tooltip>

            <Tooltip label="Gửi yều cầu chỉnh sửa" fontSize="md" placement='top'>
              <span>
                <Icon
                  as={FaPen}
                  w={4}
                  h={4}
                  marginRight={5}
                  onClick={() => handleEditClick(row)}
                  _hover={{ color: 'blue' }}
                />
              </span>
            </Tooltip>
            <Tooltip label="Gửi yêu cầu cấp phép quảng cáo" fontSize="md" placement='top'>
              <span>
                <Icon
                  as={BsClipboard2CheckFill}
                  w={4}
                  h={4}
                  onClick={() => handleRequestLicenseClick(row)}
                  _hover={{ color: 'blue' }}
                />
              </span>
            </Tooltip>


          </div>
        )
      }
    }
  ];

  const sizePerPageOptionRenderer = ({
    text,
    page,
    onSizePerPageChange
  }) => (
    <li
      key={text}
      role="presentation"
      className="dropdown-item"
    >
      <a
        href="#"
        tabIndex="-1"
        role="menuitem"
        data-page={page}
        onMouseDown={(e) => {
          e.preventDefault();
          onSizePerPageChange(page);
        }}
        style={{ display: "block", color: 'red', width: "100%" }}
      >
        {text}
      </a>
    </li>
  );

  const options = {
    sizePerPageOptionRenderer,
    alwaysShowAllBtns: true,
    hidePageListOnlyOnePage: true,
    sizePerPageList: [{
      text: '10', value: 10
    }, {
      text: '15', value: 15
    }, {
      text: '20', value: 20
    }],
  }

  const MySearch = (props) => {
    return (
      <div className="form-group has-search">
        <span className="form-control-feedback">
          <Icon as={IoSearchOutline}></Icon>
        </span>
        <input
          className="form-control"
          style={{ marginTop: "20px", marginBottom: "15px" }}
          type="text"
          onChange={(event) => {
            props.onSearch(event.target.value)
          }}
          placeholder='Search'
        />
      </div>
    );
  };
  const handleSubmitForm = async (values, actions) => {
    try {
      const result = await AdvertisingLicenseRequestApi.addAdvertisingLicenseRequest(values);
      console.log(result);
      if (result) {
        toast({
          title: 'Gửi thành công.',
          description: "Đơn yêu cầu cấp phép bảng quảng cáo của bạn đã được gửi thành công.",
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        const resultUpdate = await adBoardApi.updateAdboardDuong(selectedAdBoard._id, { advertisingLicense_id: result.data._id });
        if (resultUpdate) {
          selectedAdBoard.advertisingLicense_id = result.data._id;
        }
        setUpdate(true);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Gửi thất bại.',
        description: "Hãy xem lại thông tin đơn yêu cầu.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
    onRequestLicenseClose();
  }
  const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em', marginTop: "15px" }}>{location.state.location.address}</h3>;
  return (
    <div style={{ width: "95%" }}>
      <Modal isOpen={isNormalOpen} onClose={onNormalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Yêu Cầu Chỉnh Sửa Bảng Quảng Cáo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedAdBoard && (
              <EditAdBoardForm
                info={selectedAdBoard}
                onClose={onNormalClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isRequestLicenseOpen} onClose={onRequestLicenseClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh Sửa Điểm Đặt Quảng Cáo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedAdBoard && (
              <AdvertisingLicenseRequestForm onSubmit={handleSubmitForm} adboardInfo={selectedAdBoard}></AdvertisingLicenseRequestForm>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onRequestLicenseClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {adBoard ? (
        <ToolkitProvider
          keyField="id"
          data={adBoard}
          columns={columns}
          search
        >
          {
            props => (
              <div>
                {id ? (<CaptionElement />) : <div />}
                <MySearch
                  {...props.searchProps}
                />
                <BootstrapTable
                  {...props.baseProps}
                  // caption={<CaptionElement/>}
                  pagination={paginationFactory(options)}
                  striped
                  bordered={false}
                />
              </div>
            )
          }
        </ToolkitProvider>
      ) : (
        null
      )
      }
    </div>
  )
}


export default TableQueryAdBoardByArea;




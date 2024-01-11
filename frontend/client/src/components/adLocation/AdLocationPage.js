import React from "react";
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
} from '@chakra-ui/react';
import { FaEye,FaPen } from "react-icons/fa";
import { useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import AdLocationsTable from "./AdLocationsTable";
import adLocationAPI from "../../apis/adLocationApi";
import AdBoardDetails from "./AdBoardDetails"; // Thêm import này
import EditAdLocationForm from "./EditAdLocationForm1";
import { useSelector } from "react-redux";
import EditLocationCBSo from "./EditLocationCBSo";


const AdLocationPage = () => {
  const userData = useSelector(state => state.auth.userData);
  const [adLocations, setAdLocations] = useState([]);
  const [type, setType] = useState('');
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [isDelete, setIsDelete] = useState(false);


  const [name, setName] = useState('');

  const { isOpen: isNormalOpen, onOpen: onNormalOpen, onClose: onNormalClose } = useDisclosure();
  const { isOpen: isCBSoOpen, onOpen: onCBSoOpen, onClose: onCBSoClose } = useDisclosure();
  const [update, setUpdate] = useState(true);

  const [showTable, setShowTable] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // const handleViewAdLocations = () => {
  //   adLocationAPI
  //     .getAllAdLocation()
  //     .then((response) => {
  //       setAdLocations(response.data);
  //       setShowTable(true);
  //     })
  //     .catch((error) => console.error("Error fetching ad locations:", error));
  // };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await adLocationAPI.getAllAdLocation();
            setAdLocations(result.data);
            setUpdate(false);

            console.log(type);

        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    // Call the fetchData function when the component mounts or when viewport changes
    fetchData();
  }, [update]);

  const handleDetailsClick = (locationId) => {
    navigate(`/ad-boards/${locationId}`);
  };

  const handleEditClick = (location) => {
    setSelectedLocation(location);
    if(userData.role === "CB-So"){
      onCBSoOpen();
    }
    else{
      onNormalOpen();
    }
  };

  const handleSubmit = (data) => {
    // Xử lý logic khi submit form
    console.log(data);
  };

  const columns = [
    {
      dataField: 'address',
      text: 'Address'
    }, 
    {
      dataField: 'area',
      text: 'Area'
    }, 
    {
      dataField: 'locationType',
      text: 'Location Type'
    }, 
    {
      dataField: 'action',
      isDummyField: true,
      text: 'Action',
      formatter: (cellContent, row) => {
        return(
          <div style={{display:"flex", alignItems:"center"}}>
          <Icon 
            variant="unstyled" 
            as={FaEye} 
            w={5} 
            h={5} 
            marginRight={5} 
            // marginLeft={2} 
            onClick={() => handleDetailsClick(row._id)}
            _hover={{color:'blue'}}
          />
          {/* <Icon 
            as={RiAdvertisementFill} 
            w={5}
            h={5}
            marginRight={5}
            onClick={
              () => navigate('/table-advertising-type',{state: { adType: row?.name }})
            }
            _hover={{color:'blue'}}
          /> */}
          <Icon 
            as={FaPen} 
            w={4} 
            h={4}
            marginRight={5}
            onClick={() => handleEditClick(row)}
            _hover={{color:'blue'}}
          />
          {/* <Icon 
            as={FaTrashAlt} 
            w={4} 
            h={4}
            marginRight={5}
            onClick={
              () => {
                setName(row?.name)
                setId(row?._id)
                setIsDelete(true)
                onNormalOpen()
              }
            }
            _hover={{color:'red'}}
          /> */}
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
      key={ text }
      role="presentation"
      className="dropdown-item"
    >
      <a
        href="#"
        tabIndex="-1"
        role="menuitem"
        data-page={ page }
        onMouseDown={ (e) => {
          e.preventDefault();
          onSizePerPageChange(page);
        } }
        style={ { display:"block",color: 'red', width:"100%" } }
      >
        { text }
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
          style={{marginTop:"20px", marginBottom:"15px"}}
          type="text"
          onChange={(event) => {
            props.onSearch(event.target.value)
          }}
          placeholder='Search'
          />
          <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
          <Button leftIcon={<CiCirclePlus size="20" />} justifyContent="flex-start" width="200px" colorScheme='teal' variant='solid' 
            onClick={() =>{
                navigate('/map')
              }
            }>
            Add
          </Button>
          </div>
        </div>
    );
  };
  const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em', marginTop:"15px" }}>Location Management</h3>;
  return (
    // <div>
    //   <Button onClick={handleViewAdLocations}>Xem Điểm Quảng Cáo</Button>
    //   {showTable && <AdLocationsTable adLocations={adLocations} />}
    //   {selectedLocationId && <AdBoardDetails locationId={selectedLocationId} />}
    // </div>
    <div style={{width:"95%"}}>
      <Modal isOpen={isNormalOpen} onClose={onNormalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh Sửa Điểm Đặt Quảng Cáo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedLocation && (
              <EditAdLocationForm
                adLocation={selectedLocation}
                onClose={onNormalClose}
                onSubmit={handleSubmit}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onNormalClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isCBSoOpen} onClose={onCBSoClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh Sửa Điểm Đặt Quảng Cáo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedLocation && (
              <EditLocationCBSo
                info = {selectedLocation}
                setUpdate= {setUpdate}
                onClose = {onCBSoClose}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCBSoClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {adLocations ? (
        <ToolkitProvider
          keyField="id"
          data={ adLocations }
          columns={ columns }
          search
        >
          {
            props => (
              <div>
                <CaptionElement/>
                <MySearch 
                  { ...props.searchProps } 
                />
                <BootstrapTable
                  { ...props.baseProps }
                  pagination={paginationFactory(options)} 
                  striped
                  rowStyle={{verticalAlign:"middle"}}
                  bordered= {false}
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
  );
};

export default AdLocationPage;

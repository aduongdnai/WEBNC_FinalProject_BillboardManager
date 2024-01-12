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
import EditAdBoardForm from './EditAdBoardForm';



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
  var id;
  const { isOpen: isNormalOpen, onOpen: onNormalOpen, onClose: onNormalClose } = useDisclosure();
  if (!props.area) id = location.state.location._id || "";
  else id = props.area;
  const navigate = useNavigate();
  // const { area } = useUser();
  const [adBoard, setAdBoard] = useState(null);
  const [selectedAdBoard, setSelectedAdBoard] = useState(null);

  // const { SearchBar } = Search;
  useEffect(() => {
    const fetchData = async () => {
      try {

        const result = await adBoardApi.getAdBoardByLocationID(id);
        const ans = result.data.map((element) => {
          return {
            ...element, expiryDate: new Date(element.expiryDate).toLocaleDateString()
          }
        })
        console.log(ans);
        setAdBoard(ans);
        console.log(adBoard);

      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };

    // Call the fetchData function when the component mounts or when viewport changes
    fetchData();
  }, []);


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

  useEffect(() => {
    console.log(id);
  });


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
      dataField: 'action',
      isDummyField: true,
      text: 'Action',
      formatter: (cellContent, row) => {
        return (
          <div style={{ display: "flex" }}>
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
            <Icon
              as={FaPen}
              w={4}
              h={4}
              onClick={() => handleEditClick(row)}
              _hover={{ color: 'blue' }}
            />
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




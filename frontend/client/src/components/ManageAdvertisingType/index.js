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
import { CiCirclePlus } from "react-icons/ci";
import { RiAdvertisementFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import advertisingTypeAPI from '../../apis/advertisingTypeApi';
import { useEffect, useState} from 'react';
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { useUser } from '../LoginSignup/userContext';
// import {PaginationTable} from "table-pagination-chakra-ui";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import ReportForm from './ReportForm';




function ManageAdvertisingType(){
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [update, setUpdate] = useState(true);
  const [id, setId] = useState('');

  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await advertisingTypeAPI.getAllType();
            setType(result.data);
            setUpdate(false);

            console.log(type);

        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    // Call the fetchData function when the component mounts or when viewport changes
    fetchData();
  }, [update]);

  useEffect(() =>{
    
  })


  const columns = [
    {
      dataField: 'name',
      text: 'Advertising Type'
    }, 
    {
      dataField: 'action',
      isDummyField: true,
      text: 'Action',
      formatter: (cellContent, row) => {
        return(
          <div style={{display:"flex", alignItems:"center"}}>
          {/* <Icon 
            variant="unstyled" 
            as={FaEye} 
            w={5} 
            h={5} 
            marginRight={5} 
            // marginLeft={2} 
            onClick={
              () => navigate('/manage-ward',{state: { district: row?.name }})
            }
            _hover={{color:'blue'}}
          /> */}
          <Icon 
            as={RiAdvertisementFill} 
            w={5}
            h={5}
            marginRight={5}
            onClick={
              () => navigate('/table-advertising-type',{state: { adType: row?.name }})
            }
            _hover={{color:'blue'}}
          />
          <Icon 
            as={FaPen} 
            w={4} 
            h={4}
            marginRight={5}
            onClick={
              () => {
                setName(row?.name)
                setId(row?._id)
                setIsDelete(false)
                onOpen()
              }
            }
            _hover={{color:'blue'}}
          />
          <Icon 
            as={FaTrashAlt} 
            w={4} 
            h={4}
            marginRight={5}
            onClick={
              () => {
                setName(row?.name)
                setId(row?._id)
                setIsDelete(true)
                onOpen()
              }
            }
            _hover={{color:'red'}}
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
                setName('')
                setId('')
                setIsDelete(false)
                onOpen()
              }
            }>
            Add
          </Button>
          </div>
        </div>
    );
  };

  const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em', marginTop:"15px" }}>Advertising Type</h3>;
    return(
      <div style={{width:"95%"}}>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{isDelete? ("Delete Type") : (name===''?("Add Type"):("Update Type"))}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ReportForm name={name} id={id} isDelete={isDelete} onClose={onClose} setUpdate={setUpdate}/> 
            </ModalBody>
          </ModalContent>
        </Modal>
        {type ? (
          <ToolkitProvider
            keyField="id"
            data={ type }
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
    )
}


export default ManageAdvertisingType;




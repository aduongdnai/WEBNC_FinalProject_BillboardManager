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
import { IoSearchOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { SiBillboard } from "react-icons/si";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import districtAPI from '../../apis/districtApi';
import { useEffect, useState} from 'react';
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { useUser } from '../LoginSignup/userContext';
// import {PaginationTable} from "table-pagination-chakra-ui";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';





function ManageDistrict(){
  const navigate = useNavigate();
  const { area } = useUser();
  const [district, setDistrict] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const fetchData = async () => {
        try {

            const result = await districtAPI.getAllDistrict();
            setDistrict(result.data);
            console.log(result);

        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    // Call the fetchData function when the component mounts or when viewport changes
    fetchData();
  }, []);


  const columns = [
    {
    dataField: 'name',
    text: 'District'
    }, 
    {
      dataField: 'action',
      isDummyField: true,
      text: 'Action',
      formatter: (cellContent, row) => {
        console.log(row.name);
        return(
          <div style={{display:"flex", alignItems:"center"}}>
          <Icon 
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
          />
          <Icon 
            as={FaPen} 
            w={4} 
            h={4}
            marginRight={5} 
            _hover={{color:'blue'}}
          />
          <Icon 
            as={FaTrashAlt} 
            w={4} 
            h={4}
            marginRight={5} 
            _hover={{color:'red'}}
          />
          <Icon 
            as={SiBillboard} 
            w={8} 
            h={8}
            _hover={{color:'blue'}}
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
      text: '2', value: 2
    }, {
      text: '4', value: 4
    }, {
      text: '6', value: 6
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
          <Button leftIcon={<CiCirclePlus size="20" />} justifyContent="flex-start" width="200px" colorScheme='teal' variant='solid' onClick={onOpen}>
            Add
          </Button>
          </div>
        </div>
    );
  };

  const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em', marginTop:"15px" }}>{area}</h3>;
    return(
      <div style={{width:"95%"}}>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add District</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        {district ? (
          <ToolkitProvider
            keyField="id"
            data={ district }
            columns={ columns }
            search
          >
            {
              props => (
                <div>
                  {area?(<CaptionElement/>):<div/>}
                  <MySearch 
                    { ...props.searchProps } 
                  />
                  <BootstrapTable
                    { ...props.baseProps }
                    pagination={paginationFactory(options)} 
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


export default ManageDistrict;




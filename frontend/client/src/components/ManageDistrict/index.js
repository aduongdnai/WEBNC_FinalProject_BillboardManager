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
  useToast
} from '@chakra-ui/react';
import { FaEye,FaPen } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { RiAdvertisementFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import districtAPI from '../../apis/districtApi';
import { useEffect, useState} from 'react';
import { useUser } from '../LoginSignup/userContext';
// import {PaginationTable} from "table-pagination-chakra-ui";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './styles.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import ReportForm from './ReportForm';
import axios from 'axios';




function ManageDistrict(){
  const navigate = useNavigate();
  const { area } = useUser();
  const [district, setDistrict] = useState(null);
  const [update, setUpdate] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
        try {

            const result = await districtAPI.getAllDistrict();
            setDistrict(result.data);
            setUpdate(false);
            console.log(result);

        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    // Call the fetchData function when the component mounts or when viewport changes
    fetchData();
  }, [update]);


  const columns = [
    {
    dataField: 'name',
    text: 'District',
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
          {/* <Icon 
            as={RiAdvertisementFill} 
            w={5}
            h={5}
            marginRight={5}
            onClick={
              () => navigate('/table-area',{state: { area: row?.name }})
            }
            _hover={{color:'blue'}}
          /> */}
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
            }
          >
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
            <ModalHeader>{name===''?("Add District"):("Update District")}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ReportForm name={name} id={id} isDelete={isDelete} onClose={onClose} setUpdate={setUpdate}/> 
            </ModalBody>
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
                    striped
                    bordered={false}
                    rowStyle={{verticalAlign:"middle"}}
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




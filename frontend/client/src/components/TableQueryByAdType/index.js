import {
    Icon,
} from '@chakra-ui/react';
import { FaEye,FaPen } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import adLocationAPI from '../../apis/adLocationApi';
import { useEffect, useState} from 'react';
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { useUser } from '../LoginSignup/userContext';
// import {PaginationTable} from "table-pagination-chakra-ui";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';



function imageFormatter(cell, row, rowIndex){
  return (
    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
      <CloudinaryImage key={rowIndex} publicId={row.image} width="150" height="150" />
    </CloudinaryContext>
  )
}




function TableQueryByAdType(){
  const location = useLocation();
  const adType = location.state.adType || "";
  const navigate = useNavigate();
  // const { area } = useUser();
  const [adLocation, setAdLocation] = useState(null);
  // const { SearchBar } = Search;
  useEffect(() => {
    const fetchData = async () => {
        try {

            const result = await adLocationAPI.getAdLocationByAdType({"area": adType});
            setAdLocation(result.data);
            console.log(adLocation);

        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    // Call the fetchData function when the component mounts or when viewport changes
    fetchData();
  }, []);


  useEffect(() =>{
    console.log(adType);
  });


  const columns = [
    {
      dataField: 'image',
      text: 'Image',
      formatter: imageFormatter
    },
    {
    dataField: 'address',
    text: 'Address'
    }, 
    {
      dataField: 'locationType',
      text: 'locationType'
    }, 
    {
      dataField: 'advertisingType',
      text: 'advertisingType'
    },
    {
      dataField: 'planned',
      text: 'Planned'
    },
    {
      dataField: 'action',
      isDummyField: true,
      text: 'Action',
      formatter: (cellContent, row) => {
        return(
          <div style={{display:"flex"}}>
          <Icon 
            variant="unstyled" 
            as={FaEye} 
            w={5} 
            h={5} 
            marginRight={5} 
            // marginLeft={2} 
            onClick={
              () => navigate('/')
            }
            _hover={{color:'blue'}}
          />
          <Icon 
            as={FaPen} 
            w={4} 
            h={4}
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
        </div>
    );
  };

  const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em', marginTop:"15px" }}>{adType}</h3>;
    return(
      <div style={{width:"95%"}}>
        {adLocation ? (
          <ToolkitProvider
            keyField="id"
            data={ adLocation }
            columns={ columns }
            search
          >
            {
              props => (
                <div>
                  {adType?(<CaptionElement/>):<div/>}
                  <MySearch 
                    { ...props.searchProps } 
                  />
                  <BootstrapTable
                    { ...props.baseProps }
                    // caption={<CaptionElement/>}
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


export default TableQueryByAdType;




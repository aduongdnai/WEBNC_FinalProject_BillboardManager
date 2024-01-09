import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  IconButton,
  Icon,
  Link,
  Text,
} from '@chakra-ui/react';
import { FaEye, FaPen } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import adLocationAPI from '../../apis/adLocationApi';
import { useEffect, useState } from 'react';
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { useUser } from '../LoginSignup/userContext';
// import {PaginationTable} from "table-pagination-chakra-ui";
import PaginationTable from './pagination';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';



function imageFormatter(cell, row, rowIndex) {
  return (
    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
      <CloudinaryImage key={rowIndex} publicId={row.image} width="150" height="150" />
    </CloudinaryContext>
  )
}




function ManageWardAndDistrict() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const navigate = useNavigate();
  const { area } = useUser();
  const [adLocation, setAdLocation] = useState(null);
  const { SearchBar } = Search;
  useEffect(() => {
    const fetchData = async () => {
      try {

        const result = await adLocationAPI.getAdLocationByArea({ "area": area });

        setAdLocation(result.data);
        console.log(adLocation);

      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };

    // Call the fetchData function when the component mounts or when viewport changes
    fetchData();
  }, []);


  useEffect(() => {
    console.log(area);
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
        return (
          <div style={{ display: "flex" }}>
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
              _hover={{ color: 'blue' }}
            />
            <Icon
              as={FaPen}
              w={4}
              h={4}
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
      text: '2', value: 2
    }, {
      text: '4', value: 4
    }, {
      text: '6', value: 6
    }],
  }

  const MySearch = (props) => {
    let input;
    const handleClick = () => {
      props.onSearch(input.value);
    };
    return (
      <div className="form-group has-search">
        <span className="form-control-feedback">
          <Icon as={IoSearchOutline}></Icon>
        </span>
        <input
          className="form-control"
          ref={n => input = n}
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

  const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em', marginTop: "15px" }}>{area}</h3>;
  return (
    // <TableContainer>
    //   <Table variant='simple' __css={{'table-layout': 'fixed', width: 'full'}}>
    //     <TableCaption placement='top'>{area}</TableCaption>
    //     <Thead>
    //       <Tr>
    //         <Th>Image</Th>
    //         <Th>Address</Th>
    //         <Th>Location Type</Th>
    //         <Th>Advertising Type</Th>
    //         <Th>Planned</Th>
    //         <Th>Action</Th>
    //       </Tr>
    //     </Thead>
    //     <Tbody>
    //       {adLocation?.map((location,idx) => (
    //         <Tr height={10}>
    //           <Td>
    //             <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
    //               <CloudinaryImage key={idx} publicId={location.image} width="150" height="150" />
    //             </CloudinaryContext>
    //           </Td>
    //           <Td whiteSpace='pre-wrap' overflowWrap='break-word'>
    //             <Text noOfLines={2}>
    //               {location.address}
    //             </Text>
    //           </Td>
    //           <Td whiteSpace='pre-wrap' overflowWrap='break-word'>
    //             <Text noOfLines={2}>
    //               {location.locationType}
    //             </Text>
    //           </Td>
    //           <Td whiteSpace='pre-wrap' overflowWrap='break-word'>
    //             <Text noOfLines={2}>
    //               {location.advertisingType}
    //             </Text>
    //           </Td>
    //           <Td>{location.planned}</Td>
    //           <Td>
    //             <Icon 
    //               variant="unstyled" 
    //               as={FaEye} 
    //               w={5} 
    //               h={5} 
    //               marginRight={5} 
    //               marginLeft={2} 
    //               onClick={
    //                 () => navigate('/')
    //               }
    //               _hover={{color:'blue'}}
    //             />
    //             <Icon 
    //               as={FaPen} 
    //               w={4} 
    //               h={4}
    //               _hover={{color:'blue'}}
    //             />
    //           </Td>
    //         </Tr>
    //       ))
    //       .slice(pageSize * pageIndex, pageSize * (pageIndex + 1))
    //       }
    //     </Tbody>
    //     {/* <Tfoot>

    //     </Tfoot> */}
    //   </Table>
    //   <PaginationTable
    //     pageSize={pageSize}
    //     setPageSize={setPageSize}
    //     pageIndex={pageIndex}
    //     setPageIndex={setPageIndex}
    //     totalItemsCount={adLocation?.length}
    //     pageSizeOptions={[2, 4, 6]}
    //   />
    // </TableContainer>

    <div style={{ width: "95%" }}>
      {adLocation ? (
        <ToolkitProvider
          keyField="id"
          data={adLocation}
          columns={columns}
          search
        >
          {/* <BootstrapTable 
              keyField='id' 
              data={adLocation} 
              caption={<CaptionElement/>}
              columns={columns} 
              pagination={paginationFactory(options)} 
              bordered= {false}
            /> */}
          {
            props => (
              <div>
                {area ? (<CaptionElement />) : <div />}
                <MySearch
                  {...props.searchProps}
                />
                <BootstrapTable
                  {...props.baseProps}
                  // caption={<CaptionElement/>}
                  pagination={paginationFactory(options)}
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


export default ManageWardAndDistrict;




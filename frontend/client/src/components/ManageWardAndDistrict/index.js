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
import { FaEye,FaPen } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import adLocationAPI from '../../apis/adLocationApi';
import { useEffect, useState} from 'react';
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { useUser } from '../LoginSignup/userContext';
// import {PaginationTable} from "table-pagination-chakra-ui";
import PaginationTable from './pagination';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.min.css';







function ManageWardAndDistrict(){
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const navigate = useNavigate();
  const { username, area, logout } = useUser();
  const [adLocation, setAdLocation] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
        try {

            const result = await adLocationAPI.getAdLocationByArea({"area": area});
            setAdLocation(result.data);
            console.log(adLocation);

        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    // Call the fetchData function when the component mounts or when viewport changes
    fetchData();
  }, []);


  const columns = [{
    dataField: 'address',
    text: 'Address'
  }, {
    dataField: 'locationType',
    text: 'locationType'
  }, {
    dataField: 'advertisingType',
    text: 'advertisingType'
  }];
  const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Component as Header</h3>;
    return(
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
      
      <div>
        {adLocation ? (
            <BootstrapTable 
              keyField='id' 
              data={adLocation} 
              caption={<CaptionElement/>}
              columns={columns} 
              pagination={paginationFactory()} 
            />
          ) : (
            null
          )
        }
      </div>
    )
}


export default ManageWardAndDistrict




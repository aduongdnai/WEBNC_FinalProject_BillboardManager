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




function ManageWardAndDistrict(){
  const navigate = useNavigate();
  const [adLocation, setAdLocation] = useState(null);
  console.log(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
  useEffect(() => {
    const fetchData = async () => {
        try {

            const result = await adLocationAPI.getAdLocationByArea({"area": "Phường 4, Quận 5, Hồ Chí Minh"});
            setAdLocation(result.data);
            console.log(adLocation);

        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };

    // Call the fetchData function when the component mounts or when viewport changes
    fetchData();
  }, []);
    return(
      <TableContainer>
        <Table variant='simple' __css={{'table-layout': 'fixed', width: 'full'}}>
          <TableCaption placement='top'>Phường 4, Quận 5, Hồ Chí Minh</TableCaption>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Address</Th>
              <Th>Location Type</Th>
              <Th>Advertising Type</Th>
              <Th>Planned</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {adLocation?.map((location,idx) => (
              <Tr height={10}>
                <Td>
                  <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
                    <CloudinaryImage key={idx} publicId={location.image} width="150" height="150" />
                  </CloudinaryContext>
                </Td>
                <Td whiteSpace='pre-wrap' overflowWrap='break-word'>
                  <Text noOfLines={2}>
                    {location.address}
                  </Text>
                </Td>
                <Td whiteSpace='pre-wrap' overflowWrap='break-word'>
                  <Text noOfLines={2}>
                    {location.locationType}
                  </Text>
                </Td>
                <Td whiteSpace='pre-wrap' overflowWrap='break-word'>
                  <Text noOfLines={2}>
                    {location.advertisingType}
                  </Text>
                </Td>
                <Td>{location.planned}</Td>
                <Td>
                  <Icon 
                    variant="unstyled" 
                    as={FaEye} 
                    w={5} 
                    h={5} 
                    marginRight={5} 
                    marginLeft={2} 
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
                </Td>
              </Tr>
            ))}
            {/* <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td>
                <Icon 
                  variant="unstyled" 
                  as={FaEye} 
                  w={5} 
                  h={5} 
                  marginRight={5} 
                  marginLeft={2} 
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
              </Td>
            </Tr> */}
          </Tbody>
          <Tfoot>
            
          </Tfoot>
        </Table>
      </TableContainer>
    )
}


export default ManageWardAndDistrict
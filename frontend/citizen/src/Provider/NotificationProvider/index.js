import React from "react";
import { useDispatch } from "react-redux";
import { setViewport, } from '../../components/actions/viewportAction'
import { useNavigate } from "react-router-dom";

const NotificationProvider = ({ children, report, isClick }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeViewport = async (report) => {
        if (report.type === 'adboard') {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/v1/adboards/find/${report.reference_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch ad board details');
                }
    
                const adboardDetails = await response.json();
                const response2 = await fetch(`http://127.0.0.1:5000/api/v1/adlocations/${adboardDetails.data[0].location_id}`);
                if (!response2.ok) {
                    throw new Error('Failed to fetch ad board details');
                }
                const locationDetails = await response2.json();
                console.log(locationDetails.data[0].coordinates);
                navigate("/");
                const newViewport = {
                    latitude: locationDetails.data[0].coordinates.coordinates[1],
                    longitude: locationDetails.data[0].coordinates.coordinates[0],
                    zoom: 20,
                    transitionDuration: 2000, // Adjust the zoom level as needed
    
                };
    
                dispatch(setViewport(newViewport));
    
            } catch (error) {
                console.error('Error fetching ad board details:', error.message);
            }
        }else{
            try {
                const response2 = await fetch(`http://127.0.0.1:5000/api/v1/adlocations/${report.reference_id}`);
                if (!response2.ok) {
                    throw new Error('Failed to fetch ad board details');
                }
                const locationDetails = await response2.json();
                console.log(locationDetails.data[0].coordinates);
                navigate("/");
                const newViewport = {
                    latitude: locationDetails.data[0].coordinates.coordinates[1],
                    longitude: locationDetails.data[0].coordinates.coordinates[0],
                    zoom: 20,
                    transitionDuration: 2000, // Adjust the zoom level as needed
    
                };
    
                dispatch(setViewport(newViewport));
            } catch (error) {
                console.error('Error fetching location details:', error.message);
            }
        }
        

    }

    React.useEffect(() => {
        if (isClick === true) {
          changeViewport(report);
        }
      }, [isClick, report]);
        



return <>{children}</>;
};

export default NotificationProvider;

import React from 'react';

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ReactMapGL, {
    GeolocateControl, NavigationControl, Source,
    FullscreenControl, ScaleControl, Popup, Layer
} from '@goongmaps/goong-map-react'
import Pins from '../Pin';
import LocationInfo from './locationInfo';
import PlannedLocationInfo from './plannedLocationInfo';
import SearchBox from '../SearchBox';
import { setViewport } from '../actions/viewportAction'
import '@goongmaps/goong-geocoder-react/dist/goong-geocoder.css'
import mapAPI from '../../apis/mapApi';
import adLocationAPI from '../../apis/adLocationApi';
import Pin from '../Pin';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer, unclusteredPointTextLayer } from './layer';
import FilterOverlay from '../FilterOverlay';


function Map(props) {
    const [popupInfo, setPopupInfo] = useState(null);
    const [plannedPopupInfo, setPlannedPopupInfo] = useState(null);
    const [adLocation, setAdLocation] = useState(null);
    const [geoJsonAdLocation, setGeoJsonAdLocation] = useState(null);
    const [filters, setFilters] = useState({ planned: false, reported: false });
    const viewport = useSelector(state => state.viewport)
    const dispatch = useDispatch()
    const mapRef = useRef(null);
    const geolocateStyle = {
        right: 10,
        top: 180
    };
    const fullscreenControlStyle = {
        top: 36,
        right: 0,
        padding: '10px'
    };

    const navStyle = {
        top: 72,
        right: 0,
        padding: '10px'
    };

    const scaleControlStyle = {
        bottom: 36,
        left: 0,
        padding: '10px'
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(filters);
                const result = await adLocationAPI.getAdLocationByFilters(filters);
                setAdLocation(result.data);
                const geojson = {
                    type: 'FeatureCollection',
                    features: result.data.map((adLocation) => {
                        const rp = JSON.parse(localStorage.getItem(`report_${adLocation._id}`)) || { isReported: false };
                        const adjust_rp = { ...rp, rp_id: rp._id }
                        delete adjust_rp._id;
                        return {
                            type: 'Feature',
                            geometry: adLocation.coordinates,
                            properties: {
                                ...adLocation,
                                ...adjust_rp,

                            }
                        };
                    })
                };
                const filteredFeaturesGeojson = filters.reported ? geojson.features.filter((adLocation) => adLocation.properties.isReported === false) : geojson.features;
                //console.log("geojson", filteredFeaturesGeojson);
                const filteredGeojson = {
                    type: 'FeatureCollection',
                    features: filteredFeaturesGeojson
                };
                setGeoJsonAdLocation(filteredGeojson);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts or when viewport changes
        fetchData();
    }, [filters]);
    const handleGeocoderViewportChange = (newViewport) => {
        const viewportData = {
            latitude: newViewport.latitude,
            longitude: newViewport.longitude,
            zoom: newViewport.zoom,
            transitionDuration: 0
        }
        dispatch(setViewport(viewportData));


    };


    const onClickMap = async event => {
        event.preventDefault();
        //console.log(event);
        const address = await mapAPI.geoCodeToAddress(event.lngLat[1], event.lngLat[0])
        const area = `${address.results[0].compound.commune}, ${address.results[0].compound.district}, ${address.results[0].compound.province}`

        setPopupInfo({
            longitude: event.lngLat[0],
            latitude: event.lngLat[1],
            planned: false,
            address: address.results[0].formatted_address,
            area: area,
            location: address.results[0].geometry.location,
        })
    }

    const handleOnClickPin = (location) => {
        setPlannedPopupInfo({
            ...location,
            longitude: location.coordinates.coordinates[0],
            latitude: location.coordinates.coordinates[1],
            address: location.address,
            area: location.area,

        })
    }
    const handleClick = (event) => {
        const clickedFeature = event.features.find(
            (feature) => feature.layer.id === unclusteredPointLayer.id
        );

        if (clickedFeature) {
            // Get a property from the clicked feature
            const property = clickedFeature.properties;
            console.log("properties: ", property);
            const coordinates = JSON.parse(property.coordinates);

            setPlannedPopupInfo({
                ...property,
                longitude: coordinates.coordinates[0],
                latitude: coordinates.coordinates[1],


            })
        }
    };


    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        console.log("change", filters);
    };
    return (
        <div>
            <ReactMapGL
                ref={mapRef}
                {...viewport}
                width="100vw"
                height="100vh"
                onViewportChange={handleGeocoderViewportChange}
                goongApiAccessToken={"9fzxhKjU16UdOtYirE5ceN2FOd7M9ERVA3zQ3WAD"}
                attributionControl={true}
                onContextMenu={onClickMap}
                onClick={handleClick}
                interactiveLayerIds={[unclusteredPointLayer.id]}>
                <Source
                    id="adlocations"
                    type="geojson"
                    data={geoJsonAdLocation}
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                    <Layer {...unclusteredPointLayer} />
                    <Layer {...unclusteredPointTextLayer} />
                </Source>
                {/* <Pin data={adLocation} onClick={handleOnClickPin}> </Pin> */}
                <SearchBox />


                {popupInfo && (
                    <Popup
                        tipSize={5}
                        anchor="top"
                        longitude={popupInfo.longitude}
                        latitude={popupInfo.latitude}
                        closeOnClick={false}
                        onClose={setPopupInfo}
                    >
                        <LocationInfo info={popupInfo} />
                    </Popup>
                )}
                {plannedPopupInfo && (
                    <Popup
                        tipSize={5}
                        anchor="top"
                        longitude={plannedPopupInfo.longitude}
                        latitude={plannedPopupInfo.latitude}
                        closeOnClick={false}
                        onClose={setPlannedPopupInfo}
                    >
                        <PlannedLocationInfo info={plannedPopupInfo} />
                    </Popup>
                )}
                <FilterOverlay onFilterChange={handleFilterChange} />
                <GeolocateControl style={geolocateStyle} />
                <FullscreenControl style={fullscreenControlStyle} />
                <NavigationControl style={navStyle} />
                <ScaleControl style={scaleControlStyle} />
            </ReactMapGL>


        </div >
    );
}

export default Map;
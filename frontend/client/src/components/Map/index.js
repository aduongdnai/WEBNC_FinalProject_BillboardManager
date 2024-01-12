import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ReactMapGL, { GeolocateControl, NavigationControl, FullscreenControl, ScaleControl, Popup, Source, Layer } from '@goongmaps/goong-map-react'
import LocationInfo from './locationInfo';
import PlannedLocationInfo from './plannedLocationInfo';
import SearchBox from '../SearchBox';
import { setViewport } from '../actions/viewportAction'
import '@goongmaps/goong-geocoder-react/dist/goong-geocoder.css'
import mapAPI from '../../apis/mapApi';
import adLocationAPI from '../../apis/adLocationApi';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer, unclusteredPointTextLayer } from './layer';
import FilterOverlay from '../FilterOverlay';
import reportApi from '../../apis/reportApi';
import ReportLocationInfo from './reportLocationInfo';
import Pin from '../Pin';



function Map(props) {
    const [popupInfo, setPopupInfo] = useState(null);
    const [plannedPopupInfo, setPlannedPopupInfo] = useState(null);
    const [reportLocationInfo, setReportLocationInfo] = useState(null);
    const [reportLocations, setReportLocations] = useState(null);
    const [geoJsonAdLocation, setGeoJsonAdLocation] = useState(null);
    const viewport = useSelector(state => state.viewport)
    const dispatch = useDispatch()
    const mapRef = useRef(null);
    const [filters, setFilters] = useState({ planned: true, reported: true });
    const user = useSelector(state => state.auth.userData);
    const userArea = localStorage.getItem("userArea") || "";
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("userArea: ", userArea);
                const result = await adLocationAPI.getAdLocationByArea({ area: userArea });
                const reportResult = await reportApi.getReportByType("plannedLocation", userArea);
                console.log(reportResult.data);
                setReportLocations(reportResult.data);
                const features = await Promise.all(result.data.map(async (adLocation) => {
                    const hasAdBoard = await adLocationAPI.doesAdLocationHaveAdBoard(adLocation._id);

                    return {
                        type: 'Feature',
                        geometry: adLocation.coordinates,
                        properties: {
                            ...adLocation,
                            hasAdBoard: hasAdBoard
                        }
                    };
                }));

                const geojson = {
                    type: 'FeatureCollection',
                    features: features
                };
                if (!filters.planned) {
                    geojson.features = []
                }

                setGeoJsonAdLocation(geojson);
                setUpdate(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts or when viewport changes
        fetchData();
    }, [filters.planned, update]);
    const handleGeocoderViewportChange = (newViewport) => {
        const viewportData = {
            latitude: newViewport.latitude,
            longitude: newViewport.longitude,
            zoom: newViewport.zoom,
            transitionDuration: 0
        }
        dispatch(setViewport(viewportData));


    };
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
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);

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
        setReportLocationInfo({
            ...location,
            longitude: location.longitude,
            latitude: location.latitude,
            planned: true,
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
            //console.log("properties: ", property);
            const coordinates = JSON.parse(property.coordinates);

            setPlannedPopupInfo({
                ...property,
                longitude: coordinates.coordinates[0],
                latitude: coordinates.coordinates[1],


            })
        }
    };
    return (
        <div>
            <ReactMapGL
                ref={mapRef}
                {...viewport}
                width="96vw"
                height="100vh"
                onViewportChange={handleGeocoderViewportChange}
                goongApiAccessToken={"9fzxhKjU16UdOtYirE5ceN2FOd7M9ERVA3zQ3WAD"}
                attributionControl={true}
                onContextMenu={onClickMap}
                interactiveLayerIds={[unclusteredPointLayer.id]}
                onClick={handleClick}>
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
                {filters.reported && (
                    <Pin data={reportLocations} onClick={handleOnClickPin} filter={filters.reported}> </Pin>

                )}
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
                        <LocationInfo info={popupInfo} setUpdate={setUpdate} />
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
                {reportLocationInfo && (

                    <Popup
                        tipSize={5}
                        anchor="top"
                        longitude={reportLocationInfo.longitude}
                        latitude={reportLocationInfo.latitude}
                        closeOnClick={false}
                        onClose={setReportLocationInfo}
                    >
                        <ReportLocationInfo info={reportLocationInfo} />
                    </Popup>
                )}
                <FilterOverlay onFilterChange={handleFilterChange}></FilterOverlay>
                <GeolocateControl style={geolocateStyle} />
                <FullscreenControl style={fullscreenControlStyle} />
                <NavigationControl style={navStyle} />
                <ScaleControl style={scaleControlStyle} />
            </ReactMapGL>


        </div >
    );
}

export default Map;
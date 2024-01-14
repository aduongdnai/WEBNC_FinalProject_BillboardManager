import React from 'react';

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import ReactMapGL, {
    GeolocateControl, NavigationControl, Source,
    FullscreenControl, ScaleControl, Popup, Layer
} from '@goongmaps/goong-map-react'
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
import ReportLocationInfo from './reportLocationInfo';
import reportApi from '../../apis/reportApi';


function Map(props) {
    const [popupInfo, setPopupInfo] = useState(null);
    const [plannedPopupInfo, setPlannedPopupInfo] = useState(null);
    const [adLocation, setAdLocation] = useState(null);
    const [reportLocationInfo, setReportLocationInfo] = useState(null);
    const [geoJsonAdLocation, setGeoJsonAdLocation] = useState(null);
    const [filters, setFilters] = useState({ planned: true, reported: false });
    const viewport = useSelector(state => state.viewport)
    let reportLocations = useSelector(state => state.report.reportLocations)
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

                const result = await adLocationAPI.getAllAdLocation();
                setAdLocation(result.data);
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

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function when the component mounts or when viewport changes
        fetchData();
    }, [filters, reportLocations]);
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

    const handleOnClickPin = (report) => {
        console.log(report);
        setReportLocationInfo({
            ...report,
            longitude: report.longitude,
            latitude: report.latitude,
            address: report.address,
            area: report.area,

        })
    }
    const handleClick = (event) => {
        if (event.srcEvent.button === 2) {
            return;
        }
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
import React from 'react';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import ReactMapGL, { AttributionControl, GeolocateControl, NavigationControl, FullscreenControl, ScaleControl, Popup } from '@goongmaps/goong-map-react'
import * as d3 from 'd3-ease'
import { flyTo } from './viewportTransition';
import ControlPanel from './control-panel';
import Pins from '../Pin';
import CityInfo from './city-info';
import CITIES from './cities.json';
import SearchBox from '../SearchBox';
import '@goongmaps/goong-geocoder-react/dist/goong-geocoder.css'
Map.propTypes = {

};

function Map(props) {
    const [popupInfo, setPopupInfo] = useState(null);
    const [viewport, setViewport] = useState({

        latitude: 10.78604,
        longitude: 106.70123,
        zoom: 8
    })
    const mapRef = useRef(null);
    const goToDNC = () => {
        setViewport(flyTo(11.055265614, 107.189669004, 14)
        );
    };
    const addMarker = (e) => {

    }
    const geolocateStyle = {
        right: 10,
        bottom: 0
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
    const handleGeocoderViewportChange = (newViewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };
        setViewport({ ...newViewport, ...geocoderDefaultOverrides });
    };
    return (
        <div>
            <ReactMapGL
                ref={mapRef}
                {...viewport}
                width="100vw"
                height="80vh"
                onViewportChange={setViewport}
                goongApiAccessToken={"9fzxhKjU16UdOtYirE5ceN2FOd7M9ERVA3zQ3WAD"}
                attributionControl={true} >
                <SearchBox></SearchBox>
                <Pins data={CITIES} onClick={setPopupInfo} />

                {popupInfo && (
                    <Popup
                        tipSize={5}
                        anchor="top"
                        longitude={popupInfo.longitude}
                        latitude={popupInfo.latitude}
                        closeOnClick={false}
                        onClose={setPopupInfo}
                    >
                        <CityInfo info={popupInfo} />
                    </Popup>
                )}

                <GeolocateControl style={geolocateStyle} />
                <FullscreenControl style={fullscreenControlStyle} />
                <NavigationControl style={navStyle} />
                <ScaleControl style={scaleControlStyle} />
            </ReactMapGL>


        </div >
    );
}

export default Map;
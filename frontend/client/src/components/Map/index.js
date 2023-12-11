import React from 'react';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import ReactMapGL, { AttributionControl, GeolocateControl, NavigationControl, FullscreenControl, ScaleControl, Popup } from '@goongmaps/goong-map-react'
import * as d3 from 'd3-ease'
import { flyTo } from './viewportTransition';
import Pins from '../Pin';
import CityInfo from './locationInfo';
import SearchBox from '../SearchBox';
import '@goongmaps/goong-geocoder-react/dist/goong-geocoder.css'
import mapAPI from '../../apis/mapApi';
Map.propTypes = {

};

function Map(props) {
    const [popupInfo, setPopupInfo] = useState(null);
    const [viewport, setViewport] = useState({

        latitude: 10.78604,
        longitude: 106.70123,
        zoom: 12
    })
    const mapRef = useRef(null);

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

    const onClickMap = async event => {
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
    const CITIES = {}
    return (
        <div>
            <ReactMapGL
                ref={mapRef}
                {...viewport}
                width="100vw"
                height="100vh"
                onViewportChange={setViewport}
                goongApiAccessToken={"9fzxhKjU16UdOtYirE5ceN2FOd7M9ERVA3zQ3WAD"}
                attributionControl={true}
                onClick={onClickMap} >
                <SearchBox></SearchBox>


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
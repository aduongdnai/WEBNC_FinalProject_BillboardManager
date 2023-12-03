import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ReactMapGL from '@goongmaps/goong-map-react'
Map.propTypes = {
    
};

function Map(props) {
    const [viewport,setViewport]=useState({
        width: 1000,
        height: 800,
        latitude: 10.78604,
        longitude: 106.70123,
        zoom:8
    })
    return (
        <div>
            <ReactMapGL {...viewport} 
            onViewportChange={setViewport}
            goongApiAccessToken={"9fzxhKjU16UdOtYirE5ceN2FOd7M9ERVA3zQ3WAD"} >
            
            </ReactMapGL>
        </div>
    );
}

export default Map;
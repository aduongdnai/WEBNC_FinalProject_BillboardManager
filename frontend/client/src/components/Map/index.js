import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ReactMapGL, { FlyToInterpolator } from '@goongmaps/goong-map-react'
import * as d3 from 'd3-ease'
import { flyTo } from './viewportTransition';
Map.propTypes = {

};

function Map(props) {
    const [viewport, setViewport] = useState({

        latitude: 10.78604,
        longitude: 106.70123,
        zoom: 8
    })
    const goToDNC = () => {
        setViewport(flyTo(11.055265614, 107.189669004, 14)
        );
    };
    const addMarker = () => {

    }
    return (
        <div>
            <ReactMapGL

                {...viewport}
                width="100vw"
                height="100vh"
                onViewportChange={setViewport}
                goongApiAccessToken={"9fzxhKjU16UdOtYirE5ceN2FOd7M9ERVA3zQ3WAD"} >
                onClick={ }
            </ReactMapGL>
            <button onClick={goToDNC}>Dong Nai City</button>
        </div>
    );
}

export default Map;
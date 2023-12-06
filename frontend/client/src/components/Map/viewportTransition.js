import * as d3 from 'd3-ease'
import { FlyToInterpolator } from '@goongmaps/goong-map-react'

export const flyTo = (lat, long, zoom) => {
    return {
        longitude: long,
        latitude: lat,
        zoom: zoom,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: d3.easeCubic
    }
}
const initialState = {
    latitude: 10.78604,
    longitude: 106.70123,
    zoom: 8,
    transitionDuration: 0,

}
const viewportReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VIEWPORT': {
            return {
                ...state,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                zoom: action.payload.zoom,
                transitionDuration: action.payload.transitionDuration
            }
        }
        default:
            return state
    }
}
export default viewportReducer
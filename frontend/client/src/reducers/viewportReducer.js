const initialState = {
    latitude: 10.78604,
    longitude: 106.70123,
    zoom: 8,


}
const viewportReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VIEWPORT': {
            return {
                ...state,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                zoom: action.payload.zoom
            }
        }
        default:
            return state
    }
}
export default viewportReducer
const initialState = {
    reports: JSON.parse(localStorage.getItem('report')) || [],
    reportLocations: JSON.parse(localStorage.getItem('reportLocation')) || [],
};

const reportReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_REPORT':
            return {
                ...state,
                reports: [...state.reports, action.payload],
            };
        case 'UPDATE_REPORT':
            console.log(action.payload);
            return {
                ...state,
                reports: state.reports.map(report =>
                    report._id === action.payload._id ? action.payload : report
                ),
            };
        case 'UPDATE_REPORT_LOCATION':
            console.log(action.payload);
            return {
                ...state,
                reports: state.reportLocations.map(report =>
                    report._id === action.payload._id ? action.payload : report
                ),
            };
        case 'GET_ALL_REPORTS':
            return state.reports;
        case 'ADD_REPORT_LOCATION':
            return {
                ...state,
                reportLocations: [...state.reportLocations, action.payload],
            };
        default:
            return state;
    }
};

export default reportReducer;

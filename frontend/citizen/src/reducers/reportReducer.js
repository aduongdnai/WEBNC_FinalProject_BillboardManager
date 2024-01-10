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
            return {
                ...state,
                reports: state.reports.map(report =>
                    report.id === action.payload.id ? action.payload : report
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

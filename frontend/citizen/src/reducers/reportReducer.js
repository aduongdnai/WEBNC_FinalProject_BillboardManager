const initialState = {
    reports: JSON.parse(localStorage.getItem('report')) || [],
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
        default:
            return state;
    }
};

export default reportReducer;

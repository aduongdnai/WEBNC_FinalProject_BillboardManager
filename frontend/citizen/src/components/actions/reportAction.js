// redux/actions.js

// Action Types
export const ADD_REPORT = 'ADD_REPORT';
export const UPDATE_REPORT = 'UPDATE_REPORT';
export const GET_ALL_REPORTS = 'GET_ALL_REPORTS';
export const ADD_REPORT_LOCATION = 'ADD_REPORT_LOCATION';
export const UPDATE_REPORT_LOCATION = 'UPDATE_REPORT_LOCATION';
// Action Creators
export const addReport = (report) => ({
  type: ADD_REPORT,
  payload: report,
});

export const updateReport = (updatedReport) => ({
  type: UPDATE_REPORT,
  payload: updatedReport,
});
export const updateReportLocation = (updatedReport) => ({
  type: UPDATE_REPORT_LOCATION,
  payload: updatedReport,
});
export const getAllReports = () => ({
  type: GET_ALL_REPORTS,
});
export const addReportLocation = (report) => ({
  type: ADD_REPORT_LOCATION,
  payload: report,
});

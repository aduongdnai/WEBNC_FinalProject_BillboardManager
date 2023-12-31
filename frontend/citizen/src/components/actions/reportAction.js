// redux/actions.js

// Action Types
export const ADD_REPORT = 'ADD_REPORT';
export const UPDATE_REPORT = 'UPDATE_REPORT';
export const GET_ALL_REPORTS = 'GET_ALL_REPORTS';

// Action Creators
export const addReport = (report) => ({
  type: ADD_REPORT,
  payload: report,
});

export const updateReport = (updatedReport) => ({
  type: UPDATE_REPORT,
  payload: updatedReport,
});

export const getAllReports = () => ({
  type: GET_ALL_REPORTS,
});

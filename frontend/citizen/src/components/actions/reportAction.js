// redux/actions.js

// Action Types
export const ADD_REPORT = 'ADD_REPORT';
export const UPDATE_REPORT = 'UPDATE_REPORT';
export const GET_ALL_REPORTS = 'GET_ALL_REPORTS';
export const GET_REPORT_BY_ID = 'GET_REPORT_BY_ID';

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

export const getReportById = (reportId) => ({
  type: GET_REPORT_BY_ID,
  payload: reportId,
});

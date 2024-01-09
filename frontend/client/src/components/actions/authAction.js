export const loginSuccess = (accessToken, rfToken, userData) => ({
    type: 'LOGIN_SUCCESS',
    payload: { accessToken, rfToken, userData },
});
export const logout = () => ({
    type: 'LOGOUT',
});
export const updateAccessToken = (accessToken) => ({
    type: 'UPDATE_ACCESS_TOKEN',
    payload: {accessToken}
});
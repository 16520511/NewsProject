export const USER_LOG_OUT = 'USER_LOG_OUT';
export const USER_LOG_IN = 'USER_LOG_IN';

export const logOut = () => dispatch => {
    dispatch({
        type: USER_LOG_OUT,
        payload: false
    });
}

export const logIn = () => dispatch => {
    dispatch({
        type: USER_LOG_IN,
        payload: true
    });
}
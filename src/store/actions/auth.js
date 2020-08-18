import * as actionTypes from './actionTypes';
import axios from 'axios';

// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWpHVYlbXncNslskIvv-Vb4KD_2wU2njo

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: data
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authSignup = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWpHVYlbXncNslskIvv-Vb4KD_2wU2njo', {
            email: email,
            password: password,
            returnSecureToken: true
        }).then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
            dispatch(authLogoutAfterTimeExpires(response.data.expiresIn));
        }).catch(error => {
            console.log(error);
            dispatch(authFail(error.response.data.error));
        })
    };
};

export const authSignin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWpHVYlbXncNslskIvv-Vb4KD_2wU2njo', {
            email: email,
            password: password,
            returnSecureToken: true
        }).then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
            dispatch(authLogoutAfterTimeExpires(response.data.expiresIn));
        }).catch(error => {
            console.log(error);
            dispatch(authFail(error.response.data.error));
        })
    };
};

export const authLogoutAfterTimeExpires = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime*1000)
    };
};
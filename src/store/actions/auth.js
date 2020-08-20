import * as actionTypes from './actionTypes';
import axios from 'axios';

// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWpHVYlbXncNslskIvv-Vb4KD_2wU2njo

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (data) => {
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000);
    localStorage.setItem('expirationDate', expirationDate);
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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
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

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const checkToken = () => {
    return dispatch => {

        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(authLogout());
        } else {
            if(new Date() > localStorage.getItem('expirationDate')) {
                dispatch(authLogout());
            } else {
                const expiresIn = (new Date(localStorage.getItem('expirationDate')).getTime() - new Date().getTime())/1000;
                const userId = localStorage.getItem('userId'); 
                const data = {
                    idToken: token,
                    localId: userId,
                    expiresIn: expiresIn
                }
                dispatch(authSuccess(data));
                dispatch(authLogoutAfterTimeExpires(expiresIn));
            }
        }
    }
}
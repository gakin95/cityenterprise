import * as actionTypes from './actionTypes';
import { Routes } from '../../../constants';
import axios from 'axios'


export const regStart = () => {
    return {
        type : actionTypes.SIGNUP_START
    };
};

export const regSuccess = (payload) => {
    return {
        type : actionTypes.SIGNUP_SUCCESS,
        payload
    };
};

export const regFAIL = (error) => {
    return {
        type : actionTypes.SIGNUP_FAIL,
        error : error
    };
};

export const authSignUp = (user,uploadImage,uploadDocument,categoryType) => {
    return dispatch => {
        dispatch(regStart());
        const formData = new FormData();

        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("roleId", user.roleId);
        formData.append("title", user.title);
        formData.append("firstName", user.firstName);
        formData.append("lastName", user.lastName);
        formData.append("middleName", user.middleName);
        formData.append("gender", user.gender);
        formData.append("phone", user.phone);
        formData.append("business_name", user.name_of_institution);
        formData.append("type_of_business", user.type_of_institution);
        formData.append("rc_number", user.rc_number);
        formData.append("profile_picture", uploadImage);
        if (uploadDocument) {
            formData.append("document", uploadDocument);
        }
        formData.append("categoryType", categoryType)

        axios.post(Routes.register, formData)
        .then(res => {
            console.log(res.data);
            dispatch(regSuccess(res.data));
        })
        .catch(err => {
            console.log(err.response.data);
            if (!err.response.data) {
                dispatch(regFAIL('Please check your network connection and try again' ))
            } else {
                dispatch(regFAIL(err.response.data))
            }
            dispatch(regFAIL(err.response.data))
        })
    }
};

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    };
};

export const authSuccess = (token,message) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        idToken: token,
        message
    };
};

export const authFAIL = (error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password
        };
        axios.post(
            Routes.login,
            authData,
            { "Content-Type": "application/json" }
             )
        .then(res => {
            res.data.token = res.headers["authorization"];
            res.data.expiresIn = 3600;
            console.log(res.data);
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(res.data.token, {status:res.data.status, message:res.data.message}));
            dispatch(checkAuthTimeOut(res.data.expiresIn));
        })
        .catch(err => {
            console.log(err.response.data.message);
            if (!err.response.data) {
                dispatch(authFAIL({status:'Network error', message:'Please check your network connection and try again '}))
            } else {
                dispatch(authFAIL({status:err.response.data.status, message:err.response.data.message}))
            }
        })
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            }else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};

//registered users route to get their profile
export const getProfileStart = () => {
    return {
        type : actionTypes.USER_PROFILE_START
    };
};


export const getProfileSuccess = (payload) => {
    return {
        type : actionTypes.USER_PROFILE_SUCCESS,
        payload
    };
};

export const getProfileFail = (error) => {
    return {
        type : actionTypes.USER_PROFILE_FAIL,
        error : error
    };
};

export const profile = (token) => {
    return dispatch => {
        dispatch(getProfileStart());
         axios({
            method : 'get',
            url: Routes.user_profile,
            headers : {
              'Authorization' : `Bearer: ${token}`
            }
          })
          .then(res => {
              dispatch(getProfileSuccess(res.data.data))
          })
          .catch(err => {
              console.log(err)
            dispatch(getProfileFail(err.response.data))
          })
    }
};




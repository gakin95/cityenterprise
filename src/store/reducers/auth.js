import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility'

const initialState = {
    userId : null,
    message: null,
    idToken: null,
    error : null,
    loading : false
};

const regStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const regSuccess = (state, action) => {
    return updatedObject(state, {
        //token : action.idToken,
        userId: action.payload,
        error : null,
        loading : false
    })
};

const regFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false,
    })
};

const authStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const authSuccess = (state, action) => {
    return updatedObject(state, {
        userId: action.userId,
        message: action.message,
        idToken: action.idToken,
        error : null,
        loading : false
    })
};

const authFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false,
    })
};

const authLogout = (state, action) => {
    return updatedObject(state, {
        idToken : null,
        userId: null,
    })
};

const getProfileStart = (state, action) => {
    return updatedObject(state, {error: null, loading:true})
};

const getProfileSuccess = (state, action) => {
    return updatedObject(state, {
        userId: action.payload,
        error : null,
        loading : false
    })
};

const getProfileFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false,
    })
};


const auth = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.SIGNUP_START : return regStart(state, action);
        case actionTypes.SIGNUP_SUCCESS :return regSuccess(state, action);
        case actionTypes.SIGNUP_FAIL :return regFail(state, action);
        case actionTypes.AUTH_START : return authStart(state, action);
        case actionTypes.AUTH_SUCCESS :return authSuccess(state, action);
        case actionTypes.AUTH_FAIL :return authFail(state, action);
        case actionTypes.AUTH_LOGOUT :return authLogout(state, action);
        case actionTypes.USER_PROFILE_START : return getProfileStart(state,action);
        case actionTypes.USER_PROFILE_SUCCESS : return getProfileSuccess(state,action);
        case actionTypes.USER_PROFILE_FAIL : return getProfileFail(state,action);
        default: return state
    }
}

export default  auth
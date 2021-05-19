import * as actionTypes from './actionTypes';

export const login = (payload) => {
   return {
       type: actionTypes.LOGIN,
       data:payload
   }
}
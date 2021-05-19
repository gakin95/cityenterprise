import * as actionTypes from './actionTypes';

export const printTicket = (payload) => {
   return {
       type: actionTypes.PRINT_TICKET,
       data:payload
   }
}
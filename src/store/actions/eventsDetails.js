import * as actionTypes from './actionTypes';

export const ticketDetails = (payload) => {
   return {
       type: actionTypes.TICKET_DETAILS,
       data:payload
   }
}
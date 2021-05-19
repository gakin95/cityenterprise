import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility'

const initialState = {
    details:null
};

const eventDetails = (state, action) => {
    return updatedObject(state, {
        details:action.data
    })
};


const ticketDetails = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.TICKET_DETAILS : return eventDetails(state, action);
        default: return state
    }
}

export default  ticketDetails
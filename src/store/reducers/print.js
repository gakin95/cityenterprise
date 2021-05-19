import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility'

const initialState = {
    details:null
};

const printDetails = (state, action) => {
    return updatedObject(state, {
        details:action.data
    })
};


const printTicketDetails = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.PRINT_TICKET : return printDetails(state, action);
        default: return state
    }
}

export default  printTicketDetails
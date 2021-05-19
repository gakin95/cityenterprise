import { combineReducers } from 'redux';

import loginDetails from './login';
import authReducer from './auth';
import ticketDetails from './eventDetails';
import printTicketDetails from './print';


const appReducer = combineReducers({
   loginDetails,
    auth: authReducer,
    ticketDetails,
    printTicketDetails
  });
  
  export default appReducer;
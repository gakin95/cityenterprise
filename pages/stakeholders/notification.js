import React from 'react';
import { makeStyles } from '@material-ui/core';
import HostandVendorDashBoard from "../../components/dashboards/eventHostAndVendor/dashboard";
import Notification from '../../components/NotificationTable/notificationtable';

const Manageservices = () => {
    return (
        <HostandVendorDashBoard>
       <Notification />
        </HostandVendorDashBoard>
    )
}
export default Manageservices;
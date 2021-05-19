import React, { useState , useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from '@material-ui/core/Grid';
import { useRouter } from "next/router";
import HostandVendorDashBoard from '../../../components/dashboards/eventHostAndVendor/dashboard';
import Attendeestable from '../../../components/attendeesparts/attendeestable';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';


const Attendees = () => {
    const router = useRouter();
      return (
    <HostandVendorDashBoard>
        <KeyboardBackspaceIcon style={{cursor:'pointer'}} onClick={() => router.push(`/stakeholders/manageevent/`)} />
       <Attendeestable />
    </HostandVendorDashBoard>
  );
};
export default Attendees;

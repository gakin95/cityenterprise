import React from 'react';
import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddToCalendarHOC from 'react-add-to-calendar-hoc';
import { DateTime } from 'luxon';
import moment from 'moment-timezone';

import CalendarModal from './components/modal';
import { MyCustomButton } from '../../common'

const useStyles = makeStyles((theme) => ({
  containerStyles: {
    width: '100%',
    margin: '0 auto',
    textAlign: 'center',
    padding: '0 0 30px',
    [theme.breakpoints.between('sm','md')]:{
      width: '50%'
    }
  },
  linkStyles:{
    textDecoration: 'none',
  display: 'block',
  color: '#E42D2D',
  fontSize: 18,
  textAlign: 'center',
  padding: 6
  }
}));

function calendar({description,title}) {
  const classes = useStyles();
    const AddToCalendarModal = AddToCalendarHOC(MyCustomButton, CalendarModal);
    const startTime = DateTime.fromObject({ year: 2018, month: 10, day: 25, hour: 12 });
    const endTime = startTime.plus({ hours: 2 });
    const startDatetime = moment().utc().add(2, 'days');
    const endDatetime = startDatetime.clone().add(2, 'hours');
    const duration = endDatetime.diff(startDatetime, 'hours');
    const eventInDifferentTimezone = {
      ...event,
      description: description,
      duration,
      endDatetime: endTime.toFormat('YYYYMMDDTHHmmss'),
      location: 'London',
      startDatetime: startTime.toFormat('YYYYMMDDTHHmmss'),
      //timezone: 'Europe/London',
      title: title,
    }
    return (
        <div>
            <AddToCalendarModal
    className={classes.containerStyles}
    linkProps={{
      className: classes.linkStyles,
    }}
    event={eventInDifferentTimezone}
  />
        </div>
    )
}

export default calendar

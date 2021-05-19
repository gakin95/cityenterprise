import React, {useState} from 'react';
import Calendar from 'react-calendar';
import ReminderTable from '../../common/reminderTable'; 
import {Grid,Paper} from '@material-ui/core/';

function Reminder() {
    const [date, setDate] = useState(new Date());
    const onChange = (date) => {setDate(date)}
    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <h3>Reminder</h3>
            <Paper style={{background:'grey', width:'38%',marginBottom:20, color:'white'}}>
            <Grid container spacing={1}>
                <Grid item md={6}>
            <img src='/images/Anna2.jpg'
            style={{
                width:100,
                margin:10,
                borderRadius:7
            }}
            />
            </Grid>
            <Grid md={6}>
         <p>Anna Spenser <br /> Lagos Nigeria</p>
         </Grid>
         </Grid>
        <Calendar
          onChange={onChange}
          value={date}
        />
        </Paper>
      </div>
           <ReminderTable />
        </div>
    )
}

export default Reminder

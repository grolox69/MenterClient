import {
  Box,
  Grid,
  Button,
  Typography
} from '@mui/material';
import { useState } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { 
  StaticDatePicker,
  LocalizationProvider
} from '@mui/lab';
import { getSlots } from 'helpers/availabilities';


const disableDate = (date, timeSlots) => {
  const d = new Date(date).toDateString();
  if (timeSlots.some((slot) => slot.day === d)) {
    return false;
  } else {
    return true;
  }
}

const getAvailableSlots = (allSlots) => {
  let tmp = []

  allSlots.forEach((slot) => {
    const d = new Date(slot.starts_at);
    const day = d.toDateString();
    const time = d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });

    const exists = tmp.some((slot) => slot.day === day);
    if (!exists) {
      tmp.push({
        day: day,
        time: [time],
      });
    } else {
      tmp.find((slot) => slot.day === day).time.push(time);
    }
  });

  return tmp;
}

const getAvailableTimeSlots = (date, slots) => {
  const d = new Date(date).toDateString();
  const now = new Date();
  const timeSlots = slots.find((slot) => slot.day === d);
  
  if (timeSlots === undefined) {
    return [];
  } else {
    return timeSlots.time.filter((time) => new Date(d + " " + time) > now);
  }
}

export default function CalendarPicker({sessionType}) {
  const today = new Date();

  const [value, setValue] = useState(today);
  const [timeSlots, setTimeSlots] = useState();
  
  const allSlots = getSlots(sessionType, Intl.DateTimeFormat().resolvedOptions().timeZone);

  const availableSlots = getAvailableSlots(allSlots);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex">
        <StaticDatePicker          
          views={['day']}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            setTimeSlots(getAvailableTimeSlots(newValue, availableSlots));
          }}
          minDate={today}
          showToolbar={true}
          toolbarTitle=""
          shouldDisableDate={(date) => disableDate(date, availableSlots)}
        />
        <Grid container direction="column" ml={3} >
          <Typography variant="h6" color="inherit">
            Select Time:
          </Typography>
          {timeSlots &&
            <Box style={{maxHeight: '60vh', overflow: 'auto'}}>
              {timeSlots.map((time) => {
                return (
                  <Grid item mt={1}>
                    <Button variant="outlined" size="large" >{time}</Button> 
                  </Grid>
                )
              })}
            </Box>
          }
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}

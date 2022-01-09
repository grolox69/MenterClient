import {
  Container,
  Box,
  Grid,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useState } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { 
  StaticDatePicker,
  LocalizationProvider
} from '@mui/lab';
import { getSlots } from 'helpers/availabilities';
import { removeBookings } from 'helpers/reservations';
import { useAuth } from 'context/AuthContext';
import { toast } from 'react-toastify';
import { axiosPost } from 'hooks/useAxios';
import { useParams, useNavigate } from "react-router-dom";

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

export default function CalendarPicker({owner, sessionType, sessions}) {
  const { currentUser } = useAuth();
  const { vanity_name, slug } = useParams();
  let navigate = useNavigate();
  
  const today = new Date();
  const [value, setValue] = useState(today);
  const [timeSlots, setTimeSlots] = useState();
  
  const allSlots = getSlots(sessionType, Intl.DateTimeFormat().resolvedOptions().timeZone);
  const slots = removeBookings(allSlots, sessions)

  const availableSlots = getAvailableSlots(slots);

  const [day, setDay] = useState();
  const [time, setTime] = useState();

  const handleClick = (e) => {
    setDay(value.toDateString())
    setTime(e.target.value)
  }
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sessionType.owner === currentUser._id) {
      toast.error("You can't book yourself!")
      return
    }
    const s = day + " " + time;
		const d = new Date(s).toISOString();
    const data = {
      date: d,
      guest: currentUser._id,
      sessionType: sessionType._id
    }

    axiosPost(vanity_name + "/" + slug, data).then((result) => {
      if (result.success) {
        toast.success('Booking Successful!');
        navigate("/dashboard/session-types");
      } else {
        toast.error('Booking failed')
      }
      setOpen(false);
  } )
  }

  return (
    <Container>
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
            renderInput={(params) => <TextField {...params} />}
          />
          <Grid container direction="column" ml={3} >
            <Typography variant="h6" color="inherit">
              Select Time:
            </Typography>
            {timeSlots &&
              <Box style={{maxHeight: '60vh', overflow: 'auto'}}>
                {timeSlots.map((time, index) => {
                  return (
                    <Grid item mt={1} key={index}>
                      <Button variant="outlined" size="large" value={time} onClick={(e) => {handleClick(e);handleDialogOpen()}} >{time}</Button> 
                    </Grid>
                  )
                })}
              </Box>
            }
          </Grid>
        </Box>
      </LocalizationProvider>
      <div>
        <Dialog
          open={open}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h4">
              Confirm booking:
            </Typography>
          </DialogTitle>
          <DialogContent >
            <Box p={2}>
              <DialogContentText mb={2}>   
                <strong>{sessionType.title}</strong>
                { ' with ' }
                <strong>{owner}</strong>
              </DialogContentText>
              <DialogContentText>
                <Box display="flex">
                  <CalendarTodayIcon/> 
                  <Typography ml={1}>{day}{', at'} {time}</Typography>
                </Box>
              </DialogContentText>
              <DialogContentText> 
                <Box display="flex">
                  <ScheduleIcon /> 
                  <Typography ml={1}>{sessionType.duration} minutes</Typography>
                </Box>
              </DialogContentText>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} variant="inherit">Cancel</Button>
            <form onSubmit={handleSubmit}>
              <Button type="submit" autoFocus variant="inherit">
                Confirm
              </Button>
            </form>
          </DialogActions>
        </Dialog>
      </div>
    </Container>
  );
}

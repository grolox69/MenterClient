import React, { useEffect, useState, useRef } from 'react';
import {
    Box,
    InputLabel,
    Button,
    Grid,
    Typography,
    Checkbox,
    Stack
} from '@mui/material';
import TextInput from 'components/common/controls/TextInput';
import useForm from 'hooks/useForm';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from 'context/AuthContext';
import { axiosPost } from 'hooks/useAxios';

export default function SessionTypesForm({isCreate, data}) {
    
    const { currentUser } = useAuth();
    let navigate = useNavigate();
    let { id } = useParams();

    const initialValues = data;
    
    const validate = (fieldValues = values) => {
        let tmpErrs = {...errors}
        if ('title' in fieldValues)
        tmpErrs.title = fieldValues.title ? "" : "This field is required."
        if ('slug' in fieldValues)
        tmpErrs.slug = fieldValues.slug ? "" : "This field is required."
        if ('duration' in fieldValues)
        tmpErrs.duration = fieldValues.duration ? "" : "This field is required."
        setErrors({
            ...tmpErrs
        })
        
        if (fieldValues === values)
        return Object.values(tmpErrs).every(x => x === "");
    }
    
    const {
        values,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialValues, validate);
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    
    const handleSubmit = (e) => {
        e.preventDefault();

        let availability = [];
        days.forEach((day) => {
            if (e.target[day+'_available'].checked){
                let slots = [];
                const slotsContainer = timesRef.current[days.indexOf(day)]
                for (let i = 0; i < slotsContainer.children.length; i++) {
                    const start = e.target[day+'_startTime_'+i].value.split(":")
                    const end = e.target[day+'_endTime_'+i].value.split(":")
                    slots.push({
                        startTime: {
                            hour: start[0],
                            minute: start[1]
                        },
                        endTime: {
                            hour: end[0],
                            minute: end[1]
                        }
                    })
                }
                availability.push({
                    dayNumber: e.target[day+'_available'].value,
                    slots: slots
                })
            }
        })
        values.availability = availability;

        if (validate()) {
            if (isCreate) {
                axiosPost('dashboard/session-types/create', values).then((result) => {
                    if (result.success) {
                        navigate("/dashboard/session-types");
                        toast.success('Session type created!');
                    }
                })
            } else {
                axiosPost('dashboard/session-types/edit/'+id, values).then((result) => {
                    if (result.success) {
                        navigate("/dashboard/session-types");
                        toast.success('Session type updated!');
                    }
                })
            }
        }
    };

    const timesRef = useRef([])

    useEffect(() => {
        timesRef.current = timesRef.current.slice(0, days.length);
    }, [days])

    const dayIsChecked = (initialValues) => {
        let isChecked = new Array(days.length).fill(false)
        if (Object.keys(initialValues).length !== 0) {
            initialValues.availability.map((day) => {isChecked[day.dayNumber] = true})
        }
        return isChecked;
    }

    const [daysChecked, setDaysChecked] = useState(
        dayIsChecked(initialValues)
    );

    const handleCheckboxChange = (position) => {
        let updatedDaysChecked = [...daysChecked];
        updatedDaysChecked[position] = !updatedDaysChecked[position]
        setDaysChecked(updatedDaysChecked)
    }

    const addTime = (index) => {
        const container = timesRef.current[index];
        const new_input = container.children[0].cloneNode(true);
        
        new_input.children[0].children[0].children[0].childNodes[0].id = days[index] + '_startTime_' + parseInt(new_input.children[0].children[0].children[0].childNodes[0].id.slice(-1)+1)
        new_input.children[0].children[2].children[0].childNodes[0].id = days[index] + '_endTime_' + parseInt(new_input.children[0].children[2].children[0].childNodes[0].id.slice(-1)+1)
        
        let delete_btn = document.createElement('button');
        delete_btn.innerHTML = "delete";
        delete_btn.type = "button"
        delete_btn.onclick = function() {
            container.removeChild(new_input)
        }
        
        new_input.appendChild(delete_btn);
        container.appendChild(new_input);
    }

    return (
        <Grid
            container
            spacing={2}
            component="form"
            noValidate
            autoComplete="off"
            mt={2}
            direction="column"
            width={{xs: '100%', md: '60%'}}
            onSubmit={handleSubmit}
        >
            
            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <InputLabel htmlFor="title" sx={{ mb: 1 }} required> Session name: </InputLabel >
                <TextInput 
                    name="title"
                    value={values.title}
                    onChange={handleInputChange}
                    error={errors.title}
                    size="small"
                />
            </Grid>

            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <InputLabel htmlFor="slug" sx={{ mb: 1 }} required> Session link: </InputLabel >
                <TextInput 
                    name="slug"
                    value={values.slug}
                    onChange={handleInputChange}
                    error={errors.slug}
                    size="small"
                    InputProps={{
                        startAdornment: 
                        <Box>
                            https://menter.com/{currentUser.vanity_name}/
                        </Box>
                        
                    }}
                />
            </Grid>

            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <InputLabel htmlFor="description" sx={{ mb: 1 }}> Session description: </InputLabel >
                <TextInput 
                    name="description"
                    value={values.description}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                />
            </Grid>

            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <InputLabel htmlFor="duration" sx={{ mb: 1 }} required> Session duration: </InputLabel >
                <TextInput 
                    type="number"
                    name="duration"
                    value={values.duration}
                    onChange={handleInputChange}
                    {...(errors.duration && {error: true, helperText: errors.duration})}
                    size="small"
                    sx={{maxWidth: 100}}
                    InputProps={{ inputProps: { min: 1 } }}
                />
            </Grid>
            <Grid item xs={12} md={6} p={2} sx={{ border: 1, borderColor: 'grey.300' }}>
                <Typography mb={2} >
                    When are you available for this session?
                </Typography>
                <Grid container spacing={3} direction="column">
                    {days.map((day, index) => {
                        const d = (values.availability ? values.availability.find(elt => elt.dayNumber === index) : undefined)
                        return (
                            <Grid item key={index} >
                                <Grid container spacing={3} direction="row" >
                                    <Grid item>
                                        <Stack direction="row" alignItems="center">
                                            <Checkbox id={day + "_available"} name="dayNumber" value={index} onChange={() => handleCheckboxChange(index)} checked={daysChecked[index]}   />
                                            <Typography>{day}</Typography>
                                        </Stack>
                                    </Grid>
                                    {daysChecked[index] ? (
                                        d ? 
                                        (<>
                                        <Grid item xs={7} ml="auto" ref={el => timesRef.current[index] = el} >
                                            {(d.slots.map((slot, count) => {
                                                return (
                                                    <Box m={2} key={count}>
                                                        <Stack direction="row">
                                                            <TextInput    
                                                                size="small"
                                                                type="text"
                                                                name="startTime"
                                                                id={day + "_startTime_"+count}
                                                                defaultValue={slot.startTime.hour + ":" + (slot.startTime.minute === 0 ? '00' : slot.startTime.minute)}
                                                            />
                                                            <Typography m={1}>-</Typography>
                                                            <TextInput    
                                                                size="small"
                                                                type="text"
                                                                name="endTime"
                                                                id={day + "_endTime_"+count}
                                                                defaultValue={slot.endTime.hour + ":" + (slot.endTime.minute === 0 ? '00' : slot.endTime.minute)}      
                                                            />                                            
                                                        </Stack>
                                                        {(count > 0) && <Button>Delete</Button>}
                                                    </Box>
                                                )}))
                                            }
                                        </Grid>
                                        <Box>
                                            <Button id={index} onClick={(e) => addTime(e.target.id)}>+add time</Button>
                                        </Box>
                                        </>
                                        ) : (
                                            <>
                                                <Grid item xs={7} ml="auto" ref={el => timesRef.current[index] = el}>
                                                    <Box m={2}>
                                                        <Stack direction="row">
                                                            <TextInput    
                                                                size="small"
                                                                type="text"
                                                                name="startTime"
                                                                defaultValue="8:00"
                                                                id={day + "_startTime_"+0}
                                                            />
                                                            <Typography m={1}>-</Typography>
                                                            <TextInput    
                                                                size="small"
                                                                type="text"
                                                                name="endTime"
                                                                defaultValue="17:00" 
                                                                id={day + "_endTime_"+0}     
                                                            />                                            
                                                        </Stack>
                                                        
                                                    </Box>
                                                </Grid>
                                                <Box>
                                                    <Button id={index} onClick={() => addTime(index)}>+add time</Button>
                                                </Box>
                                            </>
                                        )
                                        
                                    ) : (
                                        <Grid item ml="auto">
                                            <Typography id={day + "_unavailable"}> Unavailable </Typography>
                                        </Grid>
                                    )}
                                </Grid> 
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
            <Box sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Button 
                    variant="contained"
                    type="submit"
                >
                    Save Changes
                </Button>
            </Box>
        </Grid>
        
    )

}
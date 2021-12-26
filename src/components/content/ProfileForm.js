import {
    Box,
    InputLabel,
    FormGroup,
    Link as FancyLink,
    Button,
    Grid
} from '@mui/material';
import TextInput from 'components/common/controls/TextInput';
import { Link } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import useForm from 'hooks/useForm';
import { axiosPost } from 'hooks/useAxios';
import { toast } from 'react-toastify';

export default function ProfileForm({data}) {
    const { setCurrentUser } = useAuth();

    const initialValues = data

    const validate = (fieldValues = values) => {
        let tmpErrs = {...errors}
        if ('name' in fieldValues)
            tmpErrs.name = fieldValues.name ? "" : "This field is required."
        if ('email' in fieldValues)
            tmpErrs.email = (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(fieldValues.email) ? "":"Email is not valid."
        if ('vanity_name' in fieldValues)
            tmpErrs.vanity_name = fieldValues.vanity_name? "" : "This field is required."
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axiosPost('profile',values).then((result) => {
                toast.success('User profile updated!');
                setCurrentUser(result);
            })
        }
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
            width={{xs: '100%', md: '40%'}}
            onSubmit={handleSubmit}
        >
            <Grid item xs={12} md={6} sx={{ mb: 3 }}>
                <InputLabel htmlFor="vanity_name" sx={{ mb: 1 }} required> Your booking page link: </InputLabel >
                <TextInput 
                    name="vanity_name"
                    value={values.vanity_name}
                    onChange={handleInputChange} 
                    error={errors.vanity_name}
                    InputProps={{
                        startAdornment: 
                        <Box>
                            https://menter.com/
                        </Box>
                        
                    }} 
                    
                />
                <FancyLink underline="none" mt={0.5} to={"/"+values.vanity_name} component={Link}>Visit your booking page</FancyLink>
            </Grid>

            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <InputLabel htmlFor="name" sx={{ mb: 1 }} required> Your name: </InputLabel >
                <TextInput 
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    size="small"
                />
            </Grid>

            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <InputLabel htmlFor="email" sx={{ mb: 1 }}> Your email: </InputLabel >
                <TextInput 
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    size="small"
                    disabled
                />
            </Grid>

            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <InputLabel htmlFor="title" sx={{ mb: 1 }}> Booking page title: </InputLabel >
                <TextInput 
                    name="title"
                    value={values.title}
                    onChange={handleInputChange}
                    size="small" 
                />
            </Grid>

            <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <InputLabel htmlFor="description" sx={{ mb: 1 }}> Booking page description: </InputLabel >
                <TextInput 
                    name="description"
                    value={values.description}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                />
            </Grid>

            <Box sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
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
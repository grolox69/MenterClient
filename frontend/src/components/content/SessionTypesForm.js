import {
    Box,
    InputLabel,
    FormGroup,
    Button,
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

    const handleSubmit = (e) => {
        e.preventDefault();
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
    }

    return (
        <>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                mt={5}
                sx={{ width: '40%' }}
                onSubmit={handleSubmit}
            >
                <FormGroup sx={{ mb: 2 }}>
                    <InputLabel htmlFor="title" sx={{ mb: 1 }} required> Session name: </InputLabel >
                    <TextInput 
                        name="title"
                        value={values.title}
                        onChange={handleInputChange}
                        error={errors.title}
                        size="small"
                    />
                </FormGroup>

                <FormGroup sx={{ mb: 2 }}>
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
                </FormGroup>

                <FormGroup sx={{ mb: 2 }}>
                    <InputLabel htmlFor="description" sx={{ mb: 1 }}> Session description: </InputLabel >
                    <TextInput 
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                    />
                </FormGroup>

                <FormGroup sx={{ mb: 2 }}>
                    <InputLabel htmlFor="duration" sx={{ mb: 1 }} required> Session duration: </InputLabel >
                    <TextInput 
                        type="number"
                        name="duration"
                        value={values.duration}
                        onChange={handleInputChange}
                        {...(errors.duration && {error:true,helperText:errors.duration})}
                        size="small"
                        sx={{maxWidth: 100}}
                        InputProps={{ inputProps: { min: 1 } }}
                    />
                </FormGroup>
                {'TODO: Availabilities'}
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
            </Box>
        </>
    )

}
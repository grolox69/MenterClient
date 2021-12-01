import {
    Typography,
    Avatar,
    Box,
    CircularProgress 
} from '@mui/material';
import ProfileForm from 'components/content/ProfileForm';
import { useAxiosFetch } from 'hooks/useAxios';

export default function Profile() {

    const {response, loading, error} = useAxiosFetch('profile');
    
    return (
        <Box
            sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h4" mb={2}>My Profile</Typography>
            {response && 
                <>
                    <Avatar sx={{ width: 75, height: 75 }}>{response.name[0].toUpperCase()}</Avatar>
                    <ProfileForm data={response} />
                </>
            }
            {loading && 
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            }
            {error && 
                <h4>{error}</h4>
            }
        </Box>
    )
}
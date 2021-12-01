import {
    Typography,
    Box
} from '@mui/material';
import SessionTypesForm from 'components/content/SessionTypesForm';

export default function CreateSessionType() {
    return (
        <Box mt={5}sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography variant="h4" mr={2} >
                    Create new session type
            </Typography>
            
            <SessionTypesForm isCreate={true} data={{}}/>
            
        </Box>
    )
}
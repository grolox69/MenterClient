import {
    Typography,
    Box,
} from '@mui/material';
import SessionTypesForm from 'components/content/SessionTypesForm';

export default function CreateSessionType() {
    return (
        <Box m={4} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography variant="h4" >
                    Create new session type
            </Typography>
            
            <SessionTypesForm isCreate={true} data={{}}/>
            
        </Box>
    )
}
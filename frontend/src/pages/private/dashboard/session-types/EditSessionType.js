import {
    Typography,
    Box,
    CircularProgress
} from '@mui/material';
import { useAxiosFetch } from 'hooks/useAxios';
import { useParams } from "react-router-dom";
import SessionTypesForm from 'components/content/SessionTypesForm';

export default function EditSessionType() {

    let { id } = useParams();

    const {response, loading, error} = useAxiosFetch('dashboard/session-types/edit/'+id);

    return (
        <Box mt={5}sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Typography variant="h4" mr={2} >
                    Edit session type
            </Typography>

            {response && 
                <SessionTypesForm isCreate={false} data={response} />
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
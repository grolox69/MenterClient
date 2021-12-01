import {
    Box,
    CircularProgress,
    Typography,
    Grid
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarPicker from 'components/content/CalendarPicker';
import { useAxiosFetch } from 'hooks/useAxios';
import { useParams } from 'react-router-dom';

export default function BookSession() {
    const { vanity_name, slug } = useParams();

    const {response, loading, error} = useAxiosFetch(vanity_name + "/" + slug);

    return (
        <Box>
            {response &&
                <Grid container mt={5} sx={{justifyContent: 'flex-start'}}>
                    <Grid item  display="flex" direction="column" >
                        <Typography variant="h3"> 
                            {response.user.name}
                        </Typography>
                        <Typography>
                            {response.sessionType.title}
                        </Typography>
                        <Typography display="flex" alignItems="center">
                            <AccessTimeIcon />
                            {response.sessionType.duration} minutes
                        </Typography>
                        <Typography>
                            {response.sessionType.description}
                        </Typography>
                    </Grid>
                    <Grid item ml={21}>
                        <CalendarPicker sessionType={response.sessionType} />
                    </Grid>
                </Grid>
            }

            {loading && 
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            }
        </Box>
    )
}

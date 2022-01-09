import { 
    Typography,
    Box,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    CircularProgress
} from '@mui/material';
import BookingsTable from 'components/content/BookingsTable';
import { useAxiosFetch } from 'hooks/useAxios';

export default function Bookings() {

    const {response, loading, error} = useAxiosFetch('dashboard/bookings');

    return (
        <Box>
            <Grid container mt={5} mb={6} sx={{display: 'flex', alignItems: 'center'}}>
                <Grid item>
                    <Typography variant="h4" mr={2} 
                        sx={{
                            "&:after": {
                                content: '""',
                                display: "block",
                                borderBottom: "3px dotted #fe5244",
                                transform: 'translateX(7px)'
                            }
                        }}>
                        Bookings
                    </Typography>
                </ Grid>
                <Grid item ml="auto" mr={6}>
                    <InputLabel id="view-select-label">View:</InputLabel>
                    <Select
                        labelId="view-select-label"
                        id="view-select"
                        label="View"
                        sx={{width: 200}}
                        autoWidth
                        defaultValue={10}
                        // onChange={}
                    >
                        <MenuItem value={10}>Upcoming Bookings</MenuItem>
                        <MenuItem value={20}>Past Bookings</MenuItem>
                        <MenuItem value={30}>Cancelled Bookings</MenuItem>
                        <MenuItem value={40}>All Bookings</MenuItem>
                    </Select>
                </Grid>
            </ Grid>
            {loading && <CircularProgress/>}
            {!loading && response && <BookingsTable sessions={response} /> }
            
        </Box>
    )
}
import { 
    Typography,
    Box,
    Grid,
    Select,
    MenuItem,
    InputLabel,
    Button,
    CircularProgress
} from '@mui/material';
import BookingsTable from 'components/content/BookingsTable';

export default function Bookings() {
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
                        //value={}
                        // onChange={}
                    >
                        <MenuItem value={10}>Upcoming Bookings</MenuItem>
                        <MenuItem value={20}>Past Bookings</MenuItem>
                        <MenuItem value={30}>Cancelled Bookings</MenuItem>
                        <MenuItem value={40}>All Bookings</MenuItem>
                    </Select>
                </Grid>
            </ Grid>

            <BookingsTable />
        </Box>
    )
}
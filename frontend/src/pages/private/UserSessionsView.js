import { 
    Typography,
    Box,
    Grid,
    CircularProgress,
    Avatar,
    Button
} from '@mui/material';
import BookSessionCard from 'components/content/BookSessionCard';
import { useParams } from "react-router-dom";
import { useAxiosFetch } from 'hooks/useAxios';

export default function UserSessionsView() {

    let { vanity_name } = useParams();
    const {response, loading, error} = useAxiosFetch(vanity_name);

    return (
        <Box sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
        }}>
            {response &&
                <Box>
                    <Avatar sx={{ width: 75, height: 75 }}>{response.name[0].toUpperCase()}</Avatar>
                    <Typography variant="h4" mb={2} mt={2}>{response.name}'s Bookings</Typography>
                    <Grid 
                        container
                        spacing={2}
                        sx={{
                            paddingLeft: "40px",
                            paddingRight: "40px"
                        }}
                        justify="center"
                    >
                        {response.sessionTypes.length > 0 ?
                            (
                                response.sessionTypes.map((sessionType, i) => {
                                    return (
                                        <Grid item xs={12} sm={6} md={4} key={i} >
                                            <BookSessionCard sessionType={sessionType} />
                                        </Grid>
                                    )
                                })
                            ) : (
                                <Typography variant="h5" mt={3}>
                                    This User has no Session Types available...
                                </ Typography>
                            )
                        }
                    </Grid>
                </Box>
            }
            {loading && 
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            }
            {error && 
                <Button onClick={() => console.log(error)}>console error</Button>
            }
        </Box>
        
    )
}
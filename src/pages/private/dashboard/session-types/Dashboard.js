import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Typography,
    Box,
    Grid,
    Button,
    CircularProgress
} from '@mui/material';
import { createToken } from 'hooks/useAxios';
import SessionTypesCard from 'components/content/SessionTypesCard';
import { baseUrl } from 'shared/baseUrl';

export default function Dashboard() {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    let [deleted, setDeleted] = useState(0);

    const update = () => {
        setDeleted(++deleted);
    }

    const fetchData = async () => {
        const header = await createToken();
        try {
            const res = await axios.get(baseUrl+'dashboard/session-types', header);
            setResponse(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [deleted]);
    
    
    return (
        <Box>
            <Grid container spacing={1} mt={3} mb={5} sx={{
                        paddingLeft: "40px",
                        paddingRight: "40px"
                    }}>
                <Grid item xs={12} sm={6} md={3} mb={1}>
                    <Typography variant="h4" sx={{fontWeight: 'bold'}}>
                        Session Types
                    </Typography>
                </Grid>
                <Grid item >
                    <Button variant="outlined" color="inherit" to="/dashboard/session-types/create" component={Link} sx={{ borderRadius: 16 }}>+ Create new Session Type</Button>
                </Grid>
                {response && 
                    <Grid item ml="auto">
                        <Typography to={"/"+response.vanity_name} component={Link} underline="none" color="primary" >View your bookings page ↗ </Typography>
                    </Grid>
                }
                
            </Grid>
            
            {response &&
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
                                        <SessionTypesCard sessionType={sessionType} vanity_name={response.vanity_name} update={update} />
                                    </Grid>
                                )
                            })
                        ) : (
                            <Typography variant="h5" mt={3}>
                                No Session Types available...
                            </ Typography>
                        )
                    }
                    
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
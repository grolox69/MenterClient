import syncSVG from 'assets/images/sync.svg';
import  MotionSVG from 'components/content/MotionSVG';
import MotionTextReveal from 'components/content/MotionTextReveal';
import {
    Box,
    Typography,
    Grid
} from '@mui/material';

export default function Landing() {
    return (
        <Grid container >
            <Grid item md={5} sx={{ pt: 4, pr: 4, pl: 4 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="left"
                    color="text.primary"
                    
                >
                    Simple session 
                </Typography>
                <Typography
                    component="h1"
                    variant="h2"
                    align="left"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: 'bold', background: "-webkit-linear-gradient(45deg, #65afef 30%, #FF8E53 90%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                > SCHEDULING </Typography>
                <Box mt={5} >
                    <MotionTextReveal />
                </Box>
            </Grid> 
            
            <Grid item ml="auto">
                <MotionSVG figure={syncSVG} />
            </Grid>
        </Grid>
    )
}
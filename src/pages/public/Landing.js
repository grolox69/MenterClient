import syncSVG from 'assets/images/sync.svg';
import  MotionSVG from 'components/content/MotionSVG';
import MotionTextReveal from 'components/content/MotionTextReveal';
import {
    Box,
    Typography,
    Grid,
    Container
} from '@mui/material';

export default function Landing() {
    return (
        <Container>
            <Grid container >
                <Grid item md={5} mt={5} sx={{ pt: 4, pr: 4, pl: 4 }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"   
                    >
                        Simple session 
                    </Typography>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="primary"
                        gutterBottom
                        sx={{ fontWeight: 'bold', background: "-webkit-linear-gradient(45deg, #65afef 30%, #FF8E53 90%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                    > SCHEDULING </Typography>
                    <Box mt={5} >
                        <MotionTextReveal />
                    </Box>
                </Grid> 
                
                <Grid item ml="auto" sx={{display: { xs: 'none', md: 'block'}}}>
                    <MotionSVG figure={syncSVG} />
                </Grid>
            </Grid>
        </Container>
    )
}
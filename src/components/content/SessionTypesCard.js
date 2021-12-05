import {
    Card,
    Box,
    Button,
    CardHeader,  
    Typography,
    Stack,
    Divider,
    FormGroup,
    FormControlLabel,
    Switch
} from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { axiosDelete, axiosPost } from 'hooks/useAxios';

export default function SessionTypesCard({ sessionType, vanity_name, update}) {
    
    const notify = () => toast.success("Link Copied!");

    const handleDeleteSubmit = (e, id) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to delete this session type?')) {
            axiosDelete('dashboard/session-types/delete/'+id).then((result) => {
                if (result.success) {
                    update();
                    toast.success('Session Type deleted!');
                }
            })
        }
    }

    const handleSwitchSubmit = (e, id) => {
        e.preventDefault();
        axiosPost('dashboard/session-types/disable-enable/'+id).then((result) => {
            if (result.success) {
                update();
                toast.success('Session Type ' + ((result.isEnabled) ? 'Enabled!' : 'Disabled!') );
            }
        })
    }

    return (
        <Card component="div" variant="outlined" sx={{
            maxWidth: 325,
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
            "&:hover": {
              boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.2)",
              transform: 'scale(1.01)'
            }
         }}>
            <CardHeader title={sessionType.title} titleTypographyProps={{ align: 'center', gutterBottom: false }} />
            <Stack direction="row" alignItems="center" p={1}>
                <Typography ml={1} component={Link} to={'/'+vanity_name+'/'+sessionType.slug} color="#4059ad" sx={{ textDecoration: 'none', fontWeight: 'bold'}}>
                    /{sessionType.slug}
                </Typography>
                <Typography ml="auto" mr={1} color="blue" variant="subtitle2" component={Button} onClick={() => {navigator.clipboard.writeText('menter.com/'+vanity_name+'/'+sessionType.slug); notify(); }}>
                    Copy link!
                </Typography>
            </Stack>
            <Divider variant="middle" light />

            <Box sx={{ minHeight: 125, my: 3, mx: 2, alignItems: "center", justifyContent: "center" }}>

                <Stack m={1} direction="row" alignItems="center">
                    <AccessTimeIcon />
                    <Typography ml={1} >
                        { sessionType.duration } minutes
                    </Typography>
                </Stack>

                <Typography m={1} variant="subtitle1" sx={{fontWeight: 'light'}}>
                    { sessionType.description }
                </Typography>

                <Stack m={1} direction="row" alignItems="center">
                    
                    <FormGroup>
                        <FormControlLabel control={
                            <Switch defaultChecked={sessionType.isEnabled} onChange={(e) => handleSwitchSubmit(e,sessionType._id)} />
                            } label={"Booking is " + ((sessionType.isEnabled) ? 'ON' : 'OFF')} 
                        />
                        
                    </FormGroup>
                        
                    
                    
                </Stack>
            </Box>
            <Stack>
                <Typography component={Link} to={"edit/"+sessionType._id} ml={2} mb={1} p={1} sx={{ textDecoration: 'none', borderTop: "1px solid #dee2e6", borderBottom: "1px solid #dee2e6",}}>
                    Edit
                </Typography>
                <Box 
                    component="form"
                    onSubmit={(e) => {handleDeleteSubmit(e,sessionType._id)}}
                >
                    <Typography color="inherit" variant="text" component={Button} type="submit" ml={2} mb={2} sx={{ textDecoration: 'none', maxWidth: 50}}>
                        Delete
                    </Typography>
                </ Box>
            </Stack> 
            
        </Card>
            
        
    )
}
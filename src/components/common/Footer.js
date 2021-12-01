import {
    Typography,
    Container,
    Box,
    Link 
} from '@mui/material';

function Copyright() {
    return (
      <Typography variant="inherit" color="text.secondary">
        {'Copyright © '}
        <Link color="inherit" href="https://menter.com/">
          Menter
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default function Footer() {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          
        }}
      >
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            
          }}
        >
          <Container maxWidth="sm" sx={{display: 'flex', justifyContent: 'center'}}>
            <Typography variant="inherit" align="center" mr={1}>
              Karl Gharios -
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    );
  }
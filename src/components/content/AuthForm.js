import { 
    TextField,
    Box,
    Container,
    Avatar,
    Typography,
    Grid,
    Link as FancyLink
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';

export function AuthForm({isSignIn}) {

    let {login, register, loading, error} = useAuth();

    const submitHandler = async function(event) {
        event.preventDefault();
        const name = event.target.name.value || "";
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (isSignIn){
            await login(email, password)
        } else {
            await register(email, password, name)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: isSignIn?'primary.dark': 'primary.light' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" mb={2}>
                    {isSignIn ? 'Sign in' : 'Sign up'}
                </Typography> 
                <Box
                    component="form"
                    autoComplete="off"
                    sx={{ mt: 1 }}
                    onSubmit={e => { submitHandler(e) }}
                >
                    {!isSignIn && 
                        <TextField
                            id="name"
                            name="name"
                            label="Full Name"
                            autoComplete="given-name"
                            placeholder="Enter Full Name"
                            fullWidth
                            required
                            autoFocus
                        />
                    }
                    <TextField 
                        id="email"
                        name="email" 
                        type="email" 
                        label="Email Address"
                        autoComplete="email" 
                        placeholder="Enter Email Address" 
                        fullWidth
                        margin="normal"
                        required 
                        autoFocus={isSignIn}
                    />
                    <TextField 
                        id="password"
                        name="password" 
                        type="password" 
                        label="Password"
                        autoComplete="current-password" 
                        placeholder="Enter Password" 
                        margin="normal"
                        fullWidth
                        required
                        
                    />
                    {error && <p> {error.message} </p>}
                    <LoadingButton
                        type="submit"
                        loading={loading && !error}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isSignIn ? 'Sign in' : 'Register'}
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            {isSignIn ? 
                                <FancyLink to="/register" underline='hover' component={Link}>
                                    Don't have an account? Register.
                                </FancyLink>
                                :
                                <FancyLink to="/login" underline='hover' component={Link}>
                                    Already Registered? Sign In.
                                </FancyLink>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
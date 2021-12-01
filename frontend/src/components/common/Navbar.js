import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
    Tabs,
    Tab,
    Link as FancyLink,
    Box,
    Stack,
    Button,
    Divider,
    Tooltip,
    Avatar,
    ListItemIcon
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    
    const { loading, currentUser, logout } = useAuth();
    let location = useLocation();
    let val = location.pathname;
    if (["/dashboard/session-types","/dashboard/bookings","/integrations"].indexOf(location.pathname) <= -1) {
        val = false;
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        
        <AppBar position="static" color="transparent" sx={{ boxShadow: 'none'}}>
            <Toolbar component="nav" diplay="flex">
                
                <Typography variant="h4" component="div" >
                    <FancyLink to="/" component={Link} underline="none" color="inherit"> Menter </FancyLink>
                </Typography>
                
                {(currentUser && !loading) ? (
                    <>
                        <Tabs 
                            sx={{ flexGrow: 1 }}
                            indicatorColor="secondary"
                            textColor="inherit"
                            centered
                            value={val}
                        >
                            <Tab label="Dashboard" value="/dashboard/session-types" component={NavLink} to="/dashboard/session-types" />
                            <Tab label="Bookings" value="/dashboard/bookings" component={NavLink} to="/dashboard/bookings"/>
                            <Tab label="Integrations" value="/integrations" component={NavLink} to="/integrations" />
                        </Tabs>
                        
                        <Tooltip title="Account settings">
                            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                                <Avatar sx={{ width: 32, height: 32 }}>{currentUser.name[0]}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                                },
                                '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                },
                            },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem to="/profile" component={Link}>
                                <Avatar />
                                {currentUser.name}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={() => { logout()} } variant='body2' color='inherit'>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                    ) : (
                        <>
                            <Box sx={{ ml: "auto" }}>
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                >
                                    <Button variant="outlined" color='inherit' to="/login" component={Link}>
                                        Sign in
                                    </Button>
                                    <Button variant="outlined" to="/register" component={Link}>
                                        Sign up
                                    </Button>
                                </Stack>
                            </Box>

                        </>
                    )
                }

            </Toolbar>
        </AppBar>
             
    );
}

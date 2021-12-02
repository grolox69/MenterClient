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
    List,
    ListItem,
    ListItemText,
    Drawer,
    ListItemIcon,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

export default function Navbar(props) {
    
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

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        
        <AppBar position="static" color="transparent" sx={{ boxShadow: 'none'}}>
            <Toolbar sx={{display: 'flex'}}>
                {(currentUser && !loading) && 
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                }

                <Typography variant="h4" component="div" >
                    <FancyLink to="/" component={Link} underline="none" color="inherit"> Menter </FancyLink>
                </Typography>
                
                {(currentUser && !loading) ? (
                    <>
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        <Box />
                
                        <Tabs
                            sx={{flexGrow: 1, display: { xs:'none', md: 'block' }}}
                            indicatorColor="secondary"
                            textColor="inherit"
                            centered
                            value={val}
                        >
                            <Tab label="Dashboard" value="/dashboard/session-types" component={NavLink} to="/dashboard/session-types" />
                            <Tab label="Bookings" value="/dashboard/bookings" component={NavLink} to="/dashboard/bookings"/>
                            <Tab label="Integrations" value="/integrations" component={NavLink} to="/integrations" />
                        </Tabs>
                        
                        
                        <Tooltip title="Account settings" >
                            <IconButton onClick={handleClick} size="small" sx={{ ml: 2, display: { xs:'none', md: 'block' } }}>
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
                    </ Box>
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                            }}
                        >
                            <Toolbar />
                            <Divider />
                            <List>
                                <ListItem to="/dashboard/session-types" component={Link} button key="Dashboard">
                                    
                                    <ListItemText primary="Dashboard" />
                                </ListItem>
                                <ListItem to="/dashboard/bookings" component={Link} button key="Bookings">
                                    
                                    <ListItemText primary="Bookings" />
                                </ListItem>
                                <ListItem to="/integrations" component={Link} button key="Integrations">
                                    
                                    <ListItemText primary="Integrations" />
                                </ListItem>
                                <Divider />

                                <ListItem to="/profile" component={Link} button key="Profile">
                                    <ListItemIcon>
                                        <Avatar sx={{ width: 28, height: 28 }} /> 
                                    </ListItemIcon>
                                    <ListItemText primary={currentUser.name} />
                                </ListItem>

                                <ListItem onClick={() => { logout()} } button key="Logout">
                                    <ListItemIcon>
                                        <Logout fontSize="small" /> 
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </List>
                            
                    </Drawer>
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

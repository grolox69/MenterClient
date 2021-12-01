import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import theme from 'theme';
import { Route, Routes } from 'react-router-dom';
import { PublicRoute, PrivateRoute } from 'context/AuthContext';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

import Landing from 'pages/public/Landing';
import Login from 'pages/public/Login';
import Register from 'pages/public/Register';

import Dashboard from 'pages/private/dashboard/session-types/Dashboard';
import CreateSessionType from 'pages/private/dashboard/session-types/CreateSessionType';
import EditSessionType from 'pages/private/dashboard/session-types/EditSessionType';
import Bookings from 'pages/private/dashboard/bookings/Bookings';

import Profile from 'pages/private/profile/Profile';

import UserSessionsView from 'pages/private/UserSessionsView';
import BookSession from 'pages/private/BookSession';

import Integrations from 'pages/private/integrations/Integrations';
import NotFound from 'pages/public/NotFound';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Header />
            <Container disableGutters>
                <Routes>
                    <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
                    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

                    <Route path="/dashboard" >
                        <Route exact path="session-types" element={ <PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="session-types/create" element={ <PrivateRoute><CreateSessionType /></PrivateRoute>} />
                        <Route path="session-types/edit/:id" element={ <PrivateRoute><EditSessionType /></PrivateRoute>} />
                        
                        <Route path="bookings" element={ <PrivateRoute><Bookings /></PrivateRoute>} />
                    </Route>

                    <Route path="/:vanity_name" element={ <PrivateRoute><UserSessionsView /></PrivateRoute>} />
                    <Route path="/:vanity_name/:slug" element={ <PrivateRoute><BookSession /></PrivateRoute>} />

                    <Route path="/confirmation/:event_id" />
                    
                    <Route path="/integrations" element={<PrivateRoute><Integrations /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>
            <Footer />
        </ThemeProvider>
    )
}

export default App;
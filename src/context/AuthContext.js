import React from 'react';
import { createContext, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import firebase from "config/firebase";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import axios from 'axios';
import { baseUrl } from 'shared/baseUrl';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const auth = getAuth(firebase);
    const [currentUser, setCurrentUser] = useState(null || JSON.parse(localStorage.getItem('currentUser')));
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) setError(null);
    }, [location.pathname, error])

    let register = (email, password, name) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password).then(({user}) => {
            return user.getIdToken().then((token) => {
                const data = {
                    user: {
                        uid: user.uid,
                        name: name,
                        email: user.email,
                    }
                };

                const header = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }, 
                };
            
                return axios.post(baseUrl+'auth', data, header).then((response) => {
                    if (response.data.success) {
                        setCurrentUser(response.data.user);
                        navigate("/dashboard/session-types");
                        setLoading(false)
                    }
                });
            })
        }).catch((err) => {
            setError(err)
        })
    }

    let login = (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password).then(({user}) => {
            return user.getIdToken().then((token) => {
                const data = {
                    user: {
                        uid: user.uid,
                        email: user.email,
                    }
                };

                const header = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }, 
                };
        
                return axios.post(baseUrl+'auth', data, header).then((response) => {
                    if (response.data.success) {
                        setCurrentUser(response.data.user);
                        navigate("/dashboard/session-types");
                        setLoading(false)
                    }
                });
            })
        }).catch((err) => {
            setError(err)
        })
    }

    let logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
        
        onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUser(currentUser);
            } else {
                setCurrentUser('');
            }
            setLoadingInitial(false);
        })
        
    }, [])

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
    }, [currentUser])

    const value = {
        currentUser,
        setCurrentUser,
        error,
        loading,
        register,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
};

export function PrivateRoute({ children }) {
    let { currentUser } = useAuth();
    let location = useLocation();

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    }

    return children;
}

export function PublicRoute({ children }) {
    let { currentUser, loading } = useAuth();
    let location = useLocation();

    if (currentUser && !loading) {
        return <Navigate to="/dashboard/session-types" state={{ from: location.pathname }} />;
    }

    return children;
}

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import Http401 from '../../errors/Http401';
import { authService } from '../../services/authService';
import { jwtDecode } from 'jwt-decode';


const ProtectedRoute = ({ children }) => {
    const { initialAuthState, authState, setAuthState } = useContext(AuthContext);
    const [isCheckingToken, setIsCheckingToken] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            if (authState?.isAuthenticated && authState?.accessToken) {
                try {
                    const decodedToken = jwtDecode(authState.accessToken);
                    const currentTime = Date.now() / 1000;
                    
                    if (decodedToken.exp < currentTime) {
                        if (authState.refreshToken) {
                            await authService.refreshToken(initialAuthState, authState, setAuthState);
                            setIsAuthorized(true);
                        }
                        else {
                            setAuthState(initialAuthState);
                            setIsAuthorized(false);
                        }
                    }
                    else {
                        setIsAuthorized(true);
                    }
                }
                catch (error) {
                    console.error('Ошибка при проверке токена:', error);
                    setIsAuthorized(false);
                }
            }
            else {
                setIsAuthorized(false);
            }
            
            setIsCheckingToken(false);
        };

        checkAuth();
    }, [authState, initialAuthState, setAuthState]);

    if (isCheckingToken) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    return isAuthorized ? children : <Http401 />;
};

export default ProtectedRoute;


import {useState } from "react";
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({children}) => {
    const initialAuthState = {
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        userData: {
            id: null,
            username: null,
            email: null
        }
    }

    const [authState, setAuthState] = useState(() => {
        const storedAuth = localStorage.getItem("authState");
        return storedAuth ? JSON.parse(storedAuth) : initialAuthState;
    });

    return (
        <AuthContext.Provider value={{initialAuthState, authState, setAuthState}}>
            {children}
        </AuthContext.Provider>
    );
}

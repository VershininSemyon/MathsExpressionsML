
import api from "./api"


export const login = (authState, setAuthState, data) => {
    return api.post("/auth/token/", data).then((response) => {
        const responseData = response.data;

        const newAuthState = {
            ...authState,
            userData: {
                id: responseData.user_id,
                username: responseData.username,
                email: responseData.email
            },
            accessToken: responseData.access,
            refreshToken: responseData.refresh,
            isAuthenticated: true,
        }
        
        setAuthState(newAuthState);
        localStorage.setItem("authState", JSON.stringify(newAuthState));
    })
}


export const logout = (initialAuthState, setAuthState) => {
    setAuthState(initialAuthState);
    localStorage.removeItem("authState");
}


export const register = (initialAuthState, authState, setAuthState, data) => {
    logout(initialAuthState, setAuthState);

    return api.post("/auth/users/", data).then(() => {
        return login(authState, setAuthState, {
            username: data.username,
            password: data.password
        })
    })
}


import api from "./api";

export const authService = {
    login: (authState, setAuthState, data) => {
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
    },

    logout: (initialAuthState, setAuthState) => {
        setAuthState(initialAuthState);
        localStorage.removeItem("authState");
    },

    register: (initialAuthState, authState, setAuthState, data) => {
        authService.logout(initialAuthState, setAuthState);

        return api.post("/auth/users/", data).then(() => {
            return authService.login(authState, setAuthState, {
                username: data.username,
                password: data.password
            })
        })
    },

    refreshToken: async (initialAuthState, authState, setAuthState) => {
        const refreshToken = authState.refreshToken;

        try {
            const response = await api.post("/auth/token/refresh/", {
                refresh: refreshToken
            });

            if (response.status === 200) {
                const newAccess = response.data.access;
                const newAuthState = {...authState, accessToken: newAccess};

                setAuthState(newAuthState);
                localStorage.setItem("authState", JSON.stringify(newAuthState));
                return newAccess;
            } 
            else {
                setAuthState(initialAuthState);
                throw new Error('Refresh token failed');
            }
        } 
        catch (err) {
            console.log(err);
            setAuthState(initialAuthState);
            throw err;
        }
    }
};

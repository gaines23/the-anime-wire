import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import UpdatePasswordModal from "../Components/Modals/UpdatePasswordModal";

// session storage => token
// cookies => refresh
// local => everything else

const AuthContext = React.createContext({
    token: '',
    refresh: '',
    username: '',
    isLoggedIn: false,
    auth: '',
    last_password_update: '',
    login: (token, refresh, username, auth, last_password_update) => {},
    logout: () => {}
});

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedRefresh = localStorage.getItem('refresh');
    const storedUsername = localStorage.getItem('username');
    const storedAuth = localStorage.getItem('auth');
    const storedPW = localStorage.getItem('last_password_update');

    return {
        token: storedToken,
        refresh: storedRefresh,
        username: storedUsername,
        auth: storedAuth,
        last_password_update: storedPW,
    };
};

export const AuthContextProvider = (props) => {
    const navigate = useNavigate();
    const navigateToHome = async () => {
        await navigate('/home', { replace: true });
    };

    const tokenData = retrieveStoredToken();

    let initialToken;
    let initialRefresh;
    let initialUsername;
    let initialAuth;
    let initialPW;

    if (tokenData) {
        initialToken = tokenData.token;
        initialRefresh = tokenData.refresh;
        initialUsername = tokenData.username;
        initialAuth = tokenData.auth;
        initialPW = tokenData.last_password_update;
    }

    const [token, setToken] = useState(initialToken);
    const [refresh, setRefresh] = useState(initialRefresh);
    const [username, setUsername] = useState(initialUsername);
    const [auth, setAuth] = useState(initialAuth);
    const [pw, setPW] = useState(initialPW);
    const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        setRefresh(null);
        setUsername('');
        setAuth('');
        setPW('');
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('username');
        localStorage.removeItem('auth');
        localStorage.removeItem('last_password_update');
        navigateToHome();
    }, []);
    

    const loginHandler = (token, refresh, username, last_password_update, auth) => {
        setToken(token);
        setRefresh(refresh);
        setUsername(username);
        setAuth(auth);
        setPW(last_password_update);
        localStorage.clear();
        localStorage.setItem('token', token);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('username', username);
        localStorage.setItem('auth', auth);
        localStorage.setItem('last_password_update', last_password_update);
    
        // Check if last login is null or older than 3 months
        const now = new Date();
        const lastUpdated = new Date(last_password_update);
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    
        let pw_update = localStorage.getItem(last_password_update);
        let user_id = localStorage.getItem(token);

        if (user_id) {
            if (!pw_update || lastUpdated < threeMonthsAgo || pw_update === 'None' || pw_update === 'null' || pw_update === undefined) {
            setShowUpdatePasswordModal(true); // Open the modal
        } else {
            navigateToHome();
        }
        }
        
    };

    const closeModalHandler = () => {
        setShowUpdatePasswordModal(false); // Close the modal
        navigateToHome();
    };

    const contextValue = {
        token: token,
        refresh: refresh,
        username: username,
        auth: auth,
        last_password_update: pw,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
            {showUpdatePasswordModal && <UpdatePasswordModal onClose={closeModalHandler} autoUpdate={true} user={username}/>}
        </AuthContext.Provider>
    );
};

export default AuthContext;
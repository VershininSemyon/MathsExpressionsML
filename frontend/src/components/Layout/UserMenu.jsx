
import React, { useContext, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { logout } from '../../services/auth';
import { useNavigate } from 'react-router-dom';


const UserMenu = () => {
    const { initialAuthState, authState, setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleLogout = () => {
        logout(initialAuthState, setAuthState);
        navigate('/login');
        setShow(false);
    };

    if (!authState.isAuthenticated) {
        return null;
    }

    return (
        <Dropdown show={show} onToggle={setShow} align="end">
            <Dropdown.Toggle variant="light" className="d-flex align-items-center">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" 
                    style={{ width: '36px', height: '36px' }}>
                    {authState.userData.username?.charAt(0).toUpperCase()}
                </div>
                
                <span>{authState.userData.username}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/profile')}>
                    👤 Профиль
                </Dropdown.Item>

                <Dropdown.Item onClick={() => navigate('/settings')}>
                    ⚙️ Настройки
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item onClick={handleLogout} className="text-danger">
                    🚪 Выйти
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default UserMenu;

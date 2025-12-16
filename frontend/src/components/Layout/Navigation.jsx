
import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';


const Navigation = () => {
    const location = useLocation();
    const { authState } = useContext(AuthContext);

    if (!authState.isAuthenticated) {
        return null;
    }

    const navItems = [
        { path: '/sheets', label: 'Мои листы', icon: '📋' },
        { path: '/sheets/new', label: 'Создать новый лист', icon: '✏️' },
    ];

    return (
        <div className="bg-light border-end p-3" style={{ width: '250px' }}>
            <h5 className="mb-4">Навигация</h5>

            <Nav className="flex-column">
                {navItems.map((item) => (
                    <Nav.Link
                        key={item.path}
                        as={Link}
                        to={item.path}
                        active={location.pathname === item.path}
                        className="mb-2 d-flex align-items-center"
                    >
                        <span className="me-2">{item.icon}</span>
                        {item.label}
                    </Nav.Link>
                ))}
            </Nav>
        </div>
    );
};

export default Navigation;

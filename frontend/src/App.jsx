
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './components/Account/Registration';
import Login from './components/Account/Login';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext/AuthProvider';
import Http404 from './errors/Http404';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/register" element={<Registration />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="*" element={<Http404 />}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App

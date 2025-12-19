
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Account/Login';
import Registration from './components/Account/Registration';
import Layout from './components/Layout/Layout';
import { AuthProvider } from './contexts/AuthContext/AuthProvider';
import Http404 from './errors/Http404';
import CreateSheetPage from './pages/CreateSheetPage';
import DrawPage from './pages/DrawPage';
import Home from './pages/Home';
import SheetDetailPage from './pages/SheetDetailPage';
import SheetsPage from './pages/SheetsPage';
import ProtectedRoute from './components/Account/ProtectedRoute';


const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                <Home />
                            }
                        />
                        <Route 
                            path="/register"
                            element={
                                <Registration />
                            }
                        />
                        <Route 
                            path="/login"
                            element={
                                <Login />
                            }
                        />
                        <Route 
                            path="/sheets"
                            element={
                                <ProtectedRoute>
                                    <SheetsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route 
                            path="/sheets/new"
                            element={
                                <ProtectedRoute>
                                    <CreateSheetPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route 
                            path="/sheets/:sheetId"
                            element={
                                <ProtectedRoute>
                                    <SheetDetailPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route 
                            path="/draw/:sheetId"
                            element={
                                <ProtectedRoute>
                                    <DrawPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route 
                            path="*"
                            element={
                                <Http404 />
                            }
                        />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;

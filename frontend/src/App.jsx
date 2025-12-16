
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


const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/register" element={<Registration />}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/sheets" element={<SheetsPage />}/>
                        <Route path="/sheets/new" element={<CreateSheetPage />}/>
                        <Route path="/sheets/:sheetId" element={<SheetDetailPage />}/>
                        <Route path="/draw" element={<DrawPage />}/>
                        <Route path="/draw/:sheetId" element={<DrawPage />}/>
                        <Route path="*" element={<Http404 />}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;

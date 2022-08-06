import { useState } from 'react';
import { Header } from './Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { list, privateList, publicList } from './helpers/constants';
import { AuthContext } from './Context';
import './App.css';

// TODO: Add SCSS, propTypes, Typescript2.
function App() {
    const token = localStorage.getItem('token');
    const [auth, setAuth] = useState(token);
    return (
        <AuthContext.Provider value={{ token: auth, setToken: setAuth }}>
            <BrowserRouter>
                <Header privateList={privateList} publicList={publicList} />
                <Routes>
                    {list.map(item => <Route key={item.route} path={item.route} element={item.route === '/login' ? item.component : <ProtectedRoute token={token}>{item.component}</ProtectedRoute>} />)}
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}
// https://reactrouter.com/docs/en/v6/getting-started/tutorial
export default App;

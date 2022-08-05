import { Header } from './Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Add } from './Add/Add';
import { Cars } from './Cars/Cars';
import './App.css';

const list = [
    {
        route: '/',
        text: 'Cars',
        component: <Cars />,
    },
    {
        route: '/add',
        text: 'Add Car',
        component: <Add />,
    }];

function App() {
    return (
        <BrowserRouter>
            <Header list={list} />
            <Routes>
                {list.map(item => <Route key={item.route} path={item.route.substring(1)} element={item.component} />)}
            </Routes>
        </BrowserRouter>
    );
}
// https://reactrouter.com/docs/en/v6/getting-started/tutorial
export default App;

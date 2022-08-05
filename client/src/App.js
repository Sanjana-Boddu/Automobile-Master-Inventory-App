import { Header } from './Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { list } from './helpers/constants';
import './App.css';

// TODO: Add classnames, SCSS, propTypes, Typescript2.
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

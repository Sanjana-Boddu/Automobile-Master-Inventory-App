import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './Header.css';
import { AuthContext } from '../Context';

export const Header = ({ privateList = [], publicList = [] }) => {
    const { token } = useContext(AuthContext);
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);

    useEffect(() => {
        if (active !== location.pathname) {
            setActive(location.pathname);
        }
    }, [active, location.pathname]);
    
    return <div className="header">
        {token !== null && privateList.map(item => {
            const { route, text } = item;
            return <Link to={route} key={text}
                className={classNames({
                    'menu-item': true,
                    'active': route === active,
                    'right': route === '/logout'
                })}
                onClick={() => {
                    setActive(route);
                }}>{text}</Link>;
        })}
        {token === null && publicList.map(item => {
            const { route, text } = item;
            return <Link to={route} key={text}
                className={classNames({
                    'menu-item': true,
                    'active': route === active,
                })}
                onClick={() => {
                    setActive(route);
                }}>{text}</Link>;
        })}
    </div>;
};

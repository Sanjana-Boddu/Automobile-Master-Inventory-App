import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export const Header = ({ list }) => {
    const location = useLocation();
    const [active, setActive] = useState(location.pathname);

    if (active !== location.pathname) {
        setActive(location.pathname);
    }

    return <div className="header">
        {list.map(item => <Link to={item.route} key={item.text}
            className={active === item.route ? 'menu-item active' : 'menu-item'}
            onClick={() => {
                setActive(item.route);
            }}>{item.text}</Link>)}
    </div>;
};

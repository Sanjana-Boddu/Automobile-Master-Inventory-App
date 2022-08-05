import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header = ({list}) => {
    const [active, setActive] = useState(list[0].text);
    return <div className="header">
        {list.map(item => <Link to={item.route} key={item.text}
                               className={active === item.text ? 'menu-item active' : 'menu-item'}
                               onClick={() => {
                                   setActive(item.text);
                               }}>{item.text}</Link>)}
    </div>;
};

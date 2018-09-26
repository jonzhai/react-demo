import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import './style/common_footer.scss';

const CommonFooter = () => {
    return (
        <nav className="fixed_footer">
            <ul className="footer-nav">
                <li className="nav-item">
                    <NavLink to= '/home' className="home" activeClassName="selected">
                        <p className="icon-little"></p>
                        <p className="icon-text">首页</p>
                    </NavLink>    
                </li>
                <li className="nav-item">
                    <NavLink to= '/invesment' className="investment" activeClassName="selected">
                        <p className="icon-little"></p>
                        <p className="icon-text">投资</p>
                    </NavLink>    
                </li>
                <li className="nav-item">
                    <NavLink to= '/cars' className="buy-car" activeClassName="selected">
                        <p className="icon-little"></p>
                        <p className="icon-text">购车</p>
                    </NavLink>    
                </li>
                <li className="nav-item">
                    <NavLink to= '/me' className="personal-center" activeClassName="selected">
                        <p className="icon-little"></p>
                        <p className="icon-text">我</p>
                    </NavLink>    
                </li>
            </ul>
        </nav>
    
    )
}

export default CommonFooter;


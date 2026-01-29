import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container nav-content">
                <div className="logo">
                    <i className="fa-solid fa-keyboard"></i> Typing
                    <span className="highlight">Center</span>
                </div>

                <ul className="nav-links">
                    <li><Link to="/" className="active">Home</Link></li>
                    <li><Link to="/">Typing Courses</Link></li>
                    <li><Link to="/exam">Exams</Link></li>
                    <li><Link to="/login" className="btn-login">Login</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

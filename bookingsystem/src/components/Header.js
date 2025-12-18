import { NavLink } from "react-router-dom";
import '../App.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <img src="/BookingSystem.png" alt="logo" style={{height: '40px'}} />
                </div>
                <nav className="nav-links">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/services">Services</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/customer-dashboard">My Bookings</NavLink>
                    <NavLink to="/provider-registration">Become Provider</NavLink>
                    <NavLink to="/auth" className="btn-primary">Login</NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;
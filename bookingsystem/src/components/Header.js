import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import '../App.css';

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const handleLogout = () => {
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
        navigate('/home');
    };

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
                    {user ? (
                        <button onClick={handleLogout} className="btn-primary">Logout</button>
                    ) : (
                        <NavLink to="/auth" className="btn-primary">Login</NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import { FaRegCalendarCheck, FaRegCreditCard } from 'react-icons/fa';
import axios from 'axios';

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('');
    //const [bookings, setBookings] = useState([]);
    //const [loading, setLoading] = useState(true);

    
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getLoggedInUser = () => {
        if (user) {
            return user.email; // Display username if user is logged in
        }
        //return 'Loading...'; // Fallback if no user is logged in
    };

    const renderContent = () => {
        switch (activeMenu) {
            case 'myBookings':
                return (
                    <section style={styles.section}>
                        <h2><FaRegCalendarCheck /> My Bookings</h2>
                        <p style={styles.message}>No previous bookings.</p>
                        <Link to="/booking" style={styles.bookNowButton}>Book Now</Link>
                    </section>
                );
            case 'scheduleAppointment':
                return (
                    <section style={styles.section}>
                        <h2>Schedule My Appointment</h2>
                        <p>Here you can schedule your appointment.</p>
                        <iframe
                            src="https://calendly.com/bowana2019"
                            style={styles.calendlyIframe}
                            width="100%"
                            height="600px"
                            frameBorder="0"
                        />
                    </section>
                );
            case 'makePayment':
                return (
                    <section style={styles.section}>
                        <h2><FaRegCreditCard /> Payments</h2>
                        <p style={styles.message}>You haven't made any payments yet.</p>
                        <Link to="/booking" style={styles.bookNowButton}>Book Now</Link>
                    </section>
                );
            default:
                return <p style={styles.message}>Please select an option from the menu.</p>;
        }
    };

    return (
        <div style={styles.dashboardContainer}>
            <div style={styles.sidebar}>
                <h2>Dashboard</h2>
                <ul style={styles.menuList}>
                    <li style={styles.menuItem}>
                        <button onClick={() => setActiveMenu('myBookings')} style={styles.button}>
                            My Bookings
                        </button>
                    </li>
                    <div style={styles.separator}></div>
                    <li style={styles.menuItem}>
                        <button onClick={() => setActiveMenu('scheduleAppointment')} style={styles.button}>
                            Schedule My Appointment
                        </button>
                    </li>
                    <div style={styles.separator}></div>
                    <li style={styles.menuItem}>
                        <button onClick={() => setActiveMenu('makePayment')} style={styles.button}>
                            Make Payment
                        </button>
                    </li>
                    <div style={styles.separator}></div>
                    <li style={styles.menuItem}>
                        <button onClick={handleLogout} style={styles.button}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
            <div style={styles.content}>
                <h1>Welcome back, {getLoggedInUser()}!</h1>
                {renderContent()}
            </div>
        </div>
    );
}

const styles = {
    dashboardContainer: {
        display: 'flex',
        height: '100vh',
    },
    sidebar: {
        width: '250px',
        background: '#89735c',
        padding: '20px',
    },
    menuList: {
        listStyleType: 'none',
        padding: 0,
    },
    menuItem: {
        marginBottom: '10px',
    },
    button: {
        textDecoration: 'none',
        color: '#FFFFFF',
        padding: '10px 15px',
        display: 'block',
        transition: 'background 0.3s',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
    },
    separator: {
        height: '1px',
        background: 'rgb(162,163,132)',
        margin: '5px 0',
    },
    content: {
        flex: 1,
        padding: '20px',
    },
    section: {
        marginTop: '20px',
        padding: '15px',
        background: 'rgb(162,163,132)',
        borderRadius: '5px',
    },
    message: {
        fontSize: '16px',
        color: '#666',
    },
    bookNowButton: {
        display: 'inline-block',
        marginTop: '10px',
        padding: '10px 15px',
        background: '#89735C',
        color: '#fff',
        borderRadius: '5px',
        textDecoration: 'none',
        transition: 'background 0.3s',
    },
    calendlyIframe: {
        border: 'none',
    },
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { useAuth } from './Auth';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { userData, logout } = useAuth(); // Access user data and logout function
    const [appointments, setAppointments] = useState([]);
    const [totalPaid, setTotalPaid] = useState(0); // To store the total amount paid
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/appointments', {
                    headers: { Authorization: `Bearer ${userData.token}` } // Use the user's token for authentication
                });
                setAppointments(response.data);

                // Calculate the total amount paid
                const total = response.data.reduce((sum, appointment) => sum + appointment.amountPaid, 0);
                setTotalPaid(total);
            } catch (error) {
                console.error('Error fetching appointments', error);
            }
        };

        fetchAppointments();
    }, [userData]);

    const handleLogout = () => {
        logout(); // Call the logout function from context
        navigate('/login'); // Redirect to the login page
    };

    const handleBookAgain = (appointmentId) => {
        // Redirect to the booking page with the appointment ID
        navigate(`/book/${appointmentId}`); // Adjust the route as necessary
    };

    const handleBookNewAppointment = () => {
        // Redirect to the booking page for a new appointment
        navigate('/booking'); // Adjust the route as necessary
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Welcome to Bowana Dashboard!</h1>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
                <ul className="divide-y divide-gray-200">
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <li key={appointment.id} className="py-2 flex justify-between items-center">
                                <div className="flex-1">
                                    <span>{appointment.details}</span>
                                    <span className="ml-4">${appointment.amountPaid}</span> {/* Assuming amountPaid is in the appointment data */}
                                </div>
                                <button
                                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-300 ml-4"
                                    onClick={() => handleBookAgain(appointment.id)}
                                >
                                    Book Again
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>No appointments found.</p>
                    )}
                </ul>

                <div className="mt-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Total Amount Paid: ${totalPaid}</h2>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                        onClick={handleBookNewAppointment}
                    >
                        Book a New Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard
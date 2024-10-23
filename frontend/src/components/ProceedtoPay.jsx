import React from 'react';

const ProceedToPayModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 className="text-2xl mb-4">Proceed to Pay</h2>
                <p>New user? Register now!</p>
                <button onClick={() => window.location.href = '/register'} style={styles.button}>Register</button>
                <p className="mt-4">Already have an account? Login below!</p>
                <button onClick={() => window.location.href = '/login'} style={styles.button}>Login</button>
                <button onClick={onClose} style={styles.closeButton}>Close</button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '500px',
        textAlign: 'center',
    },
    button: {
        margin: '10px',
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    closeButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default ProceedToPayModal;
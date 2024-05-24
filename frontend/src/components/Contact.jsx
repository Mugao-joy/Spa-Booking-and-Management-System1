import React, {useState} from 'react';
import contactimage from '../assets/salt.jpg'
import Navbar from './Navbar';
import emailjs from '@emailjs/browser'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_jhay48f', 'template_c2xlabi',formData,{publicKey: 'nLAv_Dh9dVlpHnNUK'})
      .then((result) => {
        console.log('Email sent successfully!', result.text)
        setSuccessMessage('Email sent successfully!')
        setTimeout(() => {
          setSuccessMessage('')
        }, 5000)
        // Clear the form after submission
        setFormData({ name: '', email: '', message: '' })
      })
      .catch((error) => {
        console.error('Error sending email:', error.text);
        setErrorMessage('Error sending email. Please try again later.');
        // Clear the error message after a few seconds
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      });

    
    
  };
  return (
    <div style={{ backgroundColor: '#D5D6BD' }}>
      <Navbar />
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              frameBorder="0"
              title="map"
              marginHeight="0"
              marginWidth="0"
              scrolling="no"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.867443222198!2d36.7889719!3d-1.242941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3d5eef234b95%3A0xac9e573f43fe5923!2sRosslyn%20Riviera%20Mall!5e0!3m2!1sen!2ske!4v1647824161687!5m2!1sen!2ske"
              style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}
            ></iframe>
            <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                <p className="mt-1">Rosslyn Riviera Mall, First Floor, East Wing</p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                <a className="text-indigo-500 leading-relaxed">services@bowana.com</a>
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                <p className="leading-relaxed">+254 790 290 468</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">We look forward to connecting with you</h2>
            <p className="leading-relaxed mb-5 text-gray-600">Request a Consultation</p>
            
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              {successMessage && <p className="text-green-500">{successMessage}</p>}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
              <textarea id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
            <button type ='submit' onClick={handleSubmit} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">SEND</button>
            <p className="text-xs text-gray-500 mt-3">Thank you for sharing your feedback with us! We appreciate your input and will use it to enhance your future spa experiences.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
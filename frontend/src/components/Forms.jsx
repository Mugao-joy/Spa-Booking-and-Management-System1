import React, { useState , useRef} from 'react';
import './Forms.css';
import emailjs from '@emailjs/browser'

const SubscribeForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState(null)

  

  const handleSubscribe = async (e) => {
    e.preventDefault();
  
    // Implement logic to send data to the backend maybe
    //email.js
    const templateParams = {
      name,
      couponCode : generateCouponCode()
      
    }
    emailjs.sendForm('service_jhay48f','template_c2xlabi', templateParams,{publicKey: 'nLAv_Dh9dVlpHnNUK'}

      )
      .then(response => {
        console.log('SUCCESS!', response.status, response.text)
        setSubscribed(true)
      }, error => {
        console.error('FAILED...', error)
        setError('Failed to send email. Please try again')
      }
    )
  }

  //coupo code generator
  const generateCouponCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase()
  }


  return (
    <div className="subscribe-form-container">
      <div className="subscribe-form">
        <h2>Subscribe to Mailing List for 50% Discount</h2>
        {subscribed ? (
          <div>
            <p>Check your email for the coupon to use at checkout.</p>
            <button className="book-now-btn" onClick={() => (window.location.href = '/booking')}>
              Book Now
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubscribe}>
            <div className="input-group">
              <label htmlFor="name">Name *:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email *:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
            <button type="submit" className="subscribe-btn">
              Subscribe
            </button>
            {error && <p className='error-message'>{error}</p>}
          </form>
        )}
      </div>
    </div>
  )
}

export default SubscribeForm

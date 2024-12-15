import React, { useState } from "react";
import z from "zod";
import { useAuth } from "../hooks/use-auth.js";
import { useNavigate, useParams } from "react-router-dom";
import "./ContactPage.css"; 

const contactformSchema = z.object({
   
});

function Contactform() {
  const navigate = useNavigate();
  const {auth, setAuth} = useAuth();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    message: "",
  });


  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = contactformSchema.safeParse(credentials);
        if (!result.success) {
          const error = result.error.errors?.[0];
          if (error) {
            alert(error.message);
          }
          return;
        } else {
          
            
            navigate("/");
        
        }
  };
  

  return (
    <div className="contact-page">
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Please reach out with any questions or feedback.</p>
      </section>

      <section className="contact-details">
        <h2>Get in Touch</h2>
        <p>Email: support@tinymiracles.org</p>
        <p>Phone: +61 12345678</p>
        <p>Address: 123  Lane, perth City, WA</p>
      </section>

      <section className="feedback-form">
        <h2>Send Us Your Feedback</h2>
        
          <form onSubmit={handleSubmit}>
            <div className="contact form">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
          
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                placeholder="Enter your message or feedback"
                
                onChange={handleChange}
                rows="5"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Submit Feedback
            </button>
          </form>
         
          <div className="thank-you-message">
            <h3>Thank You for Your Feedback!</h3>
            <p>We appreciate you taking the time to share your thoughts with us.</p>
          </div>
      
      </section>
    </div>
  );
}

export default Contactform;

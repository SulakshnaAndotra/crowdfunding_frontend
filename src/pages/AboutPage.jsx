import React from "react";
import "./AboutPage.css"; 
import Image from "../img/Aboutpage.webp"
function AboutPage() {
  return (
    <div className="about-page">
      <section className="hero-section">
        <h1 className="hero-title">Together for Tiny Miracles</h1>
        <p className="hero-subtitle">
          Help Families Give Their Babies the Best Start in Life!
        </p>
      </section>

      <img src={Image} className="AboutPageImg" />
      
      <section className="mission-section">
        <h2 className="section-title">Our Mission</h2>
        <p className="section-content">
          Every baby deserves a bright start in life, but some families need a helping hand. 
          We're here to create a community where kindness and generosity come together to 
          support little ones in need.
        </p>
      </section>
      
      <section className="impact-section">
        <h2 className="section-title">Why Your Support Matters</h2>
        <p className="section-content">
          Your contribution can make a world of difference—because every baby is a miracle 
          worth celebrating. Together, we can provide essentials, care, and love to those 
          who need it most. Join us in this heartfelt mission to make an impact, one family 
          at a time.
        </p>
      </section>
      
    </div>
  );
}

export default AboutPage;

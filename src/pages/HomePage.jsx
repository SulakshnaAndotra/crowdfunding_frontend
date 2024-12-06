import { useState } from "react";
import { Link, Outlet} from "react-router-dom";
import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm.jsx";
import "./HomePage.css";
import { useAuth } from "../hooks/use-auth.js";


function HomePage() {
    const {auth, setAuth} = useAuth();
    const { projects } = useProjects();
    const [openProjectForm, setOpenProjectForm] = useState(false);

    const showForm = () => {
      setOpenProjectForm(true)
    }
    return (
      <>
    <div>
    <div className="banner">
        <video
            autoPlay
            muted
            loop
            playsInline
            className="banner-video"
        >
            <source src="src/img/banner.mp4" type="video/mp4" />
            <source src="/path-to-your-video.webm" type="video/webm" />
            {/* Fallback for older browsers */}
            Your browser does not support the video tag.
            <img src="src/img/fallback.jpg" alt="Banner Fallback" />
        </video>
      {/* Overlay Content */}
      <div className="banner-content">
        <h1>Welcome to CradleConnect</h1>
        <p>Supporting families and celebrating tiny miracles!</p>
      </div>
    </div>

      <div className="main-content">
        <div id= "create-project">
        <p1>"Together for Tiny Miracles: Help Families Give Their Babies the Best Start in Life!"</p1>
        <p2>Every baby deserves a bright start in life, but some families need a helping hand. Join us in creating a community where kindness and generosity come together to support little ones in need. Your contribution can make a world of difference—because every baby is a miracle worth celebrating.</p2>
        {auth.token ? (
             <Link to="/projectform">Creat Project</Link>
            ) : (
              <Link to="/signup">Creat an account</Link>
        )}

        {openProjectForm && <ProjectForm />}
        </div>
        


      </div>


        <div id="project-list">
            {projects.map((projectData, key) => {
                return <ProjectCard key={key} projectData={projectData} />;
            })}
        </div>

        
      <div id="contact-section">
        <h2>Contact Us</h2>
        <p2>We’d love to hear from you! Reach out to us at:</p2>
        <ul>
          <li>Email: contact@example.com</li>
          <li>Phone: +123 456 7890</li>
          <li>Address: 123 Baby App Lane, Dream City</li>
        </ul>
      </div>
    </div>
    </>
    );
  }
  
  export default HomePage;
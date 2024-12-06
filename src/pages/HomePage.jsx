import { useState } from "react";
import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm.jsx";
import "./HomePage.css";

function HomePage() {
    const { projects } = useProjects();
    const [openProjectForm, setOpenProjectForm] = useState(false);

    const showForm = () => {
      setOpenProjectForm(true)
    }
    return (
      <>
     <div>
      <div id="banner">
        <img 
          src="src/img/banner-image.jpg.webp" 
          alt="Banner" 
          className="banner-image" 
        />
      </div>
      <div>
        <div id= "create-project">
        <p1>"Together for Tiny Miracles: Help Families Give Their Babies the Best Start in Life!"</p1>
        <p2>Every baby deserves a bright start in life, but some families need a helping hand. Join us in creating a community where kindness and generosity come together to support little ones in need. Your contribution can make a world of difference—because every baby is a miracle worth celebrating.</p2>
        <button onClick={showForm}>Create Project</button>
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
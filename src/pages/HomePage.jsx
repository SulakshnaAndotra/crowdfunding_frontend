import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import "./HomePage.css";

function HomePage() {
    const { projects } = useProjects();
    return (
     <div>
    
      <div id="banner">
        <img 
          src="src/img/banner-image.jpg.webp" 
          alt="Banner" 
          className="banner-image" 
        />
      </div>
        <div id="project-list">
            {projects.map((projectData, key) => {
                return <ProjectCard key={key} projectData={projectData} />;
            })}
        </div>

        
      <div id="contact-section">
        <h2>Contact Us</h2>
        <p>We’d love to hear from you! Reach out to us at:</p>
        <ul>
          <li>Email: contact@example.com</li>
          <li>Phone: +123 456 7890</li>
          <li>Address: 123 Baby App Lane, Dream City</li>
        </ul>
      </div>
    </div>
    );
  }
  
  export default HomePage;
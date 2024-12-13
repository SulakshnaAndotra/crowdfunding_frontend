import { useState } from "react";
import { useAuth } from "../hooks/use-auth.js";
import { useNavigate } from "react-router-dom";
import useProject from "../hooks/use-projects.js";
import postProject from "/src/api/post-project.js";
import z from "zod";

const projectformSchema = z.object({
    title: z.string().min(1, { message: "Title must not be empty" }),
    description: z.string().min(8, { message: "Description must not be empty" }),
    goal: z.string().min(1, { message: "Goal must not be empty" }),
    image: z.string().min(1, { message: "Image must not be empty" }),
  });
function projectform() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    const [credentials, setCredentials] = useState({
        title: "",
        description: "",
        goal: "",
        image:"",
        active: false,
    });
    console.log(credentials)

    const handleCheckboxChange = (event) => {
      setCredentials((prevCredentials) => {
        return  {
          ...prevCredentials,
          active: event.target.checked}
      });
    };
 
    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => {
          return {
            ...prevCredentials,
            [id]: value,
          };
        });
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        const result = projectformSchema.safeParse(credentials);
        console.log(result)
        if (!result.success) {
          const error = result.error.errors?.[0];
          if (error) {
            alert(error.message);
          }
          return;
        } else {
          postProject(result.data.title, result.data.description, result.data.goal,result.data.image,).then((response) => {
            window.localStorage.setItem("token", response.token);
            setAuth({
                   token: response.token,
                   });
            navigate("/");
          });
        }
      };

    return (
    <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="title">Title:</label>
        <input
                type="text"
                id="title"
                placeholder="Enter the title"
                onChange={handleChange}
            />
        </div>
        <div>
        <label htmlFor="description">Description:</label>
        <input
                type="text"
                id="description"
                placeholder="Enter the full description"
                onChange={handleChange}
            />
        </div>
        <div>
        <label htmlFor="goal">Goal:</label>
        <input
                type= "number"
                id="goal"
                placeholder="Enter the Goal Amountr in $"
                onChange={handleChange}
            />
        </div>
        <div>
        <label htmlFor="image">image:</label>
        <input
                type= "url"
                id="image"
                placeholder="upload the image"
                onChange={handleChange}
            />
        </div>
        <div>
        <label htmlFor="active">Active:</label>
        <input
                type= "checkbox"
                checked={credentials.active}
                id="active"
                placeholder=""
                onChange={handleCheckboxChange}
            />
        </div>
        <button type="submit">
            Creat Project
        </button>
    </form>
    );







}


export default projectform;

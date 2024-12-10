import { useState } from "react";
import { useAuth } from "../hooks/use-auth.js";
import { useNavigate } from "react-router-dom";
import useProject from "../hooks/use-projects.js";
import postProject from "/src/api/post-project.js";
import z from "zod";

const projectformSchema = z.object({
    Tittle: z.string().min(1, { message: "Tittle must not be empty" }),
    Description: z.string().min(8, { message: "Description must not be empty" }),
    Goal: z.string().min(1, { message: "Goal must not be empty" }),
    Image: z.string().min(1, { message: "Image must not be empty" }),
  });
function projectform() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    const [credentials, setCredentials] = useState({
        tittle: "",
        description: "",
        goal: "",
        image:"",
        active:"",
    });

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
        if (!result.success) {
          const error = result.error.errors?.[0];
          if (error) {
            alert(error.message);
          }
          return;
        } else {
          postLogin(result.data.Tittle, result.data.Description, result.data.Goal,result.data.Image,).then((response) => {
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
        <label htmlFor="tittle">Tittle:</label>
        <input
                type="text"
                id="tittle"
                placeholder="Enter the tittle"
                onChange={handleChange}
            />
        </div>
        <div>
        <label htmlFor="Descritpion">Description:</label>
        <input
                type="description"
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
                id="active"
                placeholder=""
                onChange={handleChange}
            />
        </div>
        <button type="submit" onClick={handleSubmit}>
            Creat Project
        </button>
    </form>
    );







}


export default projectform;

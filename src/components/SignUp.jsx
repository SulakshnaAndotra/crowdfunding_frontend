import { useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import postSignup from "../api/post-signup.js";
import { useAuth } from  "../hooks/use-auth.js";

const loginSchema = z.object({
    username: z.string().min(1, { message: "Username must not be empty" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
      firstname: z.string().min(1, { message: "firstname must not be empty" }),
      lastname: z.string().min(1, { message: "lastname must not be empty" }),
      email: z.string().min(1, { message: "email must not be empty" }),
  });

function SignupForm() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const result = loginSchema.safeParse(credentials);
        try {
          const response = await postSignup(username, password, firstname, lastname, email);
          console.log("Signup successful", response);
          // Handle successful signup (e.g., redirect to login page)
        } catch (error) {
          console.error("Signup failed", error);
          alert(error.message); // Show error message to the user
        }
      };
    
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
                type="text"
                id="username"
                placeholder="Enter username"
                onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="firstname">FirstName:</label>
          <input
                type="text"
                id="firstname"
                placeholder="Enter your first name"
                onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="lastname">LastName:</label>
          <input
                type="text"
                id="lastname"
                placeholder="Enter your last name"
                onChange={handleChange}
            />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
                type="text"
                id="email"
                placeholder="Enter your email address"
                onChange={handleChange}
            />
        </div>
        <button type="submit" onClick={handleSubmit}>
            Signup
        </button>
      </form>
    );
  }
  
  export default SignupForm;
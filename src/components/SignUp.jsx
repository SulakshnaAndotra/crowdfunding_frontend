import { useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import postSignup from "../api/post-signup.js";
import postLogin from "../api/post-login.js";
import useAuth from "../hooks/use-auth.js";

const loginSchema = z.object({
    username: z.string().min(1, { message: "Username must not be empty" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  });

function LoginForm() {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const result = loginSchema.safeParse(credentials);
        if (!result.success) {
          const error = result.error.errors?.[0];
          if (error) {
            alert(error.message);
          }
          return;
        } else {
          postLogin(result.data.username, result.data.password).then((response) => {
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
  
  export default LoginForm;
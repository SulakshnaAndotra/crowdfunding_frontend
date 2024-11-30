import { useState } from "react";

import postLogin from "../api/post-login.js";

function LoginForm() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            postLogin(
                credentials.username,
                credentials.password, 
                credentials.firstname,
                credentials.lastname,
                credentials.email
            ).then((response) => {
                window.localStorage.setItem("token", response.token);
            });
        }
    };
    return (
      <form>
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
            Login
        </button>
      </form>
    );
  }
  
  export default LoginForm;
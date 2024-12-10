import { useState } from "react";
import { useNavigate } from "react-router-dom";
import z from "zod";
import postSignup from "../api/post-signup.js";
import { useAuth } from "../hooks/use-auth.js";

const signupSchema = z.object({
  username: z.string().min(1, { message: "Username must not be empty" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  firstname: z.string().min(1, { message: "First name must not be empty" }),
  lastname: z.string().min(1, { message: "Last name must not be empty" }),
  email: z.string().email({ message: "Invalid email address" }),
});

function SignupForm() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleFileChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = signupSchema.safeParse(credentials);

    if (!result.success) {
      alert(result.error.errors[0]?.message || "Invalid input");
      return;
    }

    try {
      // Create FormData object for sending file and text data
      const formData = await new FormData();
      formData.append("username", credentials.username);
      formData.append("password", credentials.password);
      formData.append("firstname", credentials.firstname);
      formData.append("lastname", credentials.lastname);
      formData.append("email", credentials.email);

      if (profileImage) {
        formData.append("profile_image", profileImage); // "profile_image" is the backend field name
      }

      // Call API function
      const response = await postSignup(formData);
      console.log("Signup successful:", response);

      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      // alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" placeholder="Enter username" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Password" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="firstname">First Name:</label>
        <input type="text" id="firstname" placeholder="Enter your first name" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" placeholder="Enter your last name" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Enter your email address" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="profileImage">Profile Picture:</label>
        <input type="file" id="profileImage" onChange={handleFileChange} />
      </div>
      <button type="submit">Signup</button>
    </form>
  );
}

export default SignupForm;

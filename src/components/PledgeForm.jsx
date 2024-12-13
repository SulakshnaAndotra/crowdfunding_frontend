import { useState } from "react";
import { useAuth } from "../hooks/use-auth.js";
import { useNavigate } from "react-router-dom";
import z from "zod";
import postPledge from "/src/api/post-pledge.js";

const pledgeformSchema = z.object({
    Amount: z.string().min(1, { message: "Amount must not be empty" }),
  });
function pledgeform() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    const [credentials, setCredentials] = useState({
        amount: "",
        Comment: "",
        anonymous: false,
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
        const result = pledgeformSchema.safeParse(credentials);
        if (!result.success) {
          const error = result.error.errors?.[0];
          if (error) {
            alert(error.message);
          }
          return;
        } else {
          postPledge(result.data.amount, result.data.Comment, result.data.anonymous,).then((response) => {
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
        <label htmlFor="amount">Amount:</label>
        <input
                type="number"
                id="amount"
                placeholder="Enter the amount in $"
                onChange={handleChange}
            />
        </div>
        <div>
        <label htmlFor="comment">Comment:</label>
        <input
                type="text"
                id="comment"
                placeholder="Enter your comment"
                onChange={handleChange}
            />
        </div>
        <div>
        <label htmlFor="anonymous">Active:</label>
        <input
                type= "checkbox"
                id="anonymous"
                placeholder=""
                onChange={handleChange}
            />
        </div>
        <button type="submit" onClick={handleSubmit}>
            Submit
        </button>
    </form>
    );







}


export default projectform;

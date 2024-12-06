async function postSignup(username, password, firstname, lastname, email) {
    const url = `${import.meta.env.VITE_API_URL}/api-token-auth/user/`;
    const response = await fetch(url, {
      method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
        "firstname": firstname,
        "lastname": lastname,
        "email": email,

      }),
    });
  
    if (!response.ok) {
      const fallbackError = `Error trying to signup`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postSignup;
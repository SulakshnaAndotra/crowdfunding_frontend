async function postPledge(amount, comment, anonymous, project, supporter) {
  console.log(amount, comment, anonymous, project, supporter)
    const url = `${import.meta.env.VITE_API_URL}/pledges`;
  
    const response = await fetch(url, {
      method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({
        "amount": amount,
        "comment": comment,
        "is_open": anonymous,
        "project": project,
        "supporter": 1
      }),
    });
  
    if (!response.ok) {
      const fallbackError = `Error make a pledge`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postPledge;

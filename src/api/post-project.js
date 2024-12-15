async function postProject(title, description, goal, image, active, token) {
    const url = `${import.meta.env.VITE_API_URL}/projects/`;
  
    const response = await fetch(url, {
      method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
      headers: {
        "Content-Type": "application/json",
         Authorization: `Token ${token}`,
        
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "goal": goal,
        "image": image,
        "is_open" : active,
      }),
    });
  
    if (!response.ok) {
      const fallbackError = `Error make a project`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postProject;

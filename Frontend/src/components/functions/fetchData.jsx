import axios from "axios";

export async function fetchData(setUserAtom) {
  try {
    const response = await axios.get("/me");
    if (response.data.userEmail) {
      const user = {
        isAuthenticated: true,
        userEmail: response.data.userEmail,
        username: response.data.username,
        isOwner: response.data.isOwner,
        id:response.data.id,
      };
      setUserAtom(user);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// export default fetchData;

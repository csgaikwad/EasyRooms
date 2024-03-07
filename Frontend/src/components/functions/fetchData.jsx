import axios from "axios";

export async function fetchData(setUserAtom) {
  try {
    const response = await axios.get("/me");
    const user = {
      isAuthenticated: true,
      userEmail: response.data.userEmail,
      username: response.data.username,
      isOwner: response.data.isOwner,
    };
    setUserAtom(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

// export default fetchData;

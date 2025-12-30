import axios from "axios";
import api from "./axios";

export default async function fetchData(setUserAtom) {
  try {
    const response = await api.get("/me");
    if (response.data.userEmail) {
      const user = {
        isAuthenticated: true,
        userEmail: response.data.userEmail,
        username: response.data.username,
        isOwner: response.data.isOwner,
        id: response.data.id,
      };
      setUserAtom(user);
    } else {
      // No user data → not logged in
      setUserAtom({ isAuthenticated: false });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);

    setUserAtom({ isAuthenticated: false });
  }
}

// export default fetchData;

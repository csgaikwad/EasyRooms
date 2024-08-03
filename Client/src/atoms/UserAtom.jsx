import { atom } from "recoil";


export const UserAtom = atom({
    key: "UserAtom",
    default: {
      isAuthenticated: false,
      id: "",
      userEmail:"",
      username: "",
      isOwner: false,
    },
  });
import { atom } from "recoil";


export const UserAtom = atom({
    key: "UserAtom",
    default: {
      isAuthenticated: false,
      userEmail:"",
      username: "",
      isOwner: false,
    },
  });
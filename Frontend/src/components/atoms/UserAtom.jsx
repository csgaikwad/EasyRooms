import { atom } from "recoil";


export const UserAtom = atom({
    key: "UserAtom",
    default: {
      isAuthenticated: false,
      userId: null,
      userEmail:"",
      username: "",
      isOwner: false,
    },
  });
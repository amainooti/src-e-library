import { atom } from "recoil";

const userState = atom({
  key: "userState",
  default: {
    data: {
      email: "",
      firstname: "",
      lastname: "",
      college: "",
      department: "",
      level: "",
      roles: [],
    },
    loggedIn: false,
  },
});

export default userState;

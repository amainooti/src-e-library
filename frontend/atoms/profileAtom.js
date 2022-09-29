import { atom } from "recoil";

export const loginModalState = atom({
  key: "loginModalState",
  default: false,
});

export const profileShowState = atom({
  key: "profileShowState",
  default: false,
});

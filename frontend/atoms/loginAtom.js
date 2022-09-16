import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const openModal = atom({
  key: "openModal",
  default: false,
});

export const openProfile = atom({
  key: "openProfile",
  default: false,
});

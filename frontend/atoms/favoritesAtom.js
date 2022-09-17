import { atom } from "recoil";

export const favoritesListState = atom({
  key: "FavoritesList",
  default: [],
});

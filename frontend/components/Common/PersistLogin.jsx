import React from "react";
import { useRecoilState } from "recoil";
import userState from "../../atoms/userAtom";
import { favoritesListState } from "../../atoms/favoritesAtom";
import axiosInstance from "../../pages/api/axiosInstance";
import { getFromLocalStorage } from "../../utils/browserStorage";

import { convertRoles } from "../../utils/helper";
import useAxiosPrivate from "../../hooks/usePrivateAxios";

const PersistLogin = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);
  const [favList, setFavList] = useRecoilState(favoritesListState);

  const axiosPrivate = useAxiosPrivate();

  React.useEffect(() => {
    const token = getFromLocalStorage("token");
    const verifyUser = async () => {
      await axiosInstance
        .get("/api/users/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser({
            loggedIn: true,
            data: { ...res.data, roles: convertRoles(res?.data?.roles) },
          });
        });
    };
    if (token && !user?.loggedIn) {
      verifyUser();
    }
  }, [setUser, user?.loggedIn]);

  React.useEffect(() => {
    const getFavorites = async () => {
      await axiosPrivate.get("/api/document/favorite").then((res) => {
        setFavList(res.data);
      });
    };
    if (user?.loggedIn) {
      getFavorites();
    }
  }, [axiosPrivate, setFavList, user?.loggedIn]);

  return <>{children}</>;
};

export default PersistLogin;

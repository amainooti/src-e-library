import React from "react";
import { useRecoilState } from "recoil";
import userState from "../../atoms/userAtom";
import axiosInstance from "../../pages/api/axiosInstance";
import { getFromLocalStorage } from "../../utils/browserStorage";

import { convertRoles } from "../../utils/helper";

const PersistLogin = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);

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

  return <>{children}</>;
};

export default PersistLogin;

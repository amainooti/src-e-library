import { useRecoilState } from "recoil";
import userState from "../atoms/userAtom";
import { emptyFromLocalStorage } from "../utils/browserStorage";

const useLogout = () => {
  const [user, setUser] = useRecoilState(userState);
  const logout = () => {
    emptyFromLocalStorage("token");
    setUser({
      loggedIn: false,
      data: {
        email: "",
        firstname: "",
        lastname: "",
        college: "",
        department: "",
        level: "",
        roles: [],
      },
    });
  };
  return logout;
};

export default useLogout;

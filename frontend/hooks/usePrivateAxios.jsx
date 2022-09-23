import { useEffect } from "react";
import { useRecoilState } from "recoil";
import userState from "../atoms/userAtom";
import { getFromLocalStorage } from "../utils/browserStorage";
import { axiosPrivateInstance } from "../pages/api/axiosInstance";

const useAxiosPrivate = () => {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.data?.token}`;
        }
        return config;
      },
      (error) => {
        setUser({ loggedIn: false });
        return Promise.reject(error);
      }
    );
    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          prevRequest.headers["Authorization"] = `Bearer ${getFromLocalStorage(
            "token"
          )}`;
          return axiosPrivateInstance(prevRequest);
        }
        setUser({ loggedIn: false });
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [setUser, user?.data?.token]);

  return axiosPrivateInstance;
};

export default useAxiosPrivate;

import { createContext, useState, useEffect, useContext } from "react";
import axios from "../services/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedToken = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    savedToken ? JSON.parse(savedToken) : null
  );
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
    async function fetchUser() {
      try {
        await axios
          .get(`/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setUser(response.data);
            setIsAuth(true);
          });
      } catch (error) {
        console.log(error.response.data);
      }
    }
    if (token) {
      fetchUser();
    } else {
      localStorage.removeItem("token");
      setUser(null);
      setIsAuth(false);
    }
  }, [savedToken, token]);
  return (
    <AuthContext.Provider value={{ setToken, setUser, user, token, savedToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

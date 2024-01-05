import { getUserInfo } from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";

//type
import { Children, UserType } from "@/types/shared";

type AuthType = {
  token: string;
  isLoggedIn: boolean;
  userInfos: UserType | null;
};
type AuthContextProps = AuthType & {
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function AuthContextProvider({ children }: Children) {
  const [authState, setAuthState] = useState<AuthType>({
    token: "",
    isLoggedIn: false,
    userInfos: null,
  });

  const fetchAndSetUserInfo = async (token: string) => {
    const data = await getUserInfo(token);
    setAuthState((prevState) => ({
      ...prevState,
      token,
      isLoggedIn: true,
      userInfos: data,
    }));
  };
  const login = (token: string) => {
    fetchAndSetUserInfo(token);
    localStorage.setItem("token", token);
  };
  const logout = () => {
    setAuthState((prevState) => ({
      ...prevState,
      token: "",
      isLoggedIn: false,
      userInfos: null,
    }));
    localStorage.removeItem("token");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    token && fetchAndSetUserInfo(token);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
}

export default AuthContextProvider;

export { useAuthContext }; // eslint-disable-line

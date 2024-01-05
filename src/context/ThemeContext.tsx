import darkModeHandler from "@/utils/darkmodeHandler";
import { createContext, useContext, useState } from "react";

//type
type theme = "light" | "dark";
type ThemeType = {
  theme: theme;
  setTheme: SetState<theme>;
};

import { Children, SetState } from "@/types/shared";

const ThemeContext = createContext<ThemeType | undefined>(undefined);
function ThemeContextProvider({ children }: Children) {
  const [theme, setTheme] = useState<theme>(darkModeHandler(true));
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
}

export default ThemeContextProvider;
export { useThemeContext }; // eslint-disable-line

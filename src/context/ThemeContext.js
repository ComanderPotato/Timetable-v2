import { createContext, useState } from "react";

export const ThemeContext = createContext(null);


export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}
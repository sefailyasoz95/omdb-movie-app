import { createContext } from "react";
import { ThemeContextType } from "../Utils/types";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

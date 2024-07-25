import { useEffect, useState } from "react";
import { Theme } from "../Utils/types";
import { ThemeContext } from "../Context/ThemeContext";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [theme, setTheme] = useState<Theme | undefined>(() => {
		const preferedTheme = localStorage.getItem("preferedTheme");
		if (preferedTheme) {
			preferedTheme === "dark"
				? document.documentElement.classList.add("dark")
				: document.documentElement.classList.remove("dark");
			return preferedTheme as Theme;
		}
		const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
		if (prefersDarkScheme) {
			document.documentElement.classList.add("dark");
			return "dark";
		} else {
			return "light";
		}
	});

	// Effect to listen for changes in the system theme
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = (event: MediaQueryListEvent) => {
			setTheme(event.matches ? "dark" : "light");
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
			localStorage.setItem("preferedTheme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("preferedTheme", "light");
		}
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

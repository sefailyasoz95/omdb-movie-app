import React from "react";
import { ThemeProvider } from "./Components/ThemeProvider";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import DetailPage from "./Pages/DetailPage";

function App() {
	return (
		<ThemeProvider>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/details/:id' element={<DetailPage />} />
					</Routes>
				</BrowserRouter>
			</Provider>
		</ThemeProvider>
	);
}

export default App;

import React from "react";
import App from "./App";
import "./index.css";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Register } from "./pages/Register";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/register",
		element: <Register />,
	},
]);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router}></RouterProvider>
	</QueryClientProvider>
);

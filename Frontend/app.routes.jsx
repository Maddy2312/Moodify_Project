import { createBrowserRouter } from "react-router-dom";
import Login from "./src/features/auth/pages/Login";
import Register from "./src/features/auth/pages/Register";
import Home from "./src/features/auth/pages/Home";
import Protected from "./src/features/auth/components/Protected";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
])
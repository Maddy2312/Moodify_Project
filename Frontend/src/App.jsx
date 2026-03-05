import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../app.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";

const App = () => {
  return (
    <AuthProvider>
      <div className="h-screen w-screen bg-black text-white">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
};

export default App;
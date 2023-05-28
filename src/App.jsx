import "./App.css";
import { AuthProvider } from "./auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
  },
  {
    path: "/login",
    element: <Login></Login>
  }
])

function App() {
    return (
        <>
            <AuthProvider>
                <RouterProvider router={router}></RouterProvider>
            </AuthProvider>
        </>
    );
}

export default App;

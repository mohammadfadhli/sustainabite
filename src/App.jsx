import "./App.css";
import { AuthProvider } from "./auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/navbar";
import SignUp from "./components/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar></NavBar>,
    children:[
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
    ]
  },
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

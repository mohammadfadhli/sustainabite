import "./App.css";
import { AuthProvider } from "./auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import NavBar from "./components/navbar";
import Home from "./pages/Home";

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
        path: "/home",
        element: <Home></Home>
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

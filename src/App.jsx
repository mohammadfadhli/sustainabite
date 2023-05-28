import "./App.css";
import { AuthProvider } from "./auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import SignUp from "./components/Signup";
import Home from "./pages/Home";
import AddPost from "./components/AddPost";
import Posts from "./pages/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar></NavBar>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        // path: "/home",
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/addpost",
        element: <AddPost></AddPost>
      },
      {
        path: "/posts",
        element: <Posts></Posts>
      }
    ],
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </>
  );
}

export default App
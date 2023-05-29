import "./App.css";
import { AuthProvider } from "./auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import SignUp from "./components/Signup";
import Home from "./pages/Home";
import AddPost from "./components/AddPost";
import Posts from "./pages/Posts";
import ProtectedRoutes from "./routes/protectedroutes";
import AnonymousRoute from "./routes/anonymousroute";
import Forum from "./pages/Forum";
import Bins from "./pages/Bins";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar></NavBar>,
        children: [
            {
                element: <ProtectedRoutes></ProtectedRoutes>, // pages that require authentication goes here
                children: [
                    {
                        path: "addpost",
                        element: <AddPost></AddPost>,
                    },
                    {
                        path: "forum",
                        element: <Forum></Forum>,
                    },
                    {
                        path: "profile",
                        element: <Profile></Profile>,
                    },
                ],
            },
            {
                element: <AnonymousRoute></AnonymousRoute>, // pages that require non authentication goes here
                children: [
                    {
                        path: "login",
                        element: <Login></Login>,
                    },
                    {
                        path: "signup",
                        element: <SignUp></SignUp>,
                    },
                ],
            },
            // pages that require neither goes here
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: "posts",
                element: <Posts></Posts>,
            },
            {
                path: "bins",
                element: <Bins></Bins>,
            },
        ],
        // children: [
        //   {
        //     path: "/login",
        //     element: <Login></Login>,
        //   },
        //   {
        //     path: "/signup",
        //     element: <SignUp></SignUp>,
        //   },
        //   {
        //     // path: "/home",
        //     index: true,
        //     element: <Home></Home>,
        //   },
        //   {
        //     path: "/addpost",
        //     element: <AddPost></AddPost>
        //   },
        //   {
        //     path: "/posts",
        //     element: <Posts></Posts>
        //   }
        // ],
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

export default App;

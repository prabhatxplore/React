import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Error from '../pages/Error'
import App from '../App'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import HomeDetails from '../pages/HomeDetails'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <Signup />
            },
            {
                path: "home-details/:homeId",
                element: <HomeDetails />,
            }
        ]
    },
])
export default router
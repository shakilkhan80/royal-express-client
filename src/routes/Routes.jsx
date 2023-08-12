import {
    createBrowserRouter,
} from "react-router-dom";

import Main from "../layout/Main.jsx";
import Home from "../components/Home/Home/Home.jsx";
import Login from "../components/Login/Login.jsx";
import Register from "../components/Register/Register.jsx";
import Dashboard from "../layout/Dashboard.jsx";
import AdminHome from "../components/Dashboard/Admin/adminHome.jsx";
import DeliveredOrders from "../components/Dashboard/Admin/DeliveredOrders.jsx";
import AssignedForDeliveries from "../components/Dashboard/Admin/AssignedForDeliveries.jsx";
import AssignedForPickups from "../components/Dashboard/Admin/AssignedForPickups.jsx";
import CollectedOrders from "../components/Dashboard/Admin/CollectedOrders.jsx";
import PickupRequests from "../components/Dashboard/Admin/PickupRequests.jsx";
import EmployeesAssignedForDeliveries from "../components/Dashboard/Employees/EmployeesAssignedForDeliveries.jsx";
import EmployeesAssignedForPickups from "../components/Dashboard/Employees/EmployeesAssignedForPickups.jsx";
import EmployeesDelivered from "../components/Dashboard/Employees/EmployeesDelivered.jsx";
import EmployeesHome from "../components/Dashboard/Employees/EmployeesHome.jsx";
import EmployeesPicked from "../components/Dashboard/Employees/EmployeesPicked.jsx";
import UserHome from "../components/Dashboard/User/UserHome.jsx";
import UserDeliveredOrder from "../components/Dashboard/User/UserDeliveredOrder.jsx";
import UserMyRequests from "../components/Dashboard/User/UserMyRequests.jsx";
import UserSendPickupRequest from "../components/Dashboard/User/UserSendPickupRequest.jsx";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader:() => fetch('http://localhost:5000/areas')
            },
            {
                path: '/login',
                element: <Login></Login>,
                
            },
            {
                path: '/register',
                element: <Register></Register>,
               
            },
            
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard/admin/Home',
                element:<AdminHome></AdminHome>
            },
            {
                path: '/dashboard/admin/DeliveredOrders',
                element:<DeliveredOrders></DeliveredOrders>
            },
            {
                path: '/dashboard/admin/AssignedForDeliveries',
                element:<AssignedForDeliveries></AssignedForDeliveries>
            },
            {
                path: '/dashboard/admin/AssignedForPickups',
                element:<AssignedForPickups></AssignedForPickups>
            },
            {
                path: '/dashboard/admin/CollectedOrders',
                element:<CollectedOrders></CollectedOrders>
            },
            {
                path: '/dashboard/admin/PickupRequests',
                element:<PickupRequests></PickupRequests>
            },
            //employees........................................
            {
                path: '/dashboard/employees/AssignedForDeliveries',
                element:<EmployeesAssignedForDeliveries></EmployeesAssignedForDeliveries>
            },
            {
                path: '/dashboard/employees/AssignedForPickups',
                element:<EmployeesAssignedForPickups></EmployeesAssignedForPickups>
            },
            {
                path: '/dashboard/employees/Delivered',
                element:<EmployeesDelivered></EmployeesDelivered>
            },
            {
                path: '/dashboard/employees/EmployeesHome',
                element:<EmployeesHome></EmployeesHome>
            },
            {
                path: '/dashboard/employees/Picked',
                element:<EmployeesPicked></EmployeesPicked>
            },

            //user .........................................................................
            {
                path: '/dashboard/user/Home',
                element:<UserHome></UserHome>
            },
            {
                path: '/dashboard/user/UserMyRequests',
                element:<UserMyRequests></UserMyRequests>
            },
            {
                path: '/dashboard/user/UserSendPickupRequest',
                element:<UserSendPickupRequest></UserSendPickupRequest>,
                loader:() => fetch('http://localhost:5000/areas')
            },
            {
                path: '/dashboard/user/UserDeliveredOrders',
                element:<UserDeliveredOrder></UserDeliveredOrder>
            },
            
            
        ] 
    }
]);
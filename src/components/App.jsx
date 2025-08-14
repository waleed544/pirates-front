import React from 'react';
import Signin from './Signin';
import Login from "./Login";
import {createBrowserRouter} from "react-router-dom"
import {RouterProvider} from "react-router-dom"
import Home from './Home';
import AddAccount from './AddAccount';
import Main from './Main'
import Profile from './Profile';


const _router=createBrowserRouter([
    {
    path :"/",
    element:<Home />
   },
   {
    path :"/home",
    element:<Home />
   },
   {
    path :"/login",
    element:<Login />
   },
   {
    path :"/SignUp",
    element:<Signin />
   },
   {
    path :"/AddAccount",
    element:<AddAccount />
   },
  //  {
  //   path :"/main",
  //   element:<Main />
  //  },
  {
    path :"/profile",
    element:<Profile />
   }
   
]);
function App(){
  
  return <RouterProvider router={_router} />;
}
export default App;
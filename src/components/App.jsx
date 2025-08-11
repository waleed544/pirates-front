import React from 'react';
import Signin from './Signin';
import Login from "./Login";
import {createBrowserRouter} from "react-router-dom"
import {RouterProvider} from "react-router-dom"
import Home from './Home';


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
   }
]);
function App(){
    
  return <RouterProvider router={_router} />;

    // return (
    //     <div>
    //        <Home />
    //     </div>
    // );
}
export default App;
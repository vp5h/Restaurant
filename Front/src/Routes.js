import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./employee/Signup";
import Signin from "./employee/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./employee/UserDashBoard";
import AdminDashBoard from "./employee/AdminDashBoard";
import Base from "./core/Base"
import { ThemeProvider, CSSReset } from '@chakra-ui/core'



const Routes = () => {
    return (
     
      <BrowserRouter>
        <Switch>
   
          <Route path="/" exact component={Base} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
         
        </Switch>
      </BrowserRouter>
     
    );
  };
  
  export default Routes;
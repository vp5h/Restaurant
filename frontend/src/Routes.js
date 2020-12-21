

import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginForm from './pages/login';
import Signup from './pages/signup';
import Base from "./core/Base"
import PrivateRoute from "./auth/helper/PrivateRoutes"
import AdminRoute from "./auth/helper/AdminRoutes"
import AdminDashBoard from "./pages/AdminDashboard"
import Home from "./core/Home"
function Routes() {
  return (
    <div>

         <BrowserRouter>
        <Switch>
        
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={LoginForm} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
             
        
        
        </Switch>
        </BrowserRouter>
         
      
    </div>
  );
}




export default Routes;

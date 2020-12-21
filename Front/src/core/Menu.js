import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";
import {
  Menu as Menuu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Box,
  show,
  Flex,
  
  Heading,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Button,
  Image,
  handleToggle,
  Icon
} from "@chakra-ui/core";


import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const newTheme = {
  ...theme,
  breakpoints
};


const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => (
  <div>
     
     
     <ThemeProvider theme={newTheme}>
      <CSSReset />
     
   
     
     
     <Menuu>
  
  
  
  
  
  
    <ul className="nav nav-tabs bg-dark">
      {/* <li className="nav-item">
     
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
        <MenuButton> Home</MenuButton>
        </Link>
        </li>
      
      <li className="nav-item">
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
          Cart
        </Link>
      </li>
      {isAutheticated() && isAutheticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            style={currentTab(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            U. Dashboard
          </Link>
        </li>
      )} */}
      {isAutheticated() && isAutheticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            A. Dashboard
          </Link>
        </li>
      )}
      {!isAutheticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/signup"
            >
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/signin"
            >
              Sign In
            </Link>
          </li>
        </Fragment>
      )}
      {isAutheticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
       
      )}
     </ul>
    </Menuu>
    </ThemeProvider>
  </div>
);

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);



const Mennu = ({history, props}) => {

const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

return(
  <div>
     
     
     <ThemeProvider theme={newTheme}>
      <CSSReset />
     
      <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Restudio
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems> <Link style={currentTab(history, "/")} to="/">Home</Link></MenuItems>
        {isAutheticated() && isAutheticated().employee.role === 0 && (
        <MenuItems>
        <Link
            style={currentTab(history, "/user/dashboard")}
            
            to="/user/dashboard"
          >
            U. Dashboard
          </Link>
        </MenuItems>)}
        {!isAutheticated() && (
        <Fragment>
            <MenuItems>
            <Link
              style={currentTab(history, "/signup")}
             
              to="/signup"
            >
              Signup
            </Link>
            </MenuItems>
            <MenuItems>
          
            <Link
              style={currentTab(history, "/signin")}
              
              to="/signin"
            >
              Sign In
            </Link>
            </MenuItems>
        </Fragment>
      )}













        
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button bg="transparent" border="1px">
        {!isAutheticated() && (<Link
              style={currentTab(history, "/signup")}
              
              to="/signup"
            >
              Create Account
            </Link>)}




            {isAutheticated() && (


            <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>)}
        </Button>
      </Box>
    </Flex>
     
     
    </ThemeProvider>
  </div>
)};


export default withRouter(Mennu);

import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import Logo from "./logo";
import ThemeToggler from "./ThemeToggler"
import { signout, isAutheticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};


const MenuItem = ({ children, isLast, to = "/", style, ...rest }) => {
  
  
  
  
  
  
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link to={to} style={style}>{children}</Link>
    </Text>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const Header = (props, {history}) => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["primary.500", "primary.500", "transparent", "transparent"]}
      color={["white", "white", "primary.700", "primary.700"]}
      {...props}
    >
      <Flex align="center">
       <Link to="/"> <Logo
          w="100px"
          color={["white", "white", "primary.500", "primary.500"]}
        />
        </Link>
      </Flex>

      <Box  display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show  ? <Flex align="right"><CloseIcon /> </Flex> :<Flex align="right"><ThemeToggler/> <MenuIcon /> </Flex>}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/" >Home</MenuItem>
          {isAutheticated() && isAutheticated().employee.role === 1 && (<MenuItem to="/admin/dashboard" >Admin Dashboard </MenuItem>)}
          {isAutheticated() && isAutheticated().employee.role === 0 && (<MenuItem to="/user/dashboard" >User Dashboard </MenuItem>)}
          <MenuItem to="/faetures">Features </MenuItem>
          <MenuItem to="/pricing">Pricing </MenuItem>

          {!isAutheticated() && (<MenuItem to="/login">Login </MenuItem>)}
          {isAutheticated() && (<MenuItem to="/" onClick={() => {
              signout(() => {
               
              });
            }}>Signout </MenuItem>)}
          
          {!isAutheticated() && (
          <MenuItem to="/signup" isLast>
            <Button
            mr={[0,0,2,2]}
              size="sm"
              rounded="md"
              color={["primary.500", "primary.500", "white", "white"]}
              bg={["white", "white", "primary.500", "primary.500"]}
              _hover={{
                bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
              }}
            >
              Create Account
            </Button>
          </MenuItem>
          )}
          
          <Box display={{ base: "none", md: "block" }}>
            <ThemeToggler/>
            </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default withRouter(Header);

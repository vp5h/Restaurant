import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Text,
  InputGroup,
  InputRightElement,
  Icon
} from '@chakra-ui/react';
import { signin, authenticate, isAutheticated } from "../auth/helper";

import ErrorMessage from '../core/ErrorMessage';
import Footer from "../core/footer";
import Base from "../core/Base"
import Header from "../core/header"

export default function Login() {
  const [values, setValues] = useState({
    email: "a@pravesh.com",
    password: "12345",
    error: "",
    isloading: false,
    didRedirect: false
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const { email, password, error, isloading, didRedirect } = values;
  const { employee } = isAutheticated();


  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  }; 
  
  
  
  
  
  const handleSubmit = async event => {
    event.preventDefault();
    setValues({ ...values, error: false, isloading: true, isLoggedIn: false });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, isloading: false, isLoggedIn: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              isLoggedIn: true,
              didRedirect: true
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
    
  };


  const performRedirect = () => {
    if (didRedirect) {
      if (employee && employee.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };


  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const loginform = () =>{
    return(
     
    
   
    
 
      <Box
        p={8}
        mb={[8,8,20,20]}
       
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        {isLoggedIn ? (
          <Box textAlign="center">
            <Text>{email} logged in!</Text>
            <Button
              variantColor="orange"
              variant="outline"
              width="full"
              mt={4}
              onClick={() => setIsLoggedIn(false)}
            >
              Sign out
            </Button>
          </Box>
        ) : (
          <>
            <Box textAlign="center">
              <Heading>Login</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="test@test.com"
                    size="lg"
                    value={email}
                    onChange={handleChange("email")}
                  />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="*******"
                      size="lg"
                      value={password}
                      onChange={handleChange("password")}
                    />
                    <InputRightElement width="3rem">
                      <Button
                        h="1.5rem"
                        size="sm"
                        onClick={handlePasswordVisibility}
                      >
                        {showPassword ? (
                          <Icon name="view-off" />
                        ) : (
                          <Icon name="view" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  variantColor="teal"
                  variant="outline"
                  type="submit"
                  width="full"
                  mt={4}
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="teal"
                    />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </Box>
          </>
        )}
      </Box>
    
    )
  }
  return (
    <div>
    <Base >
    {loginform()} {performRedirect()}
    </Base>
    </div>
);
}
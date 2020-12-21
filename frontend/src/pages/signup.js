import React, { useState } from 'react';
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
import { signup, isAutheticated} from "../auth/helper";
import ErrorMessage from '../core/ErrorMessage';
import SuccessMessage from '../core/SucessMessage';
import Base from "../core/Base"
import { Link, Redirect } from "react-router-dom";



export default function Signup() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
      });
    
 
      const { name, email, password, error, success } = values;
      const { employee } = isAutheticated();
      const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value, isLoading:false });
      };
 
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  

  const handleSubmit = async event => {
    event.preventDefault();
    setValues({ ...values, error: false });
   
    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false, isLoading: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
            isLoading: false
          });
        }
      })
      .catch(console.log("Error in signup"));
  };
  



  const handlePasswordVisibility = () => setShowPassword(!showPassword);
  const signUpForm = () => {
    return (
      <div>
      
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
              <Heading>Sign Up</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                {error && <ErrorMessage message={error} />}
                {success && <SuccessMessage/>}
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Name"
                    size="lg"
                    value={name}
                    onChange={handleChange("name")}
                  />
                </FormControl>
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
                    'Sign Up'
                  )}
                </Button>
              </form>
            </Box>
          </>
        )}
      </Box>
   
    </div>
    )};
    const successMessage = () => {
      return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div
              className="alert alert-success"
              style={{ display: success ? "" : "none" }}
            >
              New account was created successfully. Please
              <Link to="/login">Login Here</Link>
            </div>
          </div>
        </div>
      );
    };
    const performRedirect = () => {
      if (employee) {
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
  
  

  return (
    <div>
    {/* <Header/>
    {signUpForm()}
    <Footer/> */}
    <Base >{performRedirect()}
 {signUpForm()}</Base>
    </div>
);
}
















  
  
  
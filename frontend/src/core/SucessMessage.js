import React from 'react';
import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import { Link } from "react-router-dom";
export default function SuccessMessage() {
  return (
    <Box my={4}>
      <Alert status="success" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>New account was created successfully. Please 
              <Link to="/login"> Login Here</Link></AlertDescription>
      </Alert>
    </Box>
  );
}
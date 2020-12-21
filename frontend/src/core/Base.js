import React from 'react'
import Footer from './footer'
import Header from './header'
import {Box, Flex} from '@chakra-ui/react'

class Base extends React.Component {
    render(){
    return <div>
            <Header/>
            <Box as="main"
                 mt={{ base: "40px", md: "70px" }}
                 minH="calc(100vh - 350px)"> 
                 <Flex width="full" align="center" justifyContent="center">
                 {this.props.children}
                 </Flex>
                 </Box>
            <Footer/>
        </div>
    }
}

    export default Base;
import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { isAutheticated } from "../auth/helper";
import { getEmployees } from '../admin/helper/adminapicalls';
import { Box,  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Flex,Container, Stack, Heading, Button } from '@chakra-ui/react';
import {Card, PageContainer, PageContent} from './componets'
import { Link } from 'react-router-dom';
const { employee, token } = isAutheticated();
const Emp = () => {
    return (
        <div>
            <Base>
            <ManageEmployees/>
            
            </Base>
        </div>
    )
}





const ManageEmployees = ()=>{
    const [employees, setEmployees] = useState([])

    const Roledef= (rol)=>{
      if(rol===1){
        return("Admin")
      }else{
        return("User")
      }
    }


    const preload = () => {
      
        getEmployees(employee._id, token).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            setEmployees(data);
            console.log(data.length)
           
             
          }
        });

       


      };

      useEffect(() => {
        preload();
      }, []);
    return(
    <div>
      <PageContainer isFixedNav>
      
      <PageContent
        title="Manage Employees"
        
        
      >
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
            
                 {employees.map((employees, index) => {


            return (
                

              <Card
              title="Employees"
              subtitle="Stats"
              
              primaryAction={{
                content: "Update",
                onClick: () => {
                  alert("ok");
                },
              }}
              secondaryActions={[
                {
                  content: "Delete",
                  onClick: () => {
                    alert("ok");
                  },
                },
              ]}
             
            >
              Name {employees.name} 
             <br></br>
             Role {Roledef(employees.role)}
             <br/>
             Email {employees.email} 
             <br/>
  
            </Card>




             
              
               
                
            
            );
          })}
            
          
          <br></br>
        </SimpleGrid>
        </PageContent>
        </PageContainer>
        </div>
    )
}
export default Emp

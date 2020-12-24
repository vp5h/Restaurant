
import { Link } from "react-router-dom";
import React, { useState, useEffect }  from "react";
import {
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Flex,Container, Stack, Heading, Button , Box
} from "@chakra-ui/react";
import {Card, PageContainer, PageContent} from './componets'
import { getEmployees } from '../admin/helper/adminapicalls';
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
const { employee, token } = isAutheticated();



export default function Dashboard() {
  const [employees, setEmployees] = useState([])

  const preload = () => {
      
    getEmployees(employee._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setEmployees(data);
      }
    });
    
      };
    
      useEffect(() => {
        preload();
      }, []);
       
       
         

   



  return (
    <Base>
    <PageContainer isFixedNav>
      
      <PageContent
        title="Dashboard"
        
        
      >
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
          <Card
            title="Employees"
            subtitle="Stats"
            primaryAction={{
              content: <Link to="/admin/employees">See All</Link>,
              
            }}
           
          >
           Total Employees {employees.length}
           <br></br>
           chefs
           <br/>
           waiters
           <br/>

          </Card>
          <Card title="Your Stats"
             primaryAction={{
              content: <Link to="/admin/orders">See All</Link>,
              
            }}
          >
            <StatGroup justifyContent="space-between">
              <Stat>
                <StatLabel>Amount</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Total Orders</StatLabel>
                <StatNumber>45</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  9.05%
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Sold</StatLabel>
                <StatNumber>$1,500</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  29.13%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Card>
          <Card
            title="Menu"
            subtitle="Stats"
            primaryAction={{
              content: <Link to="/admin/menus">See All</Link>,
              
            }}
           
          >
           Total Dishes 
           <br></br>
           Available
           
           <br/>

          </Card>
          <br></br>
        </SimpleGrid>
      </PageContent>
     
    </PageContainer>
    </Base>
  );
}

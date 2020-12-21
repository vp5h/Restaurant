// import React from "react";
// import Base from "../core/Base";
// import { isAutheticated } from "../auth/helper/index";
// import { Link } from "react-router-dom";
// import { Flex, Box, Spacer, Grid, GridItem, UnorderedList, ListItem, Heading, SimpleGrid,
//   Stat,
//   StatLabel,
//   StatNumber,
//   StatHelpText,
//   StatArrow,
//   StatGroup, } from "@chakra-ui/react";

// const AdminDashBoard = () => {
//   const {
//     employee: { name, email, role }
//   } = isAutheticated();

//   const adminLeftSide = () => {
//     return (
//      <div className="card"> <Box w={[300, 400, 560]} align="center"
//      justify="space-between"
//      wrap="wrap"
   
//      mb={8}
//      p={8}
//      bg={["primary.500", "primary.500", "transparent", "transparent"]}
//      color={["white", "white", "primary.700", "primary.700"]}>
        
//      <Heading>Admin Information</Heading>
//         </Box>
//       </div>
//     );
//   };

//   const adminRightSide = () => {
//     return (
//         <div className="card mb-4">
//         <Box  w={[300, 400, 560]} align="center"
//       justify="space-between"
//       wrap="wrap"
    
//       mb={8}
//       p={8}
//       bg={["primary.500", "primary.500", "transparent", "transparent"]}
//       color={["white", "white", "primary.700", "primary.700"]}>
//         <Heading>Admin Information</Heading>
        
//         <UnorderedList listStyleType={'none'}>

        
//           <ListItem>

//             <span className="badge badge-success mr-2">Name:</span> {name}
//           </ListItem>
          
//           <ListItem>
//             <span className="badge badge-success mr-2">Email:</span> {email}
//           </ListItem>
          

//           <ListItem>
          
//             <span className="badge badge-danger">Admin Area</span>
          
//           </ListItem>
       
//         </UnorderedList>
//         </Box>
//       </div>
//     );
//   };
//   return (
//     <Base >
//     <Flex  justify={["center", "space-between", "flex-end", "flex-end"]}
//           direction={["column", "column", "row", "row"]}>
//     {adminLeftSide()}
//     {adminRightSide()}
//     </Flex>
//     </Base>
//   );
// };

// export default AdminDashBoard
import React from "react";
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
import Base from "../core/Base";


function PageContent({
  title = "",
  primaryAction = null,
  secondaryActions = null,
  children,
}) {
  const actions = [
    primaryAction ? (
      <Button
        key="0"
        onClick={primaryAction.onClick}
        colorScheme="primary"
        size="sm"
      >
        {primaryAction.content}
      </Button>
    ) : (
      ""
    ),
    secondaryActions
      ? secondaryActions.map((action, i) => (
          <Button
            key={i}
            onClick={action.onClick}
            colorScheme="main"
            variant="outline"
            size="sm"
          >
            {action.content}
          </Button>
        ))
      : "",
  ];

  const header =
    title || actions ? (
      <Stack direction="row" alignItems="top" marginBottom="1.5rem">
        <Heading size="lg">{title}</Heading>
        <Stack direction={["column", "row"]} style={{ marginLeft: "auto" }}>
          {actions}
        </Stack>
      </Stack>
    ) : (
      ""
    );
  return (
    <Container maxW="lg" paddingTop="1.5rem">
      {header}
      {children}
    </Container>
  );
}


function Card({
  title = "",
  subtitle = "",
  primaryAction = null,
  secondaryActions = null,
  children,   
}) {
  const actions = [
    primaryAction ? (
      <Button
        key="0"
        onClick={primaryAction.onClick}
        colorScheme="primary"
        size="sm"
      >
        {primaryAction.content}
      </Button>
    ) : (
      ""
    ),
    secondaryActions
      ? secondaryActions.map((action, i) => (
          <Button
            key={i}
            onClick={action.onClick}
            colorScheme="main"
            variant="outline"
            size="sm"
          >
            {action.content}
          </Button>
        ))
      : "",
  ];

  const header =
    title || subtitle || actions ? (
      <Stack direction="row" alignItems="top" marginBottom="1.5rem">
        <Stack>
          <Heading size="md">{title}</Heading>
          <Heading size="xs" color="gray.500">
            {subtitle}
          </Heading>
        </Stack>
        <Stack direction={["column", "row"]} style={{ marginLeft: "auto" }}>
          {actions}
        </Stack>
      </Stack>
    ) : (
      ""
    );
  return (
    <Box width="100%" bg="secondary.card" rounded="lg" p={5}>
      {header}
      <Box>{children}</Box>
    </Box>
  );
}




function PageContainer(props) {
  return (
    <Flex
      bg="primary.background"
      minHeight="100%"
      width="100%"
      alignItems="center"
      justifyContent="top"
      flexDirection="column"
      paddingTop={props.isFixedNav ? { md: "4rem" } : "0"}
    >
      {props.children}
    </Flex>
  );
}


export default function Dashboard() {
  return (
    <Base>
    <PageContainer isFixedNav>
      
      <PageContent
        title="Dashboard"
        primaryAction={{
          content: "Create report",
          onClick: () => {
            alert("ok");
          },
        }}
        secondaryActions={[
          {
            content: "Second action",
            onClick: () => {
              alert("ok");
            },
          },
          {
            content: "Third action",
            onClick: () => {
              alert("ok");
            },
          },
        ]}
      >
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10}>
          <Card
            title="Card Title"
            subtitle="Card subtitle"
            primaryAction={{
              content: "Create report",
              onClick: () => {
                alert("ok");
              },
            }}
            secondaryActions={[
              {
                content: "Second action",
                onClick: () => {
                  alert("ok");
                },
              },
            ]}
          >
            Card Content
          </Card>
          <Card title="Your Stats">
            <StatGroup justifyContent="space-between">
              <Stat>
                <StatLabel>Sent</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  23.36%
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Clicked</StatLabel>
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
        </SimpleGrid>
      </PageContent>
     
    </PageContainer>
    </Base>
  );
}

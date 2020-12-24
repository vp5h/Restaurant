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


export function PageContent({
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


export function Card({
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
    <Box width="100%"  rounded="lg" p={5}>
      {header}
      <Box>{children}</Box>
    </Box>
  );
}




export function PageContainer(props) {
  return (
    <Flex
      bg="primary.background"
      minHeight="100%"
      width="100%"
      alignItems="center"
      justifyContent="top"
      flexDirection="column"
      paddingTop={props.isFixedNav ? { md: "1rem" } : "0"}
      paddingBottom={props.isFixedNav ? { md: "3rem" } : "0"}
    >
      {props.children}
    </Flex>
  );
}
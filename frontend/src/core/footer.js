import { Box, PseudoBox, SimpleGrid } from "@chakra-ui/react";
import React from "react";


const FooterSection = props => (
  <Box
    as="footer"
    pos="relative"
    
    bg="primary.500"
    py={{ base: "32px", lg: "40px" }}
    {...props}
  />
);

const FooterSectionGroup = props => (
  <SimpleGrid
    columns={{ base: 1, md: 3 }}
    maxWidth="1150px"
    mx="auto"
    width="90%"
    {...props}
  />
);

const FooterSectionItem = props => (
  <Box padding="24px" color="white" textAlign="center" {...props} />
);

const Footer = ({ state }) => (
  <FooterSection alignSelf="flex-end"  >
    <FooterSectionGroup>
      <FooterSectionItem
        fontWeight="bold"
        fontFamily="heading"
        textTransform="uppercase"
      >
        © {new Date().getFullYear()} Restudio
      </FooterSectionItem>

      <FooterSectionItem borderColor="accent.400">
        
      </FooterSectionItem>

      <FooterSectionItem
        fontWeight="bold"
        fontFamily="heading"
        textTransform="uppercase"
      >
        Made by Restudio
      </FooterSectionItem>
    </FooterSectionGroup>
  </FooterSection>
);

export default Footer;

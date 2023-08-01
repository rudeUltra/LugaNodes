import {Flex,Box,Heading,Text,Button,Spacer,HStack} from '@chakra-ui/react';

export default function Nav(){
    return(
       <Flex p="10px" gap="10px" alignItems="center" bg="black" color="purple">
       <Heading as="h1">20BCE0683</Heading>
       <Spacer/>
       <HStack spacing="20px">
       <Box bg="blackAlpha.100" p="10px" color="purple">R</Box>
       <Text color="pruple" >rudra21ultra@gmail.com</Text>
       

       </HStack>
       

       </Flex>
    );
};
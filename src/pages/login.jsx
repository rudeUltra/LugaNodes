import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  IconButton,
  Image
} from '@chakra-ui/react';

const Login = () => {
    

  const [click,setClick]=useState(0);
  function siu(){
    setClick(1);
    console.log(click);
  }  
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex h="100vh" wrap="wrap" alignItems="center" justifyContent="center" gap="20">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
        h="50vh"
        w="40vh"
      >
        <Heading mb={6}>Log In</Heading>
        <Input
          placeholder="Email"
          type="email"
          variant="filled"
          mb={3}
        />
        <Input
          placeholder="Password"
          type="password"
          variant="filled"
          mb={6}
        />
        <Button colorScheme="teal" mb={8}>
          Log In
        </Button>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0">
            Enable Dark Mode?
          </FormLabel>
          <Switch
            id="dark_mode"
            colorScheme="teal"
            size="lg"
            onChange={toggleColorMode}
          />
        </FormControl>
        
      </Flex>
      
      <IconButton icon={<Image onClick={siu}
  borderRadius='full'
  boxSize='300px'
  src='https://cdn.consensys.net/uploads/2021/03/16031641/MetaMask.svg'
  alt='Dan Abramov'
/>} />
      
    </Flex>
  );
};

export default Login;

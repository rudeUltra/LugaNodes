import React from 'react';
import Nav from './Nav';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {Box,Heading,Center,Flex,Card,CardBody,Image,Stack,Text} from '@chakra-ui/react';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
const AccountInfo = () => {

    const toast = useToast()
    toast({
      title: 'Successfully Logged In.',
      description: "Check The Details of Your Wallet",
      status: 'success',
      duration: 9000,
      isClosable: true,
      mb:"100px"
    })
    
    const location = useLocation();
    const { accountAddress, accountBalance ,count} = location.state;
    // const { accountBalance, accountAddress } = location.state;
  return (
    <div>
    <Nav/>
      <Center  h='300px' color='white' mt="10px">

<Heading as='h2' size='2xl' noOfLines={1} color="white" >
      MetaMask account Information
  </Heading>


</Center>

<Flex  justifyContent="center" wrap="wrap" gap="75">
            <Card maxW='sm' bg="green.500">
  <CardBody  color="black">
    <Image
      src='https://zipmex.com/static/d0d0b4d874d5503d225a4490b70351a6/1bbe7/yo.jpg'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    
      <Center mt="50px">
      <Heading size='md'> Account Balance</Heading>
      

      </Center>
      <Stat>
  
  <StatNumber>${accountBalance}</StatNumber>
  
</Stat>
      
     
      
    
  </CardBody>
  
  
</Card>

<Card maxW='sm' bg="green.500">
         <CardBody  color="black">
    <Image
      src='https://online.stanford.edu/sites/default/files/inline-images/1600X900-How-does-blockchain-work.jpg'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
     <Center mt="50px">
      <Heading size='md'> Account Address</Heading>
     

      </Center>
      <Stat>
  
  <StatNumber>{accountAddress}</StatNumber>
  
</Stat>
  </CardBody>

  
  
</Card>


<Card maxW='sm' bg="green.500">
         <CardBody  color="black">
    <Image
      src='https://learn.microsoft.com/training/achievements/ethereum-blockchain-development-social.png'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
     <Center mt="50px">
      <Heading size='md'>No of Transactions</Heading>
     

      </Center>
      <Stat>
  
  <StatNumber>{count}</StatNumber>
  
</Stat>
  </CardBody>

  
  
</Card>






           
        </Flex>










    
    
    </div>
  );
};

export default AccountInfo;

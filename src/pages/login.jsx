import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
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
  Image,
  chakra
} from '@chakra-ui/react';
import Nav from '../components/Nav';
import {useToast} from '@chakra-ui/react';

import axios from 'axios';

// Function to call when status code is 200

function demo2(){
  console.log("already exists");

}


// Data for the POST request (adjust as needed)



const Login = () => {
  const navigate=useNavigate();
  


  const [haveMetamask, sethaveMetamask] = useState(true);

	const [accountAddress, setAccountAddress] = useState('');
	const [accountBalance, setAccountBalance] = useState('');

	const [isConnected, setIsConnected] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	const { ethereum } = window;

	const provider = new ethers.providers.Web3Provider(window.ethereum);

	useEffect(() => {
    
		const { ethereum } = window;
		const checkMetamaskAvailability = async () => {
			if (!ethereum) {
				sethaveMetamask(false);
			}
			sethaveMetamask(true);
		};
		checkMetamaskAvailability();
	}, []);

	const connectWallet = async () => {
		try {
      
			if (!ethereum) {
				sethaveMetamask(false);
			}
      

			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});

			let balance = await provider.getBalance(accounts[0]);
      let count=await provider.getTransactionCount(accounts[0]);
			let bal = ethers.utils.formatEther(balance);

			setAccountAddress(accounts[0]);
			setAccountBalance(bal);
			setIsConnected(true);
      

      if(accountAddress && accountBalance){
        console.log(count);
        console.log(accountAddress);
        navigate('/display', {
          state: {
            accountAddress: accountAddress,
            accountBalance: accountBalance,
            count:count
          },
        });


      }


      
		} catch (error) {
      console.log(error)
			setIsConnected(false);
		}
	};



    

  const [click,setClick]=useState(0);
  function siu(){
    setClick(1);
    console.log(click);
  }  
  const toast = useToast()
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  function loginHandler(){
    //ZZZ
   
    const postData = {
      username: email,
      password: password
    };
    
    // Make the POST request
    axios.post('http://localhost:4000/login', postData)
      .then(response => {
          const statusCode = response.status;
          console.log('Status code:', statusCode);
          
          if (statusCode === 200) {
              demo();
          } else {
              console.log('API responded with a non-200 status code');
          }
      })
      .catch(error => {
          console.error('Error:', error.message);
      });
  }
  function demo() {
    console.log('Sign Up done.');
    // Your demo function logic here
    toast({
      title: 'Successfully Created Account.',
      description: "Account Details saved in MongoDB",
      status: 'success',
      duration: 9000,
      isClosable: true,
      mb:"100px"
    })

}

  function signupHandler(){
    const postData = {
      username: email,
      password: password
    };
    
    // Make the POST request
    axios.post('http://localhost:4000/signup', postData)
      .then(response => {
          const statusCode = response.status;
          console.log('Status code:', statusCode);
          
          if (statusCode === 201) {
              demo();
          } else {
              console.log('API responded with a non-200 status code');
          }
      })
      .catch(error => {
          console.error('Error:', error.message);
      });

  }








  return (
  
    <div>
    <Nav/>
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          variant="filled"
          mb={6}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="teal" mb={8} onClick={loginHandler}>
          Log In
        </Button>
        <Button colorScheme="teal" mb={8} onClick={signupHandler}>
          Sign Up.
        </Button>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0">
            Enable Light Mode?
          </FormLabel>
          <Switch
            id="dark_mode"
            colorScheme="teal"
            size="lg"
            onChange={toggleColorMode}
          />
        </FormControl>
        
      </Flex>
      
      <IconButton icon={<Image onClick={connectWallet}
  borderRadius='full'
  boxSize='300px'
  src='https://cdn.consensys.net/uploads/2021/03/16031641/MetaMask.svg'
  alt='Dan Abramov'
/>} />



      
    </Flex>

    </div>
    
  );
};

export default Login;

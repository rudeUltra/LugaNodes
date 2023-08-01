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



const Login = () => {
  const navigate=useNavigate();
  


  const [haveMetamask, sethaveMetamask] = useState(true);

	const [accountAddress, setAccountAddress] = useState('');
	const [accountBalance, setAccountBalance] = useState('');

	const [isConnected, setIsConnected] = useState(false);

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
			let bal = ethers.utils.formatEther(balance);

			setAccountAddress(accounts[0]);
			setAccountBalance(bal);
			setIsConnected(true);
      

      if(accountAddress && accountBalance){
        console.log("bhai kuch horaha ?")
        console.log(accountAddress);
        navigate('/display', {
          state: {
            accountAddress: accountAddress,
            accountBalance: accountBalance,
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
   
    toast({
      title: 'Successfully Created Account.',
      description: "Account Details saved in MongoDB",
      status: 'success',
      duration: 9000,
      isClosable: true,
      mb:"100px"
    })
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
        />
        <Input
          placeholder="Password"
          type="password"
          variant="filled"
          mb={6}
        />
        <Button colorScheme="teal" mb={8} onClick={loginHandler}>
          Log In
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

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react'
import { FaUserPlus } from 'react-icons/fa'

function Header({setIsAddingUser}: {setIsAddingUser: (x: boolean)=> void}) {
    return <>
        <Flex bg="purple.400" alignItems="center" justify="space-between" p="6">
            <Box as="header" color="white" fontWeight="bold" flexDirection="row" display="flex" gap='2' alignItems="center">
                <Text fontSize="1xl" letterSpacing={2}> MY DASHBOARD </Text>
                <Text fontSize="3xl"> | USERS LIST</Text>
            </Box>

            <Button onClick={()=> setIsAddingUser(true)} bg="purple.700" color="white" _hover={{ bg: 'purple.900' }}>
                <Flex align="center" gap={2} justify="center">
                    <Icon w={5} h={5} as={FaUserPlus}/>
                    <Text ml={3} mt={1} fontSize="sm" letterSpacing={3}>NEW USER</Text>
                </Flex>
            </Button>
        </Flex>
    </>;
}

export default Header;

import { Button, Flex, Icon, Link } from '@chakra-ui/react';
import { FaLinkedin } from 'react-icons/fa';
import { useAppDispatch } from '../app/hooks';
import { UPDATE_USER } from '../app/store';

function Footer({ reload, setReload, setLoading }: { reload: boolean, setReload: (x: boolean) => void, setLoading: (x: boolean) => void }) {
    const dispatch = useAppDispatch()

    const reset = () => {
        dispatch({ type: UPDATE_USER, data: [] })
        setLoading(true)
        setReload(!reload)
    }

    return <Flex height="60px" align="center" justify="space-between" width="100%" bg="purple.300" position="fixed" bottom={0} >
        <Flex  m={4} gap={4} align="center">
            <Link href='https://matheusfelizardo.com.br' isExternal color="white" fontWeight="bold">developed by Matheus Felizardo</Link>
            <Link href='https://www.linkedin.com/in/matheus-felizardo/' isExternal color="white" fontWeight="bold">
                <Icon w={5} h={5} mt={1} as={FaLinkedin} />
            </Link>
            

        </Flex>
        <Button onClick={reset} m={4} size="sm">Reset application</Button>
    </Flex>;
}

export default Footer;

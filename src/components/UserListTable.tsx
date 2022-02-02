import {
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Icon,
    Text
} from '@chakra-ui/react';
import { FaPen, FaTrashAlt } from 'react-icons/fa'
import { FaExchangeAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react';
import { User } from '../helper/types';
import _ from 'lodash'

interface UserListTableProps {
    users: User[]
    setShowDeleteModal: (x: User) => void
    setShowEditModal: (x: User) => void
}

function UserListTable({ users, setShowDeleteModal, setShowEditModal }: UserListTableProps) {

    // 0: A-Z | 1: Z-A
    const [order, setOrder] = useState<0 | 1>(0)
    const [newOrderUsers, setNewOrderUsers] = useState(users)
    const editUser = (user: User) => {
        setShowEditModal(user)
    }

    const [iconRotate, setIconRotate] = useState('90deg')

    const deleteUser = (user: User) => {
        setShowDeleteModal(user)
    }

    const handleChangeOrder = () => {
        if (iconRotate === '90deg') {
            setIconRotate('270deg')
        } 

        if (iconRotate === '270deg') {
            setIconRotate('90deg')
        } 
        
        setOrder(order === 0 ? 1 : 0)
    }


    useEffect(() => {
        const orderByUsernameAsc = _.orderBy(users, ['username'], ['asc', 'desc'])
        const orderByUsernameDesc = _.orderBy(users, ['username'], ['desc', 'asc'])

        if (order === 0) {
            setNewOrderUsers(orderByUsernameAsc)
        }

        if (order === 1) {
            setNewOrderUsers(orderByUsernameDesc)
        }

    }, [order, users])

    const orderById = () => {
        const orderByIdAsc = _.orderBy(users, ['id'], ['asc', 'desc'])
        const orderByIdDesc = _.orderBy(users, ['id'], ['desc', 'asc'])

        if (newOrderUsers[0] === orderByIdAsc[0]) {
            return setNewOrderUsers(orderByIdDesc)
        }

        setNewOrderUsers(orderByIdAsc)
    }

    return <Table variant='simple'>
        <Thead bg="purple.100">
            <Tr>
                <Th>
                    <Text cursor="pointer" onClick={orderById}>Id</Text>
                </Th>
                <Th>Name</Th>
                <Th>
                    <Flex gap={2} align="center">
                        <Text mt={1}>Username</Text>
                        <Icon 
                        transition='transform .5s ease-in-out' 
                        transform={`rotate(${iconRotate})`} 
                        cursor='pointer' h={3.5} w={3.5} as={FaExchangeAlt} onClick={() => handleChangeOrder()} />
                    </Flex>

                </Th>
                <Th>Email</Th>
                <Th>City</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
            </Tr>
        </Thead>
        <Tbody size="sm">
            {newOrderUsers.map((user) => {
                return (
                    <Tr size="sm" key={user.id}>
                        <Td p={2} pl={6}>{user.id}</Td>
                        <Td p={2} pl={6}>{user.name}</Td>
                        <Td p={2} pl={6}>{user.username}</Td>
                        <Td p={2} pl={6}>{user.email}</Td>
                        <Td p={2} pl={6}>{user.address.city}</Td>
                        <Td p={2} pl={6}>
                            <Button size="sm" onClick={() => editUser(user)} minWidth={100} _hover={{ bg: "green.600", color: "white" }} bg="green.500" color="white" display="flex" align="center" gap={2} justify="center">
                                <Icon as={FaPen} />
                                <Text mt={1}>Edit</Text>
                            </Button>
                        </Td>
                        <Td p={1} pl={4}>
                            <Button size="sm" onClick={() => deleteUser(user)} minWidth={100} _hover={{ bg: "red.500", color: "white" }} bg="red.400" color="white" display="flex" align="center" gap={2} justify="center">
                                <Icon as={FaTrashAlt} />
                                <Text mt={1}>Delete</Text>
                            </Button>
                        </Td>
                    </Tr>
                )
            })}
        </Tbody>
    </Table>;
};

export default UserListTable;

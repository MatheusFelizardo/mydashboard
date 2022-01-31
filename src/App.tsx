import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { UPDATE_USER } from './app/store';
import DeleteUserModal from './components/DeleteUserModal';
import Header from './components/Header';
import UserListTable from './components/UserListTable';
import { User } from './helper/types';
import ReactLoading from 'react-loading';
import { HiOutlineEmojiSad } from 'react-icons/hi'
import Footer from './components/Footer';
import AddUserModal from './components/AddUserModal';
import EditUserModal from './components/EditUserModal';

function App() {
  const users: User[] = useAppSelector(state => state.data)
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(false)
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState<User | null>(null)
  const [showEditModal, setShowEditModal] = useState<User | null>(null)

  useEffect(() => {

    async function getData() {
      const url = `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`
      const response = await fetch(url)
      const data: User[] = await response.json()

      const formatedData: User[] = data.map(user => {
        return {
          ...user,
          username: user.username.toLowerCase()
        }
      })

      setTimeout(() => {
        setLoading(false)
        dispatch({ type: UPDATE_USER, data: formatedData })
      }, 2000)
    }
    getData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  
  return (
    <div className="App">
      <Header setIsAddingUser={setIsAddingUser} />
      {loading &&
        <Flex p={6} gap={2} align="center">
          <Text mt={1} fontSize="3xl">Loading data, please wait </Text>
          <ReactLoading type='cylon' color='var(--chakra-colors-purple-400)' height={100} width={100} />
        </Flex>}

      {users.length > 0 &&
        <Flex gap={1} justify="left" mr={10} p={4} pr={16}>
          <Box display="flex" flexDirection="column" alignItems="flex-start" >
            <Text fontSize="10" fontWeight="bold" as="span" letterSpacing={2}>SYSTEM INFO</Text>
            <Text fontSize="14">You have {users.length} {users.length > 1 ? 'users' : 'user'} registered</Text>
          </Box>
        </Flex>}
      {users.length > 0 && <UserListTable users={users} setShowDeleteModal={setShowDeleteModal} setShowEditModal={setShowEditModal} />}

      {!loading && users.length === 0 &&
        <Flex p={6} gap={10} direction="column">
          <Flex gap={2} align="center">
            <Icon h={10} w={10} as={HiOutlineEmojiSad} />
            <Text fontSize="lg">You have no users registered</Text>

          </Flex>
          <Button colorScheme="purple" width={200} onClick={() => setIsAddingUser(true)}>Add new user</Button>
        </Flex>
      }
      {showDeleteModal && <DeleteUserModal user={showDeleteModal} closeModal={() => setShowDeleteModal(null)} />}
      {showEditModal && <EditUserModal user={showEditModal} closeModal={() => setShowEditModal(null)} />}
      {isAddingUser && <AddUserModal isAddingUser={isAddingUser} closeModal={() => setIsAddingUser(false)} />}

      <Footer setReload={setReload} reload={reload} setLoading={setLoading} />
    </div>
  );
}

export default App;

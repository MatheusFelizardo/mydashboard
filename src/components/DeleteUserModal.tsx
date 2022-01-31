import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Icon,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { User } from '../helper/types';
import { FaExclamationTriangle } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { UPDATE_USER } from '../app/store';

interface DeleteUserModalProps {
  user: User
  closeModal: () => void
}

function DeleteUserModal({ closeModal, user }: DeleteUserModalProps) {
  const users: User[] = useAppSelector(state => state.data)
  const dispatch = useAppDispatch()

  const deleteUser = () => {
    const newUserData = users.filter(oldUser => oldUser.id !== user.id)
    
    dispatch({type: UPDATE_USER, data: newUserData})
    closeModal()
  }
  return <Modal trapFocus={false} isOpen={user && true} onClose={closeModal} >
    <ModalOverlay />

    <ModalContent borderRadius="md" autoFocus={false}>
      <ModalHeader borderTopRadius={4} >
        <Flex gap={2} display="flex" align="center" >
          <Icon color="red.600" w={10} h={10} as={FaExclamationTriangle} />
          <Text color="red.600" mt={1} fontSize="2xl">Attention</Text>
        </Flex>

        <ModalCloseButton size='lg' />
      </ModalHeader>
      <ModalBody >
        <Text>Are you sure you want to delete the user <Text as="span" fontWeight="bold">{user.username}</Text>?</Text>
      </ModalBody>

      <ModalFooter>
        <Button onClick={closeModal} size='sm' mr={4} colorScheme="red" variant='ghost'>Cancel</Button>
        <Button onClick={deleteUser} colorScheme="red" variant='solid'>Confirm</Button>
      </ModalFooter>
    </ModalContent>

  </Modal>;
}

export default DeleteUserModal;

import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Text,
    Button,
    Icon,
    Flex
} from '@chakra-ui/react'
import { validateEmail, validateString } from '../helper/utils';
import { User } from '../helper/types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { UPDATE_USER } from '../app/store';
import { FaSave } from 'react-icons/fa';

interface EditUserModalProps {
    user: User
    closeModal: () => void
}

function EditUserModal({ user, closeModal }: EditUserModalProps) {

    const [name, setName] = useState(user.name)
    const [nameErrorMessage, setNameErrorMessage] = useState<null | string>(null)
    const [email, setEmail] = useState(user.email)
    const [emailErrorMessage, setEmailErrorMessage] = useState<null | string>(null)
    const [username, setUsername] = useState(user.username)
    const [city, setCity] = useState(user.address.city)

    const users: User[] = useAppSelector(state => state.data)
    const dispatch = useAppDispatch()

    const handleSave = (e: any) => {
        if (name === '' || email === '' || !validateEmail(email)) {
            if (name === '') setNameErrorMessage('Name field is required.')
            if (!validateEmail(email)) setEmailErrorMessage('Please use a valid e-mail.')
            if (email === '') setEmailErrorMessage('Email field is required.')

            return
        }

        const newId = Math.max(...users.map(user =>  user.id)) 
        
        const newData: User = {
            ...user,
            id: newId !== -Infinity ? newId + 1 : 1,
            name,
            email,
            address: {
                city
            },
            username: username.toLocaleLowerCase() || name.toLocaleLowerCase()
        }

        const usersWithoutEdited = users.filter(oldUser => oldUser.id !== user.id)
        dispatch({type: UPDATE_USER, data: [...usersWithoutEdited, newData]})
        closeModal()
    }

    return <Modal
        isOpen={user && true}
        onClose={closeModal}
        trapFocus={false}
    >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader fontSize="16" letterSpacing={2}>EDIT USER - ID: {user.id}</ModalHeader>
            <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl isInvalid={nameErrorMessage ? true : false}>
                        <FormLabel>Name</FormLabel>
                        <Input 
                        value={name || ''}
                        onChange={(e) => {
                            const isValid = validateString(e.target.value)
                            if (isValid) {
                                setNameErrorMessage(null)
                                setName(e.target.value)

                                return
                            }
                            setName(name)
                        }} 
                        placeholder='Name *' />
                        {nameErrorMessage && <Text fontSize="sm" mt={1} color='red.500'>{nameErrorMessage}</Text>}
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Username</FormLabel>
                        <Input 
                        value={username || ''}
                        onChange={(e) => setUsername(e.target.value.toLocaleLowerCase())} 
                        placeholder='username' />
                    </FormControl>

                    <FormControl mt={4} isInvalid={emailErrorMessage ? true : false}>
                        <FormLabel>E-mail</FormLabel>
                        <Input
                            value={email || ''}
                            onChange={(e) => {
                                setEmailErrorMessage(null)
                                setEmail(e.target.value)
                            }}
                            placeholder='E-mail *' />
                        {emailErrorMessage && <Text fontSize="sm" mt={1} color='red.500'>{emailErrorMessage}</Text>}
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>City</FormLabel>
                        <Input 
                        value={city || ''}
                        onChange={(e) => setCity(e.target.value)} 
                        placeholder='City' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button mr={6} variant='ghost' onClick={closeModal}>Cancel</Button>
                    <Button width='120px' type="submit" onClick={(e) => handleSave(e)} colorScheme='purple' mr={3}>
                        <Flex gap={2} align="center" >
                            <Icon as={FaSave} />
                            <Text mt={1}>Save</Text>
                        </Flex>
                        
                    </Button>
                </ModalFooter>
        </ModalContent>
    </Modal>;
}

export default EditUserModal;

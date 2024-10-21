import { UsersContext } from './usersContext';
import { useContext } from 'react';

export const useUsersContext = () => useContext(UsersContext);
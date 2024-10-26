import React from 'react';
import { IUserLogin, UserWithoutToken } from '../types/User';

export interface UsersContextType {
  currentUser: UserWithoutToken | null;
  email: string;
  onChangeCurrUser: (user: UserWithoutToken | null) => void;
  login: (user: IUserLogin) => void;
  logout: () => void;
  activate: (activateToken: string) => Promise<UserWithoutToken>;
  handleEmailChange: (newEmail: string) => void;
}

export const UsersContext = React.createContext<UsersContextType>({
  currentUser: null,
  email: '',
  onChangeCurrUser: () => {},
  login: () => {},
  logout: () => {},
  activate: () => (new Promise(() => ({
    name: '',
    surname: '',
    email: '',
    avatar: '',
  }))),
  handleEmailChange: () => {}
});
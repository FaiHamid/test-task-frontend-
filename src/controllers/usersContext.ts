import React from 'react';
import { IUserLogin, IUserToChange, UserWithoutToken } from '../types/User';
import { ICompanyResponse } from '../types/Company';

export interface UsersContextType {
  currentUser: UserWithoutToken | null;
  email: string;
  currentCompany: ICompanyResponse | null;
  onChangeCurrUser: (user: UserWithoutToken | null) => void;
  login: (user: IUserLogin) => void;
  logout: () => void;
  activate: (activateToken: string) => Promise<UserWithoutToken>;
  handleEmailChange: (newEmail: string) => void;
  updateUser: (userData: Partial<IUserToChange>) => void;
  onChangeCompany: (newCompany: ICompanyResponse | null) => void;
}

export const UsersContext = React.createContext<UsersContextType>({
  currentUser: null,
  email: '',
  currentCompany: null,
  onChangeCurrUser: () => {},
  login: () => {},
  logout: () => {},
  activate: () => (new Promise(() => ({
    name: '',
    surname: '',
    email: '',
    avatar: '',
  }))),
  handleEmailChange: () => {},
  updateUser: () => {},
  onChangeCompany: () => {}
});
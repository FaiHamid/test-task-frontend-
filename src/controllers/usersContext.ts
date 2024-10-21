import React from 'react';
import { IUserRespons } from '../types/User';

export interface UsersContextType {
  currentUser: IUserRespons | null;
  onChangeCurrUser: (user: IUserRespons | null) => void;
}

export const UsersContext = React.createContext<UsersContextType>({
  currentUser: null,
  onChangeCurrUser: () => {}
});
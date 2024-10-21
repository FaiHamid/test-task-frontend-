import React, { useMemo, useState } from 'react';
import { UsersContext } from './usersContext';
import { IUserRespons } from '../types/User';

interface Props {
  children: React.ReactNode;
}

export const UsersContextProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUserRespons | null>(null);

  const values = useMemo(
    () => ({
      currentUser,
      onChangeCurrUser: setCurrentUser
    }),
    [currentUser],
  );

  return (
    <UsersContext.Provider value={values}>{children}</UsersContext.Provider>
  );
};
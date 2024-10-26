import React, { useEffect, useMemo, useState } from 'react';
import { UsersContext } from './usersContext';
import { IUserLogin, UserWithoutToken } from '../types/User';
import { authService } from '../services/authService';
import { accessTokenService } from '../services/accessTokenService';
import { userService } from '../services/userService';

interface Props {
  children: React.ReactNode;
}

export const UsersContextProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserWithoutToken | null>(null);
  const [email, setEmail] = useState('');

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };


  async function login({ email, password }: IUserLogin) {
    const { accessToken, ...user } = await authService.login({ email, password });

    accessTokenService.save(accessToken);
    setCurrentUser(user);
  }

  async function getCurrentUser() {
    const token = accessTokenService.get();
    if (token) {
      const { accessToken, ...user } = await userService.getUser(token);
      accessTokenService.save(accessToken);
      setCurrentUser(user);
    }
  }

  async function logout() {
    await authService.logout();

    accessTokenService.remove();
    setCurrentUser(null);
  }

  async function activate(activateToken: string): Promise<UserWithoutToken> {
    console.log('hello1')
    const { accessToken, ...user } = await authService.activate(activateToken);
    console.log('response user', user);
    console.log('response token', accessToken);
    accessTokenService.save(accessToken);
    setCurrentUser(user);

    return user;
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  const values = useMemo(
    () => ({
      currentUser,
      email,
      onChangeCurrUser: setCurrentUser,
      login,
      logout,
      activate,
      handleEmailChange
    }),
    [currentUser, email],
  );

  return (
    <UsersContext.Provider value={values}>{children}</UsersContext.Provider>
  );
};
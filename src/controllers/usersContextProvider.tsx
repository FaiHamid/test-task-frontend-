import React, { useEffect, useMemo, useState } from "react";
import { UsersContext } from "./usersContext";
import { IUserLogin, IUserToChange, UserWithoutToken } from "../types/User";
import { authService } from "../services/authService";
import { accessTokenService } from "../services/accessTokenService";
import { userService } from "../services/userService";
import { ICompanyResponse } from "../types/Company";

interface Props {
  children: React.ReactNode;
}

export const UsersContextProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserWithoutToken | null>(null);
  const [currentCompany, setCurrentCompany] = useState<ICompanyResponse | null>(null);
  const [email, setEmail] = useState("");

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  async function login({ email, password }: IUserLogin) {
    const { accessToken, ...user } = await authService.login({
      email,
      password,
    });

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
    const { accessToken, ...user } = await authService.activate(activateToken);

    accessTokenService.save(accessToken);
    setCurrentUser(user);

    return user;
  }

  async function updateUser(userData: Partial<IUserToChange>) {
    if (currentUser) {
      const user = await userService.updateUser(currentUser.id, userData);
      setCurrentUser(user);
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  const values = useMemo(
    () => ({
      currentUser,
      email,
      currentCompany,
      onChangeCurrUser: setCurrentUser,
      login,
      logout,
      activate,
      handleEmailChange,
      updateUser,
      onChangeCompany: setCurrentCompany,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, email, currentCompany]
  );

  return (
    <UsersContext.Provider value={values}>{children}</UsersContext.Provider>
  );
};

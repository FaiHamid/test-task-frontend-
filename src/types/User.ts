export interface IUser {
  name: string,
  surname: string,
  email: string,
  password: string,
  confirmPassword: string,
}

export interface IUserLogin {
  email: string,
  password: string,
};

export interface IUserRespons {
  name: string,
  surname: string,
  email: string,
  avatar: string,
  accessToken: string,
};

export type UserWithoutToken = Omit<IUserRespons, 'accessToken'>

export interface IUserToChange {
  name: string,
  surname: string,
}

export enum EVariantLogout {
  Menu="menu",
  Button="button"
}


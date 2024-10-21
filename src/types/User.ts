export interface IUser {
  name: string,
  surname: string,
  email: string,
  password: string,
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
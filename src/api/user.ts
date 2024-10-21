import { IUser, IUserLogin, IUserRespons } from "../types/User";
import { useHttp } from "../utils/http";

export const registerUser = async (newUser: IUser): Promise<IUserRespons> => {
  return useHttp.post<IUser, IUserRespons>('/register', newUser)
}

export const getRegisterUser = async (activationToken: string) => {
  return useHttp.get<IUserRespons>(`activate/${activationToken}`)
}

export const loginUser = async ({ email, password }: IUserLogin): Promise<IUserRespons> => {
  const resp = await useHttp.post<IUserLogin, IUserRespons>('/login', { email, password });
  console.log('respdkjgjkfhgkjr', resp)
  return resp;
}


import { IUser } from "../types/User";
import { client } from "../utils/axiosClient";

export const createUser = async (newUser: IUser) => {
  return client.post<Omit<IUser, 'password'>, IUser>('/register', newUser)
}
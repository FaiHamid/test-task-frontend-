import { IUserRespons, IUserToChange } from "../types/User";
import { useHttp } from "../api/http";

export const getUser = async (token: string): Promise<IUserRespons> => {
  return await useHttp.get<string, IUserRespons>(`/users/${token}`)
}

export const updateUser = async (userId: number, data: Partial<IUserToChange>): Promise<IUserRespons> => {
  
  
  return await useHttp.put(`/users/${userId}`, data);
}

export const userService = { getUser, updateUser };
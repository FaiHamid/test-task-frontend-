import { IUserRespons } from "../types/User";
import { useHttp } from "../api/http";

export const getUser = async (token: string): Promise<IUserRespons> => {
  return useHttp.get<string, IUserRespons>(`/users/${token}`)
}

export const userService = { getUser };
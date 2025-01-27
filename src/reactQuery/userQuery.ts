import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "./queriesKey";
import { userService } from "../services/userService";
import { accessTokenService } from "../services/accessTokenService";

export const currentUserQuery = queryOptions({
  queryKey: [queryKeys.getCurrentUser],
  queryFn: async () => {
    const token = accessTokenService.get();

    if (token) {
      try {
        const resp = await userService.getUser(token);

        return resp;
      } catch (error) {
        console.log("somethig went wrong", error);
        return null;
      }
    }

    return null;
  },
});

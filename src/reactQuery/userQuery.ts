import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "./queriesKey";
import { userService } from "../services/userService";
import { accessTokenService } from "../services/accessTokenService";

export const currentUserQuery = queryOptions({
  queryKey: [queryKeys.getCurrentUser],
  queryFn: () => {
    const token = accessTokenService.get();

    if (token) {
      return userService.getUser(token);
    }

    return undefined;
  },
});

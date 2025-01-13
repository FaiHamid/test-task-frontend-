import { queryOptions } from "@tanstack/react-query";
import { queryKeys } from "./queriesKey";
import { companiesService } from "../services/companiesService";

export const companiesQuery = queryOptions({
  queryKey: [queryKeys.getAllCompanies],
  queryFn: () => companiesService.getCompanies()
});

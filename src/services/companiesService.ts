import { useHttp } from "../api/http";
import { ICompany, ICompanyResponse } from "../types/Company";

export const addNewCompany = async (companyData: ICompany): Promise<ICompanyResponse> => {
  const resp = await useHttp.post<ICompany, ICompanyResponse>('/companies', companyData);

  return resp;
}

export const companiesService = { addNewCompany };
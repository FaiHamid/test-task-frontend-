import React from "react";
import { ICompany } from "../types/Company";

interface Props {
  company: ICompany;
}

export const CompanyItem: React.FC<Props> = ({ company }) => {
  

  return (
    <div className="mx-auto min-w-[380px] h-20 bg-white p-5 companyGrid mb-4 
    max-w-[1120px] shadow-sm rounded-md border border-sky-200">
      <div className="h-[40px] w-[40px] rounded-full shadow-lg p-1 mr-3">
          <img src={company.logotype} alt="avatar" />
      </div>
      <p>{company.name}</p>
      <p>{company.service}</p>
      <p>{company.capital}</p>
    </div>
  )
}
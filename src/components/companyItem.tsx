import React from "react";
import { ICompany } from "../types/Company";

interface Props {
  company: ICompany;
}

export const CompanyItem: React.FC<Props> = ({ company }) => {
  const createdDate = company.created.split(' ');

  return (
    <div className="mx-auto min-w-[380px] h-20 bg-white p-5 companyGrid mb-4 
    shadow-sm rounded-md border border-light-blue">
      <div className="h-[40px] w-[40px] rounded-full shadow-lg p-1 mr-3">
          <img src={company.logotype} alt="avatar" />
      </div>
      <p className="truncate font-poppins">{company.name}</p>
      <p className="truncate font-poppins">{company.service}</p>
      <p className="truncate font-poppins">{company.capital}</p>
      <p className="truncate font-poppins">{createdDate[0]}</p>
    </div>
  )
}
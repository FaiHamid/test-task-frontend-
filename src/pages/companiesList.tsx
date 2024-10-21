import React from "react";
import companies from "../tempCompanies.json";
import { CompanyItem } from "./companyItem";

export const CompaniesList: React.FC = () => {
  return (
    <div className="mx-5">
      <p>Companies</p>
      {companies.map((company) => {
        return <CompanyItem company={company} />;
      })}
    </div>
  );
};

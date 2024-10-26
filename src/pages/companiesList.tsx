import React, { useState } from "react";
import companies from "../tempCompanies.json";
import { CompanyItem } from "../components/companyItem";
import { ICompany } from "../types/Company";
import { PaginationComponent } from "../components/pagination";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";

const valuetext = (value) => {
  return `${value}`;
};

export const CompaniesList: React.FC = () => {
  const [page, setPage] = useState(1);
  const companiesPerPage = 6;
  const [visibleCompanies, setVisibleCompanies] = useState<ICompany[]>(
    companies.slice(0, companiesPerPage)
  );
  const [capitalRange, setCapitalRange] = useState([20000, 1000000]);
  const [createdRange, setCreatedRange] = useState([
    1980,
    new Date().getFullYear(),
  ]);
  const amountOfPages = Math.ceil(companies.length / companiesPerPage);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const firstIndex = (value - 1) * companiesPerPage;
    const lastIndex = firstIndex + companiesPerPage;
    setVisibleCompanies(companies.slice(firstIndex, lastIndex));
  };
  const handleCapitalChange = (event, newValue) => {
    setCapitalRange(newValue);
  };

  const handleCreatedChange = (event, newValue) => {
    setCreatedRange(newValue);
  };

  return (
    <>
      <div className="flex items-center flex justify-between space-x-5 mb-10">
        <FormControl sx={{ ml: "20px", minWidth: 120 }}>
          <FormHelperText>Sort by:</FormHelperText>
          <Select
            // value={age}
            // onChange={}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>
              Name <NorthIcon color="primary" />
            </MenuItem>
            <MenuItem value={20}>
              Name <SouthIcon color="primary" />
            </MenuItem>
            <MenuItem value={30}>
              Service <NorthIcon color="primary" />
            </MenuItem>
            <MenuItem value={30}>
              Service <SouthIcon color="primary" />
            </MenuItem>
          </Select>
        </FormControl>

        <div className="flex flex-wrap mr-5">
          <div className="flex flex-col flex-wrap mr-10">
            <Typography gutterBottom>Capital Range:</Typography>
            <Slider
              getAriaLabel={() => "Capital range"}
              value={capitalRange}
              onChange={handleCapitalChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              shiftStep={30000}
              step={10000}
              min={20000}
              max={1000000}
              sx={{ minWidth: "200px" }}
            />
          </div>

          <div className="flex flex-col flex-wrap mr-10">
            <Typography gutterBottom>Created Year Range:</Typography>
            <Slider
              getAriaLabel={() => "Created range"}
              value={createdRange}
              onChange={handleCreatedChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={1980}
              max={new Date().getFullYear()}
              sx={{ minWidth: "300px" }}
            />
          </div>
        </div>
      </div>

      <div className="mx-5 mb-8">
        <div
          className="mx-auto min-w-[380px] h-12 bg-light-blue p-2 companyGrid mb-4 
    shadow-sm rounded-md border border-sky-200"
        >
          <p className="truncate ml-3 font-poppins font-semibold">Logotype</p>
          <p className="truncate font-poppins font-semibold">Name</p>
          <p className="truncate font-poppins font-semibold">Service</p>
          <p className="truncate font-poppins font-semibold">Capital</p>
          <p className="truncate font-poppins font-semibold">Created date</p>
        </div>
        {visibleCompanies.map((company) => {
          return <CompanyItem company={company} key={company.id}/>;
        })}
      </div>
      {amountOfPages > 1 && (
        <PaginationComponent
          page={page}
          amountOfPages={amountOfPages}
          onChangePage={handleChange}
        />
      )}
    </>
  );
};

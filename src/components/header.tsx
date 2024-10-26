import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUsersContext } from "../controllers/useUsersContext";
import { DropdownMenu } from "./dropDownMenu";
import { Button } from "@mui/material";

export const Header: React.FunctionComponent = () => {
  const { currentUser } = useUsersContext();
  const navigate = useNavigate();
  console.log("currentUser", currentUser);

  return (
    <header className="h-22 w-full bg-white shadow-lg p-5 px-10 flex justify-between mb-5 items-center">
      <nav>
        <ul className="flex space-x-5">
          <NavLink
            to="/companies"
            className="flex flex-col items-center elementTransition "
          >
            <img
              src="https://i.imgur.com/jqhue1R.png"
              alt="companies"
              className="w-10 h-10"
            />
            <p>companies</p>
          </NavLink>

          <NavLink
            to="/dashboard"
            className="flex flex-col items-center elementTransition "
          >
            <img
              src="https://i.imgur.com/7UiehPI.png"
              alt="dashboard"
              className="w-10 h-10"
            />
            <p>dashboard</p>
          </NavLink>

          <NavLink
            to="new"
            className="flex flex-col items-center elementTransition "
          >
            <img
              src="https://i.imgur.com/WyZ1ppN.png"
              alt="addNewCompany"
              className="w-10 h-10"
            />
            <p>add company</p>
          </NavLink>
        </ul>
      </nav>

      {currentUser ? (
        <DropdownMenu />
      ) : (
        <div className="flex space-x-4">
          <Button variant="contained" onClick={() => navigate("/login")}>
            Sign in
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/register")}
          >
            Sign up
          </Button>
        </div>
      )}
    </header>
  );
};

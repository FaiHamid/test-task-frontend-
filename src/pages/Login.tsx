import React, { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { IUserLogin } from "../types/User";
import { useUsersContext } from "../controllers/useUsersContext";
import { CustomLoader } from "../components/customLoader";

export const Login: React.FunctionComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
  });

  const { login } = useUsersContext();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const mutation = useMutation<void, Error>({
    mutationFn: async () => {
      await login(currentUser as IUserLogin);

      return;
    },
    onSuccess: () => {
      navigate(state.pathname || "/companies", { replace: true });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await mutation.mutateAsync();
    } catch (error) {
      console.error("Failed to login user:", error);
    }
  };

  const changeUserState = (newValue: string, field: string) => {
    setCurrentUser((prevUser) => ({ ...prevUser, [field]: newValue }));
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-[600px] bg-white mx-auto flex flex-col py-7 px-16 rounded-lg mt-5 border border-light-gray"
    >
      {mutation.isPending ? (
        <CustomLoader loaderSize={110} paddingY={61}/>
      ) : (
        <>
          <h1 className="text-[24px] mb-5">Login:</h1>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => changeUserState(e.target.value, "email")}
            sx={{ mb: "12px", width: "100%" }}
          />
          <FormControl sx={{ ml: 0, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => changeUserState(e.target.value, "password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <div className="flex justify-between mt-5">
            <Button variant="contained" type="submit">
              Sign in
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate('/register')}
            >
              Sign up
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

import { useState } from "react";
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
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/user";
import { IUserLogin, IUserRespons } from "../types/User";
import { useUsersContext } from "../controllers/useUsersContext";
import { accessTokenService } from "../services/accessTokenService";

export const Login: React.FunctionComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    email: '',
    password: '',
  })
  const { onChangeCurrUser } = useUsersContext();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const mutation = useMutation<IUserRespons, Error>({
    mutationFn: async () => {
      const userData: IUserRespons = await loginUser(currentUser as IUserLogin);
      console.log('userData', userData);
      return userData;
    },
    onSuccess: (data: IUserRespons) => {
      console.log('data usemigr', data)
      const { accessToken } = data;
      accessTokenService.save(accessToken);
      onChangeCurrUser(data);

      navigate("/companies");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const handleLogin = async() => {
    try {
      await mutation.mutateAsync();
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  }

  const changeUserState = (newValue: string, field: string) => {
    setCurrentUser((prevUser) => ({ ...prevUser, [field]: newValue }));
  };


  return (
    <div className="max-w-[600px] bg-gray-100 mx-auto flex flex-col py-7 px-16 rounded-lg mt-5 border border-gray-400">
      <h1 className="text-[24px] mb-5">Login:</h1>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        onChange={(e) => changeUserState(e.target.value, "email")}
        sx={{ mb: "12px", width: "100%" }}
      />
      <FormControl sx={{ ml: 0, width: "100%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
        <Button variant="contained" onClick={handleLogin}>Sign in</Button>
        <NavLink
          to="/register"
          className="bg-green-600 px-4 flex justify-center items-center rounded-md text-white shadow-md"
        >
          SIGN UP
        </NavLink>
      </div>
    </div>
  );
};

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
import { NavLink } from "react-router-dom";

export const Login: React.FunctionComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="max-w-[600px] bg-gray-100 mx-auto flex flex-col py-7 px-16 rounded-lg mt-5 border border-gray-400">
      <h1 className="text-[24px] mb-5">Login:</h1>
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        sx={{ mb: "12px", width: "100%" }}
      />
      <FormControl sx={{ ml: 0, width: "100%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
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
        <Button variant="contained">Sign in</Button>
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

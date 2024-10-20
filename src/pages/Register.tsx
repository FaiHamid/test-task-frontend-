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
import { createUser } from "../api/user";

export const Register: React.FunctionComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const changeNewUserState = (newValue: string, field: string) => {
    setNewUser(prevUser => ({...prevUser, [field]: newValue }));
  }

  const handleRegisterUser = async () => {
    await createUser(newUser);
  };

  return (
    <div className="max-w-[600px] bg-gray-100 mx-auto flex flex-col py-7 px-16 rounded-lg mt-5 border border-gray-400">
      <h1 className="text-[24px] mb-5">Register:</h1>
      <TextField
        required
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={newUser.name}
        onChange={e => changeNewUserState(e.target.value, 'name')}
        sx={{ mb: "12px", width: "100%" }}
      />
      <TextField
        required
        id="outlined-basic"
        label="Surname"
        variant="outlined"
        value={newUser.surname}
        onChange={e => changeNewUserState(e.target.value, 'surname')}
        sx={{ mb: "12px", width: "100%" }}
      />
      <TextField
        required
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={newUser.email}
        onChange={e => changeNewUserState(e.target.value, 'email')}
        sx={{ mb: "12px", width: "100%" }}
      />
      <FormControl sx={{ mb: "12px", width: "100%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={newUser.password}
          onChange={e => changeNewUserState(e.target.value, 'password')}
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
      <FormControl sx={{ mb: "20px", width: "100%" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          Confirm Password
        </InputLabel>
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
          label="Confirm Password"
        />
      </FormControl>
      <div>
        <Button variant="contained" onClick={handleRegisterUser}>
          Sign up
        </Button>
      </div>
    </div>
  );
};

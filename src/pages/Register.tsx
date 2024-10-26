import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { authService } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { IUser } from "../types/User";
import { useNavigate } from "react-router-dom";
import { validate } from "../utils/validateForm";
import { CustomLoader } from "../components/customLoader";
import { useUsersContext } from "../controllers/useUsersContext";

export const Register: React.FunctionComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState<IUser>({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<IUser>({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { handleEmailChange } = useUsersContext();

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const changeNewUserState = (newValue: string, field: keyof IUser) => {
    if (formErrors[field]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
    setNewUser((prevUser) => ({ ...prevUser, [field]: newValue }));
  };

  const mutation = useMutation<void, Error, IUser>({
    mutationFn: async (newUser) => {
      await authService.register(newUser);
      return;
    },
    onSuccess: () => {
      navigate("/check-email");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const resetErrors = () => {
    setFormErrors({
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleRegisterUser = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const checkName = validate.nameAndSurname(newUser.name, "Name");

    if (checkName) {
      setFormErrors((prevErrors) => ({ ...prevErrors, name: checkName }));
    }

    const checkSurname = validate.nameAndSurname(newUser.surname, "Surname");

    if (checkSurname) {
      setFormErrors((prevErrors) => ({ ...prevErrors, surname: checkSurname }));
    }
    const checkEmail = validate.email(newUser.email);

    if (checkEmail) {
      setFormErrors((prevErrors) => ({ ...prevErrors, email: checkEmail }));
    }

    const checkPassword = validate.password(newUser.password);

    if (checkPassword) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: checkPassword,
      }));
    }

    const checkConfirmPassword = validate.confirmPassword(
      newUser.password,
      newUser.confirmPassword
    );

    if (checkConfirmPassword) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: checkConfirmPassword,
      }));
    }

    if (
      checkName ||
      checkSurname ||
      checkEmail ||
      checkPassword ||
      checkConfirmPassword
    ) {
      return;
    }

    try {
      handleEmailChange(newUser.email);
      console.log('newUser.email', newUser.email);
      await mutation.mutateAsync(newUser);
      resetErrors();
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };

  return (
    <form
      onSubmit={handleRegisterUser}
      className="max-w-[600px] bg-white mx-auto flex flex-col py-7 px-16 rounded-lg mt-5 border border-light-gray"
    >
      {mutation.isPending ? (
        <CustomLoader loaderSize={110} paddingY={162}/>
      ) : (
        <>
          <h1 className="text-[24px] mb-5">Register:</h1>
          <TextField
            required
            error={!!formErrors.name}
            helperText={formErrors.name}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={newUser.name}
            onChange={(e) => changeNewUserState(e.target.value, "name")}
            sx={{ mb: "12px", width: "100%" }}
          />
          <TextField
            required
            error={!!formErrors.surname}
            helperText={formErrors.surname}
            id="outlined-basic"
            label="Surname"
            variant="outlined"
            value={newUser.surname}
            onChange={(e) => changeNewUserState(e.target.value, "surname")}
            sx={{ mb: "12px", width: "100%" }}
          />
          <TextField
            required
            error={!!formErrors.email}
            helperText={formErrors.email}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={newUser.email}
            onChange={(e) => changeNewUserState(e.target.value, "email")}
            sx={{ mb: "12px", width: "100%" }}
          />
          <FormControl
            sx={{ mb: "12px", width: "100%" }}
            variant="outlined"
            error={!!formErrors.password}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={newUser.password}
              onChange={(e) => changeNewUserState(e.target.value, "password")}
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
            {formErrors.password && (
              <FormHelperText>{formErrors.password}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            sx={{ mb: "20px", width: "100%" }}
            variant="outlined"
            error={!!formErrors.confirmPassword}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={newUser.confirmPassword}
              onChange={(e) =>
                changeNewUserState(e.target.value, "confirmPassword")
              }
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
            {formErrors.confirmPassword && (
              <FormHelperText>{formErrors.confirmPassword}</FormHelperText>
            )}
          </FormControl>
          <div>
            <Button variant="contained" type="submit">
              Sign up
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

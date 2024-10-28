import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { authService } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { IUser } from "../types/User";
import { useNavigate } from "react-router-dom";
import { CustomLoader } from "../components/customLoader";
import { useUsersContext } from "../controllers/useUsersContext";
import { PasswordField } from "../components/passwordField";
import { validateRegisterForm } from "../utils/validatationForms";

export const Register: React.FunctionComponent = () => {
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
    const errors = validateRegisterForm(newUser);
    const hasErrors = Object.values(errors).some(error => error !== "");
    setFormErrors(errors);

    if (hasErrors) {
      return;
    }

    try {
      handleEmailChange(newUser.email);
      console.log("newUser.email", newUser.email);
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
        <CustomLoader loaderSize={110} paddingY={162} />
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
          <PasswordField<IUser>
            value={newUser.password}
            errorValue={formErrors.password}
            field="password"
            label="Password"
            onChangeValue={changeNewUserState}
          />
          <PasswordField<IUser>
            value={newUser.confirmPassword}
            errorValue={formErrors.confirmPassword}
            field="confirmPassword"
            label="Confirm Password"
            onChangeValue={changeNewUserState}
          />
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

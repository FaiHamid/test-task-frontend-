import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { IUserLogin } from "../types/User";
import { useUsersContext } from "../controllers/useUsersContext";
import { CustomLoader } from "../components/customLoader";
import { PasswordField } from "../components/passwordField";
import { validateLoginForm } from "../utils/validatationForms";

export const Login: React.FunctionComponent = () => {
  const [currentUser, setCurrentUser] = useState<IUserLogin>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<IUserLogin>({
    email: "",
    password: "",
  });
  const { login } = useUsersContext();
  const navigate = useNavigate();
  const { state } = useLocation();

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

  const resetErrors = () => {
    setFormErrors({
      email: "",
      password: "",
    });
  };

  const changeUserState = (newValue: string, field: keyof IUserLogin) => {
    if (formErrors[field]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
    setCurrentUser((prevUser) => ({ ...prevUser, [field]: newValue }));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateLoginForm(currentUser);
    const hasErrors = Object.values(errors).some((error) => error !== "");
    setFormErrors(errors);

    if (hasErrors) {
      return;
    }

    try {
      await mutation.mutateAsync();
      resetErrors();
    } catch (error) {
      console.error("Failed to login user:", error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-[600px] bg-white mx-auto flex flex-col py-7 px-16 rounded-lg mt-5 border border-light-gray"
    >
      {mutation.isPending ? (
        <CustomLoader loaderSize={110} paddingY={61} />
      ) : (
        <>
          <h1 className="text-[24px] mb-5">Login:</h1>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            error={!!formErrors.email}
            helperText={formErrors.email}
            value={currentUser.email}
            onChange={(e) => changeUserState(e.target.value, "email")}
            sx={{ mb: "12px", width: "100%" }}
          />
          <PasswordField<IUserLogin>
            value={currentUser.password}
            errorValue={formErrors.password}
            field="password"
            label="Password"
            onChangeValue={changeUserState}
          />
          <div className="flex justify-between mt-5">
            <Button variant="contained" type="submit">
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
        </>
      )}
    </form>
  );
};

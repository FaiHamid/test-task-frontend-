import React, { useState } from "react";
import { CustomLoader } from "../components/customLoader";
import { PasswordField } from "../components/PasswordField";
import { ESnackbarStatus, IPasswordData, IUserToChange } from "../types/User";
import { Button } from "@mui/material";
import { validateResetPasswordForm } from "../utils/validatationForms";
import { useMutation } from "@tanstack/react-query";
import { useUsersContext } from "../controllers/useUsersContext";
import { AxiosError } from "axios";
import { AutohideSnackbar } from "../utils/snackBar";
import { useNavigate } from "react-router-dom";

export const ResetPassword: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarStatus, setSnackbarStatus] = useState<ESnackbarStatus>(ESnackbarStatus.Success);
  const [passwords, setPasswords] = useState<IPasswordData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [formErrors, setFormErrors] = useState<IPasswordData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const { updateUser, logout } = useUsersContext();
  const navigate = useNavigate();

  const changeUserState = (newValue: string, field: keyof IPasswordData) => {
    if (formErrors[field]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
    setPasswords((prevUser) => ({ ...prevUser, [field]: newValue }));
  };

  const mutation = useMutation<void, Error, Partial<IUserToChange>>({
    mutationFn: async (data: Partial<IUserToChange>) => {
      await updateUser(data);
      return;
    },
    onSuccess: () => {},
    onError: () => {},
  });

  const mutationLogout = useMutation<void, Error>({
    mutationFn: async () => {
      await logout();

      return;
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateResetPasswordForm(passwords);
    const hasErrors = Object.values(errors).some((error) => error !== "");
    setFormErrors(errors);

    if (hasErrors) {
      return;
    }

    try {
      await mutation.mutateAsync({ hashPassword: passwords.newPassword, password: passwords.oldPassword});
      setSnackbarMessage('Success reset password')
      setSnackbarStatus(ESnackbarStatus.Success);
      setSnackbarOpen(true);
      await mutationLogout.mutateAsync();
      navigate('/login');
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        const errorMessage = error.response.data.message;
        setSnackbarMessage(errorMessage);
        setSnackbarStatus(ESnackbarStatus.Error);
        setSnackbarOpen(true);
      } else {
        console.error("Failed to reset password:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleReset}
      className="max-w-[600px] bg-white mx-auto flex flex-col py-7 px-16 rounded-lg mt-5 border border-light-gray"
    >
      {mutation.isPending ? (
        <CustomLoader loaderSize={110} paddingY={61} />
      ) : (
        <>
          <h1 className="text-[24px] mb-5">Reset password:</h1>
          <PasswordField<IPasswordData>
            value={passwords.oldPassword}
            errorValue={formErrors.oldPassword}
            field="oldPassword"
            label="Old password"
            onChangeValue={changeUserState}
          />
          <PasswordField<IPasswordData>
            value={passwords.newPassword}
            errorValue={formErrors.newPassword}
            field="newPassword"
            label="New password"
            onChangeValue={changeUserState}
          />
          <PasswordField<IPasswordData>
            value={passwords.confirmPassword}
            errorValue={formErrors.confirmPassword}
            field="confirmPassword"
            label="Confirm password"
            onChangeValue={changeUserState}
          />
          <div className="flex justify-between mt-5">
            <Button variant="contained" type="submit">
              Reset
            </Button>
          </div>
        </>
      )}
      <AutohideSnackbar message={snackbarMessage} isOpen={snackbarOpen} onClose={setSnackbarOpen} status={snackbarStatus}/>
    </form>
  )
}
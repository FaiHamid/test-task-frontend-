import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { LogoutComponent } from "../components/logoutComponent";
import { ESnackbarStatus, EVariantLogout, IUserToChange } from "../types/User";
import { firebaseService } from "../services/firebaseService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AutohideSnackbar } from "../utils/snackBar";
import { validateProfileForm } from "../utils/validatationForms";
import { AxiosError } from "axios";
import { UploadAvatarOrLogo } from "../components/uploadAvatarOrLogo";
import { ETargetObject } from "../types/Company";
import { currentUserQuery } from "../reactQuery/userQuery";
import { CustomLoader } from "../components/customLoader";
import { userService } from "../services/userService";
import { queryKeys } from "../reactQuery/queriesKey";

export const Profile: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { data: currentUser, isLoading } = useQuery(currentUserQuery);
  const queryClient = useQueryClient();
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [dataToChange, setDataToChange] = useState<IUserToChange>({
    name: currentUser?.name || "",
    surname: currentUser?.surname || "",
  });
  const [formErrors, setFormErrors] = useState<IUserToChange>({
    name: "",
    surname: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarDetails, setSnackbarDetails] = useState({
    message: "",
    status: ESnackbarStatus.Success,
  });
  const navigate = useNavigate();

  const resetErrors = () => {
    setFormErrors({
      name: "",
      surname: "",
    });
  };

  const mutation = useMutation<void, Error>({
    mutationFn: async () => {
      if (selectedFile) {
        const newUrl = await firebaseService.handleSave(selectedFile);
        setPreviewURL(newUrl || null);
      }
      return;
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error("Save to firebase failed:", error);
    },
  });

  const mutationUser = useMutation<void, Error, Partial<IUserToChange>>({
    mutationFn: async (data: Partial<IUserToChange>) => {
      await userService.updateUser(currentUser!.id, data);
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.getCurrentUser] });
    },
    onError: (error) => {
      console.error("Save to db failed:", error);
    },
  });

  const handleSaveData = async () => {
    if (
      currentUser?.name === dataToChange.name &&
      currentUser?.surname === dataToChange.surname &&
      !previewURL
    ) {
      console.log("nothing change");
      return;
    }

    const errors = validateProfileForm(dataToChange);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setFormErrors(errors);

    if (hasErrors) {
      return;
    }

    const dataToReq: Partial<IUserToChange> = {};

    if (selectedFile) {
      try {
        await mutation.mutateAsync();
        setSnackbarDetails({
          message: "Success change information",
          status: ESnackbarStatus.Success,
        });
        setSnackbarOpen(true);
        dataToReq.avatar = previewURL || "";
        resetErrors();
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.data?.message) {
          const errorMessage = error.response.data.message;
          setSnackbarDetails({
            message: errorMessage,
            status: ESnackbarStatus.Error,
          });
          setSnackbarOpen(true);
        }
        console.error("Failed to save user avatar:", error);
      }
    }

    if (currentUser?.name !== dataToChange.name) {
      dataToReq.name = dataToChange.name;
    }

    if (currentUser?.surname !== dataToChange.surname) {
      dataToReq.surname = dataToChange.surname;
    }
    console.log("dataToReq", dataToReq);
    try {
      await mutationUser.mutateAsync(dataToReq);
      setPreviewURL("");
      setSelectedFile(null);
      setSnackbarDetails({
        message: "Success change information",
        status: ESnackbarStatus.Success,
      });
      setSnackbarOpen(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        const errorMessage = error.response.data.message;
        setSnackbarDetails({
          message: errorMessage,
          status: ESnackbarStatus.Error,
        });
        setSnackbarOpen(true);
      }
      console.error("Failed to save user:", error);
    }
  };

  const changeUserState = (newValue: string, field: keyof IUserToChange) => {
    if (formErrors[field]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
    setDataToChange((prevUser) => ({ ...prevUser, [field]: newValue }));
  };

  if (isLoading) {
    <CustomLoader loaderSize={30} paddingY={50} />;
  }

  return (
    <div className="rounded-md bg-white p-10 border border-light-blue">
      <div className="flex items-center mb-10 relative">
        <UploadAvatarOrLogo
          previewURL={previewURL}
          targetType={ETargetObject.User}
          selectedFile={selectedFile}
          onChangePreviewURL={setPreviewURL}
          onChangeSelectedFile={setSelectedFile}
        />

        <div className="ml-5">
          <p className="text-[24px] font-semibold mb-3">{`${currentUser?.name} ${currentUser?.surname}`}</p>
          <p className="text-semi-gray mb-2">{currentUser?.email}</p>
          <p className=" ">Role: User</p>
        </div>
      </div>
      <p className="text-[28px] font-semibold mb-5">Personal Data:</p>
      <div className="max-w-[400px]">
        <p className="mb-3 font-semibold">Name:</p>
        <TextField
          required
          id="outlined-basic"
          variant="outlined"
          value={dataToChange.name}
          error={!!formErrors.name}
          helperText={formErrors.name}
          onChange={(e) => changeUserState(e.target.value, "name")}
          sx={{ mb: "25px", width: "100%" }}
        />
        <p className="mb-3 font-semibold">Surname:</p>
        <TextField
          required
          id="outlined-basic"
          variant="outlined"
          value={dataToChange.surname}
          error={!!formErrors.surname}
          helperText={formErrors.surname}
          onChange={(e) => changeUserState(e.target.value, "surname")}
          sx={{ mb: "35px", width: "100%" }}
        />
      </div>
      <div className="flex flex-col max-w-[200px]">
        <Button
          variant="contained"
          sx={{ mb: "50px" }}
          onClick={handleSaveData}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="warning"
          sx={{ mb: "20px" }}
          onClick={() => navigate("/reset-password")}
        >
          Reset password
        </Button>
        <LogoutComponent
          variant={EVariantLogout.Button}
          handleClick={() => {}}
        />
      </div>
      <AutohideSnackbar
        message={snackbarDetails.message}
        isOpen={snackbarOpen}
        onClose={setSnackbarOpen}
        status={snackbarDetails.status}
      />
    </div>
  );
};

import React, { useRef, useState } from "react";
import { Avatar } from "../components/avatar";
import { Button, TextField } from "@mui/material";
import { useUsersContext } from "../controllers/useUsersContext";
import { LogoutComponent } from "../services/logoutService";
import { ESnackbarStatus, EVariantLogout, IUserToChange } from "../types/User";
import { firebaseService } from "../services/firebaseService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AutohideSnackbar } from "../utils/snackBar";
import { validateProfileForm } from "../utils/validatationForms";
import { AxiosError } from "axios";

export const Profile: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { currentUser, updateUser } = useUsersContext();
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
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarStatus, setSnackbarStatus] = useState<ESnackbarStatus>(ESnackbarStatus.Success);
  const navigate = useNavigate();

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    setPreviewURL(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetErrors = () => {
    setFormErrors({
      name: "",
      surname: "",
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
      await updateUser(data);
      return;
    },
    onSuccess: () => {},
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
        setSnackbarMessage('Success change information')
        setSnackbarStatus(ESnackbarStatus.Success);
        setSnackbarOpen(true);
        dataToReq.avatar = previewURL || "";
        resetErrors();
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.data?.message) {
          const errorMessage = error.response.data.message;
          setSnackbarMessage(errorMessage);
          setSnackbarStatus(ESnackbarStatus.Error);
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
      setSnackbarMessage('Success change information')
      setSnackbarStatus(ESnackbarStatus.Success);
      setSnackbarOpen(true);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        const errorMessage = error.response.data.message;
        setSnackbarMessage(errorMessage);
        setSnackbarStatus(ESnackbarStatus.Error);
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

  return (
    <div className="rounded-md bg-white p-10 border border-light-blue">
      <div className="flex items-center mb-10 relative">
        <Avatar
          size={150}
          source={previewURL || currentUser?.avatar || ""}
          altText="avatar"
        />
        {selectedFile && (
          <button
            onClick={handleCancelUpload}
            className="pointer w-10 h-10 bg-gray-100 rounded-full p-2 absolute 
            left-0 top-[100px] border-2 border-semi-gray"
          >
            <img src="https://i.imgur.com/KpD60ma.png" alt="Cancel Upload" />
          </button>
        )}
        <div className="relative">
          <button
            onClick={handleClick}
            className="pointer w-12 h-12 bg-light-blue rounded-full p-2 absolute right-2 top-5"
          >
            <img src="https://i.imgur.com/ccmMXRa.png" alt="Upload Icon" />
          </button>
          <input
            type="file"
            accept="image/jpeg, image/png"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
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
      <AutohideSnackbar message={snackbarMessage} isOpen={snackbarOpen} onClose={setSnackbarOpen} status={snackbarStatus}/>
    </div>
  );
};

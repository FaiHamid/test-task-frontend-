import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { ETargetObject, ICompany, ICompanyFormErrors } from "../types/Company";
import { ESnackbarStatus } from "../types/User";
import { UploadAvatarOrLogo } from "../components/uploadAvatarOrLogo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { companiesService } from "../services/companiesService";
import { validateNewCompanyForm } from "../utils/validatationForms";
import { AxiosError } from "axios";
import { AutohideSnackbar } from "../utils/snackBar";
import { currentUserQuery } from "../reactQuery/userQuery";
import { CustomLoader } from "../components/customLoader";

export const NewCompany: React.FC = () => {
  const { data: currentUser, isLoading } = useQuery(currentUserQuery);
  const [address, setAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarDetails, setSnackbarDetails] = useState({
    message: "",
    status: ESnackbarStatus.Success,
  });
  // eslint-disable-next-line no-undef
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [companyData, setCompanyData] = useState<Omit<ICompany, "idUser">>({
    name: "",
    service: "",
    logotype: "",
    capital: 0,
    latitude: "",
    longitude: "",
    price: 0,
  });

  const [formErrors, setFormErrors] = useState<Partial<ICompanyFormErrors>>({
    name: "",
    service: "",
    capital: "",
    price: "",
  });

  const GOOGLE_API_KEY = import.meta.env.VITE_API_KEY;

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setAddress(value);

    if (autocomplete) {
      autocomplete.set("place", null);
    }
  };

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        setCompanyData((prevCompany) => ({
          ...prevCompany,
          latitude: lat.toString(),
          longitude: lng.toString(),
        }));
        setAddress(place.formatted_address || "");
      }
    }
  };

  const changeCompanyState = (newValue: string, field: keyof ICompany) => {
    if (Object.prototype.hasOwnProperty.call(formErrors, field)) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    }
    if (field === "price" || field === "capital") {
      if (/^\d*$/.test(newValue)) {
        setCompanyData((prevCompany) => ({
          ...prevCompany,
          [field]: +newValue,
        }));
      } else {
        return;
      }
    }
    setCompanyData((prevCompany) => ({ ...prevCompany, [field]: newValue }));
  };

  const mutation = useMutation<void, Error>({
    mutationFn: async () => {
      if (currentUser) {
        await companiesService.addNewCompany({
          ...companyData,
          idUser: currentUser?.id,
        });
      }

      return;
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateNewCompanyForm(companyData);
    const hasErrors = Object.values(errors).some((error) => error !== "");
    setFormErrors(errors);

    if (hasErrors) {
      return;
    }

    try {
      await mutation.mutateAsync();
      setSnackbarDetails({
        message: "Success add company",
        status: ESnackbarStatus.Success
      });
      setSnackbarOpen(true);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        const errorMessage = error.response.data.message;
        setSnackbarDetails({
          message: errorMessage,
          status: ESnackbarStatus.Error,
        });
        setSnackbarOpen(true);
      }
    }
  };

      if (isLoading) {
        <CustomLoader loaderSize={30} paddingY={50}/>
      }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="rounded-md bg-white p-10 border border-light-blue"
      >
        <p className="text-[36px] font-semibold mb-3">Add new company:</p>
        <div className="flex items-center mb-10 relative">
          <UploadAvatarOrLogo
            previewURL={previewURL}
            targetType={ETargetObject.Company}
            selectedFile={selectedFile}
            onChangePreviewURL={setPreviewURL}
            onChangeSelectedFile={setSelectedFile}
          />
        </div>
        <div className="max-w-[400px]">
          <p className="mb-3 font-semibold">Name:</p>
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            value={companyData.name}
            placeholder="Enter company name"
            onChange={(e) => changeCompanyState(e.target.value, "name")}
            sx={{ mb: "25px", width: "100%" }}
          />

          <p className="mb-3 font-semibold">Service:</p>
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            placeholder="Enter company service"
            value={companyData.service}
            onChange={(e) => changeCompanyState(e.target.value, "service")}
            sx={{ mb: "35px", width: "100%" }}
          />

          <p className="mb-3 font-semibold">Capital:</p>
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            value={companyData.capital}
            onChange={(e) => changeCompanyState(e.target.value, "capital")}
            sx={{ mb: "35px", width: "100%" }}
          />

          <p className="mb-3 font-semibold">Price:</p>
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            value={companyData.price}
            onChange={(e) => changeCompanyState(e.target.value, "price")}
            sx={{ mb: "35px", width: "100%" }}
          />

          <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={["places"]}>
            <Autocomplete
              onLoad={(autocomplete) => setAutocomplete(autocomplete)}
              onPlaceChanged={handlePlaceSelect}
            >
              <>
                <p className="mb-3 font-semibold">Address:</p>
                <TextField
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  placeholder="Enter address"
                  sx={{ mb: "35px", width: "100%" }}
                />
              </>
            </Autocomplete>
          </LoadScript>
        </div>
        <Button variant="contained" sx={{ mb: "50px" }} type="submit">
          Save
        </Button>
      </form>

      <AutohideSnackbar
        message={snackbarDetails.message}
        isOpen={snackbarOpen}
        onClose={setSnackbarOpen}
        status={snackbarDetails.status}
      />
    </>
  );
};

import { IPasswordData, IUser, IUserLogin, IUserToChange } from "../types/User";
import { validate } from "./validateFormElements";

export const validateRegisterForm = (formData: IUser) => {
  const errors: IUser = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  for (const key in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, key)) {
      const typedKey = key as keyof IUser;
      
      if (typedKey === 'name' || typedKey === "surname") {
        errors[typedKey] = validate.nameAndSurname(formData[typedKey], typedKey);
      } else if (typedKey === 'confirmPassword') {
        errors[typedKey] = validate.confirmPassword(formData.password, formData.confirmPassword);
      } else {
        errors[typedKey] = validate[typedKey](formData[typedKey]);
      }
    }
  }

  return errors;
}

export const validateLoginForm = (formData: IUserLogin) => {
  const errors: IUserLogin = {
    email: "",
    password: "",
  }

  for (const key in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, key)) {
      const typedKey = key as keyof IUserLogin;

      errors[typedKey] = validate[typedKey](formData[typedKey]);
    }
  }

  return errors;
}

export const validateResetPasswordForm = (formData: IPasswordData) => {
  const errors: IPasswordData = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  }

  for (const key in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, key)) {
      const typedKey = key as keyof IPasswordData;

      if (typedKey === 'confirmPassword') {
        errors[typedKey] = validate.confirmPassword(formData.newPassword, formData.confirmPassword);
        continue;
      }

      errors[typedKey] = validate.password(formData[typedKey]);
    }
  }

  return errors;
}

export const validateProfileForm = (formData: IUserToChange) => {
  const errors: IUserToChange = {
    name: "",
    surname: "",
  }
  for (const key in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, key)) {
      const typedKey = key as keyof IUser;

      if (typedKey === 'name' || typedKey === "surname") {
        errors[typedKey] = validate.nameAndSurname(formData[typedKey], typedKey);
      }
    }
  }

  return errors;
}
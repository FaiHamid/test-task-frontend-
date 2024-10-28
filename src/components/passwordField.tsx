import { Visibility, VisibilityOff } from "@mui/icons-material"
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"
import React, { useState } from "react"

interface Props<T> {
  value: string;
  errorValue: string;
  field: keyof T;
  label: string;
  onChangeValue: (newValue: string, field: keyof T) => void; 
}

export const PasswordField = <T,>({ value, errorValue, field, label, onChangeValue }: Props<T>) => {
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
    <FormControl
    sx={{ mb: "12px", width: "100%" }}
    variant="outlined"
    error={!!errorValue}
  >
    <InputLabel htmlFor="outlined-adornment-password">
      {label}
    </InputLabel>
    <OutlinedInput
      id="outlined-adornment-password"
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={(e) =>
        onChangeValue(e.target.value, field)
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
      label={label}
    />
    {errorValue && (
      <FormHelperText>{errorValue}</FormHelperText>
    )}
  </FormControl>
  )
}
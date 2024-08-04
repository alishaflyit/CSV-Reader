import React from "react";
import { TextField, InputAdornment } from "@mui/material";

interface GlobalFilterProps {
  globalFilter: string;
  handleGlobalFilterChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({
  globalFilter,
  handleGlobalFilterChange,
}) => (
  <TextField
    label="Global Filter"
    variant="outlined"
    fullWidth
    margin="normal"
    value={globalFilter}
    onChange={handleGlobalFilterChange}
    InputProps={{
      startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
    }}
  />
);

export default GlobalFilter;

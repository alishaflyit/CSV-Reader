import React from "react";
import { Menu, Checkbox, FormControlLabel, Grid } from "@mui/material";

interface ColumnVisibilityMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  columns: string[];
  columnVisibility: Record<string, boolean>;
  handleClose: () => void;
  handleColumnVisibilityChange: (column: string) => void;
}

const ColumnVisibilityMenu: React.FC<ColumnVisibilityMenuProps> = ({
  anchorEl,
  open,
  columns,
  columnVisibility,
  handleClose,
  handleColumnVisibilityChange,
}) => (
  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
    <Grid container spacing={2} padding={2}>
      {columns.map((column) => (
        <Grid item xs={12} sm={4} key={column}>
          <FormControlLabel
            control={
              <Checkbox
                checked={columnVisibility[column] !== false}
                onChange={() => handleColumnVisibilityChange(column)}
              />
            }
            label={column}
          />
        </Grid>
      ))}
    </Grid>
  </Menu>
);

export default ColumnVisibilityMenu;

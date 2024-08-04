import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

interface DataRow {
  [key: string]: string;
}

interface DataTableProps {
  data: DataRow[];
  filteredData: DataRow[];
  columns: string[];
  columnVisibility: Record<string, boolean>;
  sortColumn: string;
  sortDirection: "asc" | "desc";
  page: number;
  rowsPerPage: number;
  handleSortChange: (column: string) => void;
  handlePageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleRowsPerPageChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleColumnFilterChange: (
    column: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  pageInput: string;
  handlePageInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePageInputBlur: () => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  filteredData,
  columns,
  columnVisibility,
  sortColumn,
  sortDirection,
  page,
  rowsPerPage,
  handleSortChange,
  handlePageChange,
  handleRowsPerPageChange,
  handleColumnFilterChange,
  pageInput,
  handlePageInputChange,
  handlePageInputBlur,
  setPage,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(
              (key) =>
                columnVisibility[key] !== false && (
                  <TableCell key={key} style={{ fontWeight: "bold" }}>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" component="div" flexGrow={1}>
                        {key}
                      </Typography>
                      <TextField
                        placeholder="Filter"
                        variant="outlined"
                        size="small"
                        onChange={handleColumnFilterChange(key)}
                        style={{ marginLeft: "8px", width: "120px" }}
                      />
                      <IconButton onClick={() => handleSortChange(key)}>
                        <SortIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                {columns.map(
                  (key) =>
                    columnVisibility[key] !== false && (
                      <TableCell key={key}>{row[key]}</TableCell>
                    )
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography variant="body2">
          Showing {page * rowsPerPage + 1} to{" "}
          {Math.min((page + 1) * rowsPerPage, filteredData.length)} of{" "}
          {filteredData.length} entries
        </Typography>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          ActionsComponent={() => (
            <Box display="flex" alignItems="center">
              <Button
                variant="outlined"
                onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                disabled={page === 0}
                style={{ marginRight: "8px" }}
              >
                Previous
              </Button>
              <TextField
                type="number"
                value={pageInput}
                onChange={handlePageInputChange}
                onBlur={handlePageInputBlur}
                style={{ marginRight: "8px", width: "80px" }}
              />
              <Button
                variant="outlined"
                onClick={() =>
                  setPage((prev) =>
                    Math.min(
                      Math.ceil(filteredData.length / rowsPerPage) - 1,
                      prev + 1
                    )
                  )
                }
                disabled={
                  page >= Math.ceil(filteredData.length / rowsPerPage) - 1
                }
              >
                Next
              </Button>
            </Box>
          )}
        />
      </Box>
    </TableContainer>
  );
};

export default DataTable;

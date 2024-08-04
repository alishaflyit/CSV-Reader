import React from "react";
import { Container, Button, Box, Typography } from "@mui/material";
import GlobalFilter from "../components/GlobalFilter";
import DataTable from "../components/DataTable";
import ColumnVisibilityMenu from "../components/ColumnVisibilityMenu";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useManageData from "../hook/useManageData";

const WithDynamicCSV: React.FC = () => {
  const {
    data,
    page,
    open,
    columns,
    anchorEl,
    fileName,
    pageInput,
    sortColumn,
    rowsPerPage,
    filteredData,
    globalFilter,
    sortDirection,
    columnVisibility,
    setPage,
    handleGlobalFilterChange,
    handleColumnFilterChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleColumnVisibilityChange,
    handleOpenMenu,
    handleCloseMenu,
    handlePageInputChange,
    handlePageInputBlur,
    handleFileChange,
  } = useManageData(false);

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Button
          variant="contained"
          color="primary"
          component="label"
          startIcon={<CloudUploadIcon />}
          style={{ marginBottom: "16px" }}
        >
          Upload CSV
          <input type="file" accept=".csv" onChange={handleFileChange} hidden />
        </Button>
        {fileName && (
          <Typography variant="h6" color="textSecondary">
            Selected file: {fileName}
          </Typography>
        )}
      </Box>

      {data.length > 0 && (
        <>
          <Box mb={3}>
            <GlobalFilter
              globalFilter={globalFilter}
              handleGlobalFilterChange={handleGlobalFilterChange}
            />
          </Box>
          <Button
            variant="outlined"
            onClick={handleOpenMenu}
            style={{ marginBottom: "16px" }}
          >
            Column Filter
          </Button>
          <ColumnVisibilityMenu
            anchorEl={anchorEl}
            open={open}
            columns={columns}
            columnVisibility={columnVisibility}
            handleClose={handleCloseMenu}
            handleColumnVisibilityChange={handleColumnVisibilityChange}
          />
          <DataTable
            data={data}
            filteredData={filteredData}
            columns={columns}
            columnVisibility={columnVisibility}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            page={page}
            rowsPerPage={rowsPerPage}
            handleSortChange={handleSortChange}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
            handleColumnFilterChange={handleColumnFilterChange}
            pageInput={pageInput}
            handlePageInputChange={handlePageInputChange}
            handlePageInputBlur={handlePageInputBlur}
            setPage={setPage}
          />
        </>
      )}
    </Container>
  );
};

export default WithDynamicCSV;

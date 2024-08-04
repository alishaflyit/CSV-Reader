import React from "react";
import { Container, Button, Box } from "@mui/material";
import GlobalFilter from "../components/GlobalFilter";
import DataTable from "../components/DataTable";
import ColumnVisibilityMenu from "../components/ColumnVisibilityMenu";
import useManageData from "../hook/useManageData";

const WithFixedCSV: React.FC = () => {
  const {
    data,
    filteredData,
    page,
    setPage,
    rowsPerPage,
    globalFilter,
    columnVisibility,
    sortColumn,
    sortDirection,
    anchorEl,
    pageInput,
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
    open,
    columns,
  } = useManageData(true);

  return (
    <Container>
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
      {data.length > 0 && (
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
      )}
    </Container>
  );
};

export default WithFixedCSV;

import React, { useState, useEffect, useCallback } from "react";
import Papa from "papaparse";
import debounce from "lodash.debounce";

interface DataRow {
  [key: string]: string;
}

const initialColumnList = [
  "created_dt",
  "data_source_modified_dt",
  "entity_type",
  "operating_status",
  "legal_name",
  "dba_name",
  "physical_address",
  // "p_street",
  // "p_city",
  // "p_state",
  // "p_zip_code",
  "phone",
  // "mailing_address",
  // "m_street",
  // "m_city",
  // "m_state",
  // "m_zip_code",
  "usdot_number",
  "mc_mx_ff_number",
  "power_units",
  // "mcs_150_form_date",
  "out_of_service_date",
  // "state_carrier_id_number",
  // "duns_number",
  // "drivers",
  // "mcs_150_mileage_year",
  // "id",
  // "credit_score",
  // "record_status",
];

const useManageData = (isWithFixedCSV: boolean) => {
  const [data, setData] = useState<DataRow[]>([]);
  const [filteredData, setFilteredData] = useState<DataRow[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {}
  );
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [pageInput, setPageInput] = useState<string>("1");
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (isWithFixedCSV) {
      fetch("/data.csv")
        .then((response) => response.text())
        .then((text) => {
          Papa.parse<DataRow>(text, {
            header: true,
            complete: (results) => {
              const columns = Object.keys(results.data[0] || {});
              const initialVisibility = columns.reduce((acc, column) => {
                acc[column] = initialColumnList.includes(column);
                return acc;
              }, {} as Record<string, boolean>);
              const initialFilters = columns.reduce((acc, column) => {
                acc[column] = "";
                return acc;
              }, {} as Record<string, string>);
              setData(results.data);
              setFilteredData(results.data);
              setColumnVisibility(initialVisibility);
              setColumnFilters(initialFilters);
              setPage(0);
              setPageInput("1");
            },
          });
        });
    }
  }, [isWithFixedCSV]);

  useEffect(() => {
    setPageInput((page + 1).toString());
  }, [page]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      Papa.parse<DataRow>(file, {
        header: true,
        complete: (results) => {
          const columns = Object.keys(results.data[0] || {});
          const initialVisibility = columns.reduce((acc, column) => {
            acc[column] = true;
            return acc;
          }, {} as Record<string, boolean>);
          const initialFilters = columns.reduce((acc, column) => {
            acc[column] = "";
            return acc;
          }, {} as Record<string, string>);
          setData(results.data);
          setFilteredData(results.data);
          setColumnVisibility(initialVisibility);
          setColumnFilters(initialFilters);
          setPage(0); // Reset to first page when data is loaded
          setPageInput("1"); // Reset input to page 1
        },
      });
    }
  };

  const applyFilters = useCallback(
    (globalValue: string, columnValues: Record<string, string>) => {
      const filtered = data.filter((row) => {
        return (
          (globalValue === "" ||
            Object.values(row).some((val) =>
              val.toLowerCase().includes(globalValue.toLowerCase())
            )) &&
          Object.keys(columnValues).every(
            (column) =>
              columnValues[column] === "" ||
              (row[column] &&
                row[column]
                  .toLowerCase()
                  .includes(columnValues[column].toLowerCase()))
          )
        );
      });
      setFilteredData(filtered);
    },
    [data]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedApplyFilters = useCallback(
    debounce((value: string) => applyFilters(value, columnFilters), 300),
    [applyFilters, columnFilters]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedApplyColumnFilters = useCallback(
    debounce(
      (filters: Record<string, string>) => applyFilters(globalFilter, filters),
      300
    ),
    [applyFilters, globalFilter]
  );

  const handleGlobalFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setGlobalFilter(value);
    debouncedApplyFilters(value);
  };

  const handleColumnFilterChange =
    (column: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setColumnFilters((prev) => {
        const updatedFilters = { ...prev, [column]: value };
        debouncedApplyColumnFilters(updatedFilters);
        return updatedFilters;
      });
    };

  const handleSortChange = (column: string) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[column] < b[column]) return direction === "asc" ? -1 : 1;
      if (a[column] > b[column]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortColumn(column);
    setSortDirection(direction);
    setFilteredData(sortedData);
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleColumnVisibilityChange = (column: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handlePageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPageInput(value);
    if (value === "" || /^[1-9]\d*$/.test(value)) {
      const newPage = Math.max(
        0,
        Math.min(
          Math.ceil(filteredData.length / rowsPerPage) - 1,
          parseInt(value, 10) - 1
        )
      );
      setPage(newPage);
    }
  };

  const handlePageInputBlur = () => {
    setPageInput((page + 1).toString());
  };

  const open = Boolean(anchorEl);
  const columns = Object.keys(data[0] || {});

  return {
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
  };
};

export default useManageData;

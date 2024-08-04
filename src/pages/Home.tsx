import React from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const onFixedClick = () => navigate("/withFixedCSV");

  const onDynamicClick = () => navigate("/withDynamicCSV");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        gap: 2,
      }}
    >
      <Button
        variant="contained"
        onClick={onFixedClick}
        style={{ marginBottom: "16px" }}
      >
        With Fixed CSV
      </Button>
      <Button
        variant="contained"
        onClick={onDynamicClick}
        style={{ marginBottom: "16px" }}
      >
        With Dynamic CSV
      </Button>
    </Box>
  );
};

export default Home;

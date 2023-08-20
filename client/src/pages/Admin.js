import { Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

function Admin() {
  const [displayForm, setDisplayForm] = useState(false);
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
  });

  const handleDisplayForm = () => {
    setDisplayForm((prev) => !prev);
  };

  const handleInputData = (e) => {
    setInputData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventdefault();
    axios.post("http://localhost:4000/adduser", inputData, {
      withCredentials: true,
    });
  };

  const boxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const formStyle = {
    display: "block",
    margin: "20px",
  };

  return (
    <Box sx={boxStyle}>
      {displayForm ? (
        <form onSubmit={handleSubmit}>
          <TextField
            sx={formStyle}
            variant="standard"
            type="text"
            required
            label="Username"
            name="username"
            value={inputData.username}
            onChange={handleInputData}
          />
          <TextField
            sx={formStyle}
            variant="standard"
            type="password"
            required
            label="Password"
            name="password"
            value={inputData.password}
            onChange={handleInputData}
          />
          <Button type="submit" sx={formStyle} variant="contained">
            Add User
          </Button>
        </form>
      ) : (
        <Button onClick={handleDisplayForm} sx={formStyle} variant="contained">
          ADD USER
        </Button>
      )}
    </Box>
  );
}

export default Admin;

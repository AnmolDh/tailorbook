import { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

function LoginForm() {
  const [inputData, setInputData] = useState({
    userType: "admin",
    username: "",
    password: "",
  });

  const handleInputData = (e) => {
    setInputData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/login", inputData);
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
      <form onSubmit={handleSubmit}>
        <TextField
          sx={formStyle}
          id="outlined-select-currency"
          select
          defaultValue="admin"
          label="User Type"
          name="userType"
          value={inputData.userType}
          onChange={handleInputData}
        >
          <MenuItem key="admin" value="admin">
            Admin
          </MenuItem>
          <MenuItem key="user" value="user">
            User
          </MenuItem>
        </TextField>
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
        <Button sx={formStyle} type="submit" variant="contained">
          LOGIN
        </Button>
      </form>
    </Box>
  );
}

export default LoginForm;

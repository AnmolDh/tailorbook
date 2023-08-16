import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export default function () {
  const [inputData, setInputData] = useState({
    userId: "",
    password: "",
    userType: "admin"
  })

  const handleInputData = (e) => {
    setInputData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputData);
  }


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
          variant="standard"
          type="text"
          label="User ID"
          name="userId"
          value={inputData.userId}
          onChange={handleInputData}
        />
        <TextField
          sx={formStyle}
          variant="standard"
          type="password"
          label="Password"
          name="password"
          value={inputData.password}
          onChange={handleInputData}
        />
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
        <Button sx={formStyle} type="submit" variant="contained">
          LOGIN
        </Button>
      </form>
    </Box>
  );
}

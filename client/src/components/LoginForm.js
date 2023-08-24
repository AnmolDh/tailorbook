import { Box, TextField } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const LoginDiv = styled.div`
  flex: 1;
  border: 4px solid white;
  border-radius: 30px;
  margin: 10vh 0;
  text-align: center;
  padding-top: 3vh;
`;

const CustomTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "white",
    "&.Mui-focused": {
      color: "white",
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
      borderRadius: "20px",
    },
    "& input": {
      color: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

const Button = styled.button`
  padding: 15px 30px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  border: 3px solid white;

  &:hover {
    background-color: transparent;
    color: white;
  }
`;

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const formStyle = {
  display: "block",
  margin: "40px",
};

function LoginForm() {
  const [inputData, setInputData] = useState({
    usertype: "admin",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:4000/login",
      inputData,
      {
        withCredentials: true,
      }
    );
    if (!response.data.invalid) {
      inputData.usertype === "admin"
        ? window.location.replace("/admin")
        : window.location.replace("/user");
    } else {
      window.location.replace("/");
    }
  };

  const handleInputData = (e) => {
    setInputData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <LoginDiv>
      <h3>LOGIN</h3>
      <Box sx={boxStyle}>
        <form onSubmit={handleSubmit}>
          <CustomTextField
            sx={formStyle}
            type="text"
            label="I'm an"
            name="usertype"
            value={inputData.usertype}
            onChange={handleInputData}
          />
          <CustomTextField
            sx={formStyle}
            type="text"
            label="Username"
            name="username"
            value={inputData.username}
            onChange={handleInputData}
          />
          <CustomTextField
            sx={formStyle}
            type="password"
            label="Password"
            name="password"
            value={inputData.password}
            onChange={handleInputData}
          />
          <Button type="submit">CONTINUE</Button>
        </form>
      </Box>
    </LoginDiv>
  );
}

export default LoginForm;

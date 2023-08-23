import LoginForm from "../components/LoginForm";
import { useState } from "react";
import axios from "axios";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/login", inputData, {
      withCredentials: true,
    });
    inputData.userType === "admin"
      ? window.location.replace("/admin")
      : window.location.replace("/user");
  };
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

  return (
    <LoginForm
      type={"login"}
      data={inputData}
      handleData={handleInputData}
      handleSubmit={handleSubmit}
    />
  );
}

export default Login;

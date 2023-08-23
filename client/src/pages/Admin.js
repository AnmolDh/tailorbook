import axios from "axios";
import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";

function Admin() {
  const [adminData, setAdminData] = useState({
    username: "",
    userCount: "",
  });
  const [displayForm, setDisplayForm] = useState(false);
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/admin", {
        withCredentials: true,
      });
      setAdminData(response.data);
    };
    fetchData();
  }, []);

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
    e.preventDefault();
    axios.post("http://localhost:4000/adduser", inputData, {
      withCredentials: true,
    });
  };

  return (
    <div>
      <div>
        <p>Username: {adminData.username}</p>
        <p>User Count: {adminData.userCount}</p>
      </div>
      <LoginForm
        type={"add user"}
        data={inputData}
        handleData={handleInputData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Admin;

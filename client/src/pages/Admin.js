import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";

const BodyDiv = styled.div`
  background-color: #F8F4EA;
  width: 100vw;
  height: 100vh;
  padding: 5vh 8vw;
  color: black;
`;


function Admin() {
  const [adminData, setAdminData] = useState({
    username: "",
    userCount: "",
    users: [],
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
    axios.post("http://localhost:4000/admin/adduser", inputData, {
      withCredentials: true,
    });
  };

  return (
    <div>
      <BodyDiv>
        {/* <Header/> */}
        <div>
          <p>Username: {adminData.username}</p>
          <p>User Count: {adminData.userCount}</p>
        </div>
      </BodyDiv>
    </div>
  );
}

export default Admin;

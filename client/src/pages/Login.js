import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import Hero from "../components/Hero";

const BodyDiv = styled.div`
  background-image: radial-gradient(circle at 0% 0%, #5de0e6, #004aad);
  width: 100vw;
  height: 100vh;
  padding: 5vh 8vw;
  color: white;
`;

const MainDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  font-family: "Old Standard TT", sans-serif;
`;

function Test() {
  return (
    <BodyDiv>
      <Header />
      <MainDiv>
        <Hero />
        <LoginForm />
      </MainDiv>
    </BodyDiv>
  );
}

export default Test;

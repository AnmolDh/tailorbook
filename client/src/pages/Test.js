import styled from "styled-components";
import { Box, TextField } from "@mui/material";

const Body = styled.div`
  background-image: radial-gradient(circle at 0% 0%, #5de0e6, #004aad);
  width: 100vw;
  height: 100vh;
  padding: 5vh 8vw;
  color: white;
`;

const Header = styled.div`
  font-family: "Russo One", serif;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UL = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
`;

const LI = styled.li`
  margin-left: 10vw;
  margin-right: 1vw;
`;

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  font-family: "Old Standard TT", sans-serif;
`;

const Hero = styled.div`
  flex: 1.5;
  padding-top: 12%;
  font-size: 1.2rem;
`;

const Login = styled.div`
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

function Test() {
  return (
    <Body>
      <Header>
        <h1>TAILORBOOK</h1>
        <UL>
          <LI>ABOUT</LI>
          <LI>CONTACT</LI>
        </UL>
      </Header>
      <Main>
        <Hero>
          <h1>
            Streamline Your Tailoring Business with TailorBook: Your All-in-One
            Solution
          </h1>
        </Hero>
        <Login>
          <h3>LOGIN</h3>
          <Box sx={boxStyle}>
            <form>
              <CustomTextField sx={formStyle} type="text" label="I'm a" />
              <CustomTextField
                sx={formStyle}
                type="text"
                label="Username"
                name="username"
                color=""
              />
              <CustomTextField
                sx={formStyle}
                type="password"
                label="Password"
                name="password"
              />
              <Button>CONTINUE</Button>
            </form>
          </Box>
        </Login>
      </Main>
    </Body>
  );
}

export default Test;

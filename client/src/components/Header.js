import styled from "styled-components";

const HeaderDiv = styled.div`
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

function Header() {
  return (
    <HeaderDiv>
      <h1>Blah Blah Brrr</h1>
      <UL>
        <LI>ABOUT</LI>
        <LI>CONTACT</LI>
      </UL>
    </HeaderDiv>
  );
}

export default Header;

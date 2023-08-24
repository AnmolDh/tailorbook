import styled from "styled-components";

const HeroDiv = styled.div`
  flex: 1.5;
  padding-top: 12%;
  font-size: 1.2rem;
`;

function Hero() {
  return (
    <HeroDiv>
      <h1>
        Streamline Your Tailoring Business with TailorBook: Your All-in-One
        Solution
      </h1>
    </HeroDiv>
  );
}

export default Hero;

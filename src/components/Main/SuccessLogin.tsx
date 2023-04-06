import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { successLoginState } from "../../atom/atom";

export default function SuccessLogin() {
  const [successLogin, setsuccessLogin] = useRecoilState(successLoginState);

  const changeLogin = () => {
    setsuccessLogin(!successLogin);
  };

  return (
    <Container>
      로그인 성공
      <button onClick={changeLogin}>X</button>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  width: 30vw;
  height: 50vh;
  background-color: gray;
  color: white;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

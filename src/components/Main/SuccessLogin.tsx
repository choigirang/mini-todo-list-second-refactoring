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
    <>
      <Container>
        <div className="title">로그인 성공</div>
        <button onClick={changeLogin} className="closeBtn">
          X
        </button>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: absolute;
  width: 30vw;
  height: 50vh;
  background-color: gray;
  background: linear-gradient(0deg, #ffffff 0%, #b8b8b8 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
  overflow: hidden;
  color: white;

  &::before {
    position: absolute;
    content: "";
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
    animation: shiny-btn1 3s ease-in-out infinite;
  }

  @keyframes shiny-btn1 {
    0% {
      -webkit-transform: scale(0) rotate(45deg);
      opacity: 0;
    }
    80% {
      -webkit-transform: scale(0) rotate(45deg);
      opacity: 0.5;
    }
    81% {
      -webkit-transform: scale(4) rotate(45deg);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(50) rotate(45deg);
      opacity: 0;
    }
  }

  @media screen and (max-width: 1200px) {
    width: 25vw;
    min-width: 350px;
    font-size: 1rem;
  }

  @media screen and (max-width: 768px) {
    width: 20vw;
    min-width: 300px;
    font-size: 1rem;
  }

  > .title {
    position: absolute;
    top: 40%;
    font-size: 3rem;
    font-family: "Child";
    text-decoration: underline;
  }

  > .closeBtn {
    position: absolute;
    bottom: 25%;
    width: 5rem;
    height: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    box-shadow: 0px 4px #797d7e;
    background-color: #979896;
    border: none;
    color: white;
    font-family: "Child";
  }
`;

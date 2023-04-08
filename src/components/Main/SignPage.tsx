import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState } from "recoil";
import { signInState } from "./../../atom/atom";

export default function Sign() {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [signState, setSignState] = useRecoilState(signInState);

  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const passChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const signApi = () => {
    axios.post("http://localhost:4000/login", { id, pass }).then((res) => {
      console.log(res);
    });
    setSignState(!signState);
  };
  return (
    <Container>
      <div className="title">가입~</div>
      <div className="closeBtn" onClick={signApi}>
        X
      </div>
      <div className="nameBox">
        <div>id :</div>
        <input
          type="text"
          onChange={(event) => nameChange(event)}
          value={id}
        ></input>
      </div>
      <div className="passBox">
        <div>pw :</div>
        <input
          type="password"
          onChange={(event) => passChange(event)}
          value={pass}
        ></input>
      </div>
      <button onClick={signApi} className="sign">
        sign in
      </button>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  width: 30vw;
  height: 50vh;
  background-color: gray;
  background: linear-gradient(0deg, #ffffff 0%, #b8b8b8 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
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
    top: 20%;
    font-size: 3rem;
    font-family: "Child";
    text-decoration: underline;
  }

  .closeBtn {
    position: absolute;
    top: 5%;
    right: 6%;
    font-size: 1.5rem;
    cursor: pointer;
  }

  > .nameBox {
    width: 60%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    > input {
      background: linear-gradient(0deg, #ffffff 0%, #b8b8b8 100%);
    }
  }
  > .passBox {
    width: 60%;
    display: flex;
    justify-content: space-between;

    > input {
      background: linear-gradient(0deg, #ffffff 0%, #b8b8b8 100%);
    }
  }

  > .sign {
    position: absolute;
    bottom: 20%;
    width: 5rem;
    height: 1.5rem;
    border-radius: 5px;
    box-shadow: 0px 4px #797d7e;
    background-color: #979896;
    border: none;
    color: white;
    font-family: "Child";
  }

  > .sign:active {
    box-shadow: 0 0 #7f7f7f;
    background-color: #545454;
  }
`;

import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState } from "recoil";
import { signInState } from "../../../../atom/atom";
import { useMutation } from "react-query";

interface LoginUser {
  id: string;
  pw: string;
}

async function signIn(idPw: LoginUser) {
  const res = await axios.post("http://localhost:4000/login", idPw);
  return res;
}

export default function Sign() {
  const [id, setId] = useState("");
  // 입력한 아이디 저장
  const [pw, setPw] = useState("");
  // 입력한 비밀번호 저장
  const [signState, setSignState] = useRecoilState(signInState);
  // 회원가입 완료되면 회원가입창 닫기
  const els = ["id", "pw"];
  // 코드 간결화
  const idPw: LoginUser = { id, pw };
  const idChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  // 입력한 아이디
  const pwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };
  // 입력한 패스워드

  // const postSignIn = useMutation((postSign) => signIn(postSign));
  const postSignIn = useMutation((idPw: LoginUser) => signIn(idPw));
  // 입력한 아이디와 패스워드를 api에 보내주기
  return (
    <Container>
      <CloseBtn onClick={() => setSignState(!signState)} />
      <div className="title">가입~</div>
      {els.map((el) => (
        <div className={`${el}Box`} key={el}>
          <div>{el} :</div>
          <input
            type="text"
            value={el === "id" ? id : pw}
            className={el === "id" ? "idInput" : "pwInput"}
            onChange={(event) =>
              el === "id" ? idChange(event) : pwChange(event)
            }
          ></input>
        </div>
      ))}
      <SignBtn
        onClick={() => {
          postSignIn.mutate(idPw);
        }}
      />
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

  > .idBox {
    width: 60%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    > input {
      background: linear-gradient(0deg, #ffffff 0%, #b8b8b8 100%);
    }
  }
  > .pwBox {
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

const CloseBtn = styled.button`
  position: absolute;
  top: 5%;
  right: 6%;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SignBtn = styled.button`
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

  &:active {
    box-shadow: 0 0 #7f7f7f;
    background-color: #545454;
  }

  &::before {
    content: "sign in";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

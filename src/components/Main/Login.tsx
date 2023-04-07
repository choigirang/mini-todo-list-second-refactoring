import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginState, signInState } from "./../../atom/atom";
import SignPage from "./SignPage";
import AddTodo from "./../Home/AddTodo";
import Background from "./../Background";

interface LoginUser {
  id: string;
  pass: string;
}

export default function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [getUser, setUser] = useState<LoginUser[]>([]);
  // input에 입력한 name, pass
  // api에서 data를 받아와 user확인
  const [loginValue, setLoginValue] = useRecoilState(loginState);
  // login 상태값 관리
  const [sign, setSign] = useRecoilState(signInState);
  // Sign 페이지 띄우기
  const [message, setMessage] = useState<boolean | undefined>(true);

  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const passChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  // login 버튼을 클릭 시 api에서 데이터를 받아와
  // recoil 상태값 변경
  const loginApi = () => {
    axios.get<LoginUser[]>("http://localhost:4000/login").then((res) => {
      setUser(res.data);
      const matchedUser = res.data.find(
        (user) => user.id === name && user.pass === pass
      );
      if (matchedUser) {
        // 로그인 성공 처리
        console.log("로그인 성공");
        setLoginValue(!loginValue);
        console.log(message);
        setMessage(true);
      } else {
        // 로그인 실패 처리
        console.log("로그인 실패");
        setMessage(false);
      }
    });
  };

  const signIn = () => {
    setSign(true);
  };
  return (
    <>
      <Container>
        {sign ? <SignPage /> : null}
        <div className="title">입짱~</div>
        <div className="nameBox">
          <div>id :</div>
          <input
            type="text"
            onChange={(event) => nameChange(event)}
            value={name}
            className="nameInput"
          />
        </div>
        <div className="passBox">
          <div>pw :</div>
          <input
            type="password"
            onChange={(event) => passChange(event)}
            value={pass}
            className="passInput"
          />
        </div>
        {!message && (
          <div className="message">아이디와 비밀번호를 확인하세요.</div>
        )}
        <button onClick={loginApi} className="login">
          Login
        </button>
        <button onClick={signIn} className="sign">
          회원 가입
        </button>
      </Container>
      <LoginBackground></LoginBackground>
    </>
  );
}

const Container = styled.div`
  position: absolute;
  z-index: 10000;
  width: 30vw;
  height: 50vh;
  background-color: gray;
  background: linear-gradient(0deg, #ffffff 0%, #b8b8b8 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

  > div {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
  }

  > .title {
    position: absolute;
    top: 20%;
    font-size: 3rem;
    font-family: "Child";
    text-decoration: underline;
  }

  > .nameBox {
    width: 60%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;

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

  > .login {
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

  > .login:active {
    box-shadow: 0 0 #7f7f7f;
    background-color: #545454;
  }

  > .message {
    color: #e7423d;
    margin-top: 1rem;
    font-size: 0.5rem;
    font-weight: bold;
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

const LoginBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  position: absolute;
`;

import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState } from "recoil";
import SignPage from "./SignPage";
import { loginState, signInState } from "../../../../atom/atom";
import { QueryObserverResult, useQuery } from "react-query";

interface LoginUser {
  id: string;
  pass: string;
}

async function login() {
  const res = await axios.get("http://localhost:4000/login");
  return res;
}

export default function Login() {
  const [id, setId] = useState<string | number>("");
  const [pw, setPw] = useState<string | number>("");
  // input에 입력한 name, pass
  // api에서 data를 받아와 user확인
  const [loginValue, setLoginValue] = useRecoilState(loginState);
  // login 상태값 관리
  const [sign, setSign] = useRecoilState(signInState);
  // Sign 페이지 띄우기
  const [message, setMessage] = useState<boolean | undefined>(true);
  // 입력한 아이디와 비밀번호 확인해서 맞지 않을 시, 에러문구 표시하기
  const inputEls = ["id", "pw"];
  // 코드 간결화

  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  // 입력한 값으로 name 바꾸기
  const passChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };
  // 입력한 값으로 pass 바꾸기

  const { data, isLoading, isError, error } = useQuery("get", () => login(), {
    refetchOnWindowFocus: false,
  });
  // query 사용

  // login 버튼을 클릭 시 api에서 데이터를 받아와
  // recoil 상태값 변경
  const loginApi = () => {
    const matchedUser =
      data &&
      data.data.find((user: LoginUser) => user.id === id && user.pass === pw);
    if (matchedUser) {
      // 로그인 성공 처리
      setLoginValue(!loginValue);
      setMessage(true);
    } else {
      // 로그인 실패 처리
      setMessage(false);
    }
  };

  const signIn = () => {
    setSign(true);
  };
  // 회원가입 버튼 누르면 상태값을 바꿔서 회원가입 창 띄우기

  return (
    <>
      <Container>
        {sign ? <SignPage /> : null}
        <div className="title">입쨩~</div>
        {inputEls.map((el) => (
          <div className={`${el}Box`} key={el}>
            <div>{el} :</div>
            <input
              type="text"
              value={el === "id" ? id : pw}
              className={el === "id" ? "idInput" : "pwInput"}
              onChange={(event) =>
                el === "id" ? nameChange(event) : passChange(event)
              }
            ></input>
          </div>
        ))}
        {!message && (
          <div className="message">아이디와 비밀번호를 확인하세요.</div>
        )}
        {isError && (
          <div className="message">네트워크가 원할하지 않습니다.</div>
        )}
        {/* 데이터 통신 뒤에 떠오르는 것 해결 */}
        <LoginBtn onClick={loginApi} />
        <SignBtn onClick={signIn} />
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

  > .idBox {
    width: 60%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;

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

  > .message {
    color: #e7423d;
    margin-top: 1rem;
    font-size: 0.5rem;
    font-weight: bold;
  }
`;

const LoginBtn = styled.button`
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

  &:active {
    box-shadow: 0 0 #7f7f7f;
    background-color: #545454;
  }

  &::before {
    content: "login";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
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

const LoginBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  position: absolute;
`;

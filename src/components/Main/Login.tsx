import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginState, signInState } from "./../../atom/atom";
import SignPage from "./SignPage";

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
      console.log(matchedUser);
      if (matchedUser) {
        // 로그인 성공 처리
        console.log("로그인 성공");
        setLoginValue(!loginValue);
        console.log(loginValue);
      } else {
        // 로그인 실패 처리
        console.log("로그인 실패");
      }
    });
  };

  const signIn = () => {
    setSign(true);
  };
  return (
    <Container>
      {sign ? <SignPage /> : null}
      <div className="nameBox">
        <div>id :</div>
        <input
          type="text"
          onChange={(event) => nameChange(event)}
          value={name}
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
      <button onClick={loginApi}>Login</button>
      <button onClick={signIn}> 회원 가입</button>
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

  > .nameBox {
    width: 60%;
    display: flex;
    justify-content: space-between;
  }
  > .passBox {
    width: 60%;
    display: flex;
    justify-content: space-between;
  }

  > button {
    margin-top: 1rem;
  }
`;

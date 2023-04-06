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
      <button onClick={signApi}>sign in</button>
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

import styled from "styled-components";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { nameInput } from "./../atom/atom";
import NameInput from "./NameInput";

export default function Main() {
  const [name, setName] = useState(false);
  // type을 지정해줘야 할 필요가 있을까

  // const onChange = () => {
  //   setName()
  // }

  return (
    <Container>
      <NameInput />
      <div className="offer">~청소기 좀 돌릴래?</div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

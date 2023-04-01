import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { roomState } from "../../atom/atom";

export default function Structure() {
  const roomClean = useRecoilValue(roomState);
  const keyName = ["엄마방", "아빠방", "내방", "누나방", "거실"];

  return (
    <Container>
      {roomClean.map((room) =>
        keyName.map((name) => (
          <div key={name}>
            {name}: {room[name]}
          </div>
        ))
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 60%;
  height: 100%;
  background-color: white;
`;

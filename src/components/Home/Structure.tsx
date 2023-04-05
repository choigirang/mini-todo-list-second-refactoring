import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { roomState } from "../../atom/atom";

export default function Structure() {
  const roomClean = useRecoilValue(roomState);
  const keyName = ["엄마방", "아빠방", "내방", "누나방", "거실"];

  return (
    <Container>
      {keyName.map((name) => (
        <div
          key={name}
          className={
            name === "엄마방"
              ? "momRoom"
              : name === "아빠방"
              ? "dadRoom"
              : name === "내방"
              ? "myRoom"
              : name === "누나방"
              ? "sisRoom"
              : name === "거실"
              ? "livRoom"
              : ""
          }
        >
          {name}: {roomClean.find((room) => room[name])?.[name]}
          {/* <img
            src={`./images/${
              name === "엄마방"
                ? "roomMom"
                : name === "아빠방"
                ? "roomDad"
                : name === "내방"
                ? "roomMy"
                : name === "누나방"
                ? "roomSis"
                : name === "거실"
                ? ""
                : ""
            }.png`}
          ></img> */}
        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 60%;
  height: 100%;
  background-color: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 1%;
  grid-template-areas:
    "a b c"
    "d e e"
    "g e e";

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  > .momRoom {
    grid-row: 1/3;
    grid-column: 1/3;
    border: solid 1px black;
    grid-area: a;
  }

  > .dadRoom {
    grid-row: 1/3;
    grid-column: 1/3;
    border: solid 1px black;
    grid-area: b;
  }

  > .myRoom {
    grid-row: 2/3;
    border: solid 1px black;
    grid-column: 1/2;
    grid-area: d;
  }

  > .sisRoom {
    grid-area: g;
  }

  > .livRoom {
    grid-row: 2/4;
    grid-column: 2/4;
    grid-area: e;
    background-color: yellow;
  }
`;

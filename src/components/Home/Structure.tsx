import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { roomState } from "../../atom/atom";
import axios from "axios";

interface Room {
  [key: string]: {
    className: string;
    imgName: string;
  };
}

interface Clean {
  room: string;
  clean: number;
}

export default function Structure() {
  // const roomClean = useRecoilValue(roomState);
  // const keyName = ["엄마방", "아빠방", "내방", "누나방", "거실"];
  // 객체로 관리하면 한 줄로 가능, 객체 key
  const [cleanData, setCleanData] = useState<Clean[]>([]);

  const roomInfo: Record<string, { className: string; imgName: string }> = {
    엄마방: {
      className: "momRoom",
      imgName: "roomMom",
    },
    아빠방: {
      className: "dadRoom",
      imgName: "roomDad",
    },
    내방: {
      className: "myRoom",
      imgName: "roomMy",
    },
    누나방: {
      className: "sisRoom",
      imgName: "roomSis",
    },
    거실: {
      className: "livRoom",
      imgName: "",
    },
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/clean")
      .then((res) => {
        setCleanData(res.data);
      })
      .catch((err) => console.error(err));
  }, [cleanData]);

  return (
    <Container>
      {cleanData.map((data) => {
        const { room, clean } = data;
        const { className, imgName } = roomInfo[room];
        return (
          <div key={room} className={className}>
            {room} : {clean}
            <img src={`./images/${imgName}.png`} alt={room}></img>
          </div>
        );
      })}
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
    > img {
      width: 100px;
    }
  }

  > .momRoom {
    position: relative;
    grid-row: 1/3;
    grid-column: 1/3;
    border: dotted 1px black;
    grid-area: a;
  }

  > .dadRoom {
    grid-row: 1/3;
    grid-column: 1/3;
    border: dotted 1px black;
    grid-area: b;
  }

  > .myRoom {
    grid-row: 2/3;
    border: dotted 1px black;
    grid-column: 1/2;
    grid-area: d;
  }

  > .sisRoom {
    border: dotted 1px black;
    grid-area: g;
  }

  > .livRoom {
    grid-row: 2/4;
    grid-column: 2/4;
    border: dotted 1px black;
    grid-area: e;
  }
`;

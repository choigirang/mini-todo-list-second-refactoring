import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { updateCleanState } from "../../atom/atom";
import axios from "axios";

interface Clean {
  room: string;
  clean: number;
}

export default function Structure() {
  const [cleanData, setCleanData] = useState<Clean[]>([]);
  // 청소 상태 퍼센테이지 받아오기
  const [updateClean, setUpdateClean] = useRecoilState(updateCleanState);
  // AddTodo를 열거나 input을 클릭 시 청소 상태 업데이트 시키기

  const roomInfo: Record<
    string,
    { className: string; imgName: string; okImg: string }
  > = {
    엄마방: {
      className: "momRoom",
      imgName: "roomMom",
      okImg: "stampMom",
    },
    아빠방: {
      className: "dadRoom",
      imgName: "roomDad",
      okImg: "stampDad",
    },
    내방: {
      className: "myRoom",
      imgName: "roomMy",
      okImg: "stampSon",
    },
    누나방: {
      className: "sisRoom",
      imgName: "roomSis",
      okImg: "stampSis",
    },
    거실: {
      className: "livRoom",
      imgName: "",
      okImg: "1",
    },
  };
  // 리터럴로 mom만 보내기 한 줄로 줄이기

  useEffect(() => {
    axios
      .get("http://localhost:4000/clean")
      .then((res) => {
        setCleanData(res.data);
        returnCleanState();
      })
      .catch((err) => console.error(err));
  }, [updateClean]);
  // 의존성, 무한 => 수정필
  // 다른 상태를 하나 더 파서 관리(고심하자...)

  const returnCleanState = () => {
    setUpdateClean(0);
  };
  // cleanData가 업데이트 될 때를 useEffect를 사용하면
  // 무한 루프가 발생
  // input을 체크하면 recoil 전역 상태가 바뀌고
  // 전역 상태를 받아와, 상태가 변경되면 리렌더링되도록
  // 전역 상태는 다시 초기값으로 설정

  return (
    <Container>
      {cleanData.map((data) => {
        const { room, clean } = data;
        const { className, imgName, okImg } = roomInfo[room];
        return (
          <div key={room} className={className}>
            {room} : {clean}
            {room !== "거실" && (
              <img
                src={
                  clean === 100
                    ? `./images/${okImg}.png`
                    : `./images/${imgName}.png`
                }
                alt={room}
              ></img>
            )}
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
      width: 60%;
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

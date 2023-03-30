import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { itemState, penAlterState } from "../../atom/atom";

type Tool = {
  [key: string]: number | string;
};

interface TodoItem {
  id: number;
  room: string;
  tool: string;
}

export default function AddTodo(): JSX.Element {
  const rooms: string[] = [
    "방 선택",
    "엄마방",
    "아빠방",
    "내방",
    "누나방",
    "거실",
  ];
  const tools: Tool[] = [
    { 도구선택: "소요시간" },
    { 청소기돌리기: 3 },
    { 걸레질하기: 5 },
    { 빗자루질하기: 2 },
    { 몰래안하기: 0 },
  ];
  // select 옵션값들
  const setItems = useSetRecoilState(itemState);
  // todolist 전역 상태 추가를 위한 atom 불러오기
  const [penState, setPenState] = useRecoilState(penAlterState);
  // 제출하고 나면 모달창 닫기를 위한 penState 상태 변경
  const [room, setRoom] = useState("");
  // room option 선택 상태값
  const [tool, setTool] = useState("");
  // tool option 선택 상태값

  const AddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (room !== "" && tool != "") {
      setItems((prev: TodoItem[]) => [
        ...prev,
        {
          id: prev.length + 1,
          room,
          tool,
        },
      ]);
      setRoom("");
      setTool("");
      setPenState(!penState);
    }
  };
  // 선택한 옵션값을 받아 atom의 default에 추가

  return (
    <>
      <TodoPaper>
        <div className="top">
          <div className="title">나에 청소 수첩</div>
          <div onClick={() => setPenState(!penState)} className="closeBtn">
            X
          </div>
        </div>
        <form onSubmit={AddTodo}>
          <div>
            <span className="">어디를 청소하지?</span>
            <select
              className="roomSelect"
              onChange={(event) => setRoom(event.target.value)}
            >
              {rooms.map((room: string) => (
                <option key={`${room}`} value={`${room}`}>
                  {room}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>뭘로 청소하지?</span>
            <select
              className="toolSelect"
              onChange={(event) => setTool(event.target.value)}
            >
              {tools.map((tool: { [key: string]: number | string }) => (
                <option
                  key={`${Object.keys(tool)}`}
                  value={`${Object.keys(tool)}`}
                >
                  {`${Object.keys(tool)} ${Object.values(tool)}분`}
                </option>
              ))}
            </select>
          </div>
          <button>추가하기</button>
        </form>
      </TodoPaper>
      <Background />
    </>
  );
}

const TodoPaper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  max-width: 450px;
  min-width: 300px;
  height: 80vh;
  background: white;
  z-index: 1000;
  padding: 1%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;

  > .top {
    display: flex;
  }

  > .title {
    margin-top: 1rem;
    font-size: 2rem;
  }

  > form {
    display: flex;
    flex-direction: column;
  }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
`;

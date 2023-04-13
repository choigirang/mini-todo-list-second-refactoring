import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { penAlterState, selectNumState } from "../../../atom/atom";
import { useQuery } from "react-query/types/react";

type Tool = {
  [key: string]: number | string;
};

export default function AddTodo() {
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

  // todolist 전역 상태 추가를 위한 atom 불러오기
  const [penState, setPenState] = useRecoilState(penAlterState);
  // 제출하고 나면 모달창 닫기를 위한 penState 상태 변경
  const [room, setRoom] = useState("");
  // room option 선택 상태값
  const [tool, setTool] = useState("");
  // tool option 선택 상태값
  const [selectState, setSelectState] = useRecoilState(selectNumState);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();
    // AddTodo, 이미 작성된 요소를 선택 시,
    // 선택한 요소의 id 값을 저장하고,
    // 저장된 id 값이 있을 시 선택한 요소에 새로운 값으로 update
    if (selectState !== -1) {
      if (room !== "" && tool != "") {
        axios.post(`http://localhost:4000/todos`, {
          selectState,
          room,
          tool,
        });
        setRoom("");
        setTool("");
        setPenState(!penState);
      }
      setSelectState(-1);
      return;
    }

    if (room !== "" && tool != "") {
      axios.post(`http://localhost:4000/todos`, { room, tool });
      setRoom("");
      setTool("");
      setPenState(!penState);
    }
  };

  const closeModal = () => {
    setPenState(!penState);
    setSelectState(-1);
  };
  // 선택한 옵션값을 받아 atom의 default에 추가

  const {data} = useQuery("post")
  // 구조분해
  // useQuery

  return (
    <>
      <TodoPaper>
        <div className="top">
          <div className="title">나에 청소 수첩</div>
          <div
            onClick={() => {
              setPenState(!penState);
              setSelectState(-1);
            }}
            className="closeBtn"
          >
            X
          </div>
        </div>
        <form onSubmit={addTodo}>
          <div className="selectBox">
            <span className="roomTitle">어디를 청소하지?</span>
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
          <div className="selectBox">
            <span className="toolTitle">뭘로 청소하지?</span>
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
          <button className="addBtn">추가하기</button>
        </form>
      </TodoPaper>
      <Background onClick={closeModal} />
    </>
  );
}

const TodoPaper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
  max-width: 450px;
  min-width: 300px;
  height: 60vh;
  z-index: 1000;
  padding: 1%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(0deg, #ffffff 0%, #b8b8b8 100%);
  overflow: hidden;
  border-radius: 1rem;

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

  > .top {
    display: flex;

    > .title {
      margin-top: 4rem;
      margin-bottom: 3rem;
      font-size: 2rem;
    }

    > .closeBtn {
      position: absolute;
      right: 5%;
    }
  }

  > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > .selectBox {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    > .addBtn {
      position: absolute;
      bottom: 20%;
      width: 7rem;
      height: 2rem;
      border-radius: 5px;
      box-shadow: 0px 4px #797d7e;
      background-color: #979896;
      border: none;
      color: white;
      font-family: "Child";
      font-size: 2rem;
    }

    > .addBtn:active {
      box-shadow: 0 0 #7f7f7f;
      background-color: #545454;
    }
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

import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { itemState, penAlterState, selectNumState } from "../../atom/atom";
import axios from "axios";

type Tool = {
  [key: string]: number | string;
};

// interface TodoItem {
//   id: number;
//   room: string;
//   tool: string;
// }

// JSX.element
// props로 children 들어갈 때
// 자식 요소를 공통으로 사용하는 경우에
// 페이지를 여러 개로 쓰게 되면, 재활용하게 됨
// children 타입을 정해줘야 한다.
// 부모쪽에서 해결하자
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

  // select 옵션값들
  const [items, setItems] = useRecoilState(itemState);
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
        // setItems((prev) => [
        //   ...prev.slice(0, idx),
        //   {
        //     id: selectState,
        //     room,
        //     tool,
        //   },
        //   ...prev.slice(idx + 1),
        // ]);
        // 리코일 상태 update

        // api update
        axios
          .post(`http://localhost:4000/todos`, {
            selectState,
            room,
            tool,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setRoom("");
        setTool("");
        setPenState(!penState);
      }
      setSelectState(-1);
      return;
    }

    if (room !== "" && tool != "") {
      // setItems((prev: TodoItem[]) => [
      //   ...prev,
      //   {
      //     id: prev.length + 1,
      //     room,
      //     tool,
      //   },
      // ]);
      axios
        .post(`http://localhost:4000/todos`, { room, tool })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
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
          <div>
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
          <div>
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
    > .title {
      margin-top: 1rem;
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

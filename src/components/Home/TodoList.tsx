import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import axios from "axios";
import {
  itemState,
  penAlterState,
  roomState,
  selectNumState,
} from "./../../atom/atom";

interface Todo {
  id: number;
  room: string;
  tool: string;
  checked: boolean;
}

export default function TodoList() {
  const [list, setList] = useRecoilState(itemState);
  // 저장된 todoList
  const [penState, setPenState] = useRecoilState(penAlterState);
  // AddTodo 컴포넌트 모달을 띄우기 위한 state
  const [selectState, setSelectState] = useRecoilState(selectNumState);
  // 클릭한 요소의 id 값 저장을 위한 상태값
  const [rooms, setRooms] = useRecoilState(roomState);
  // 클릭한 요소에 따라 퍼센테이지를 올려주기
  const [apiTodos, setApiTodos] = useState<Todo[]>();
  // api에서 받아온 data의 check 여부 확인 상태
  const [apiChecks, setApiChecks] = useState<Todo[]>([]);

  const apiCheck = apiChecks && apiChecks.map((check) => check.checked);

  useEffect(() => {
    axios
      .get("http://localhost:4000/todos")
      .then((res) => {
        setApiTodos(res.data);
        setApiChecks(res.data);
      })
      .catch((err) => console.log(err));
  }, [apiTodos, apiCheck]);
  // api에서 todoList 받아오기
  // 1. get으로 새로운 요청
  // 2. state에 바로 추가를 해준다.
  // 3. post에서 응답값을 업데이트 상태 넣기

  const deleteTodo = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent> | undefined,
    id: number
  ) => {
    event!.stopPropagation();
    // setList((prev) => prev.filter((item) => item.id !== id));
    // 리코일 상태값

    // api 작성
    axios
      .delete(`http://localhost:4000/todos/${id}`)
      .then((res) => {
        setApiTodos((prev) => prev?.filter((item) => item.id !== id));
      })
      .catch((err) => console.log(err));
  };
  // 클릭한 요소 삭제

  const updateTodo = (id: number) => {
    setPenState(!penState);
    setSelectState(id);
  };
  // 클릭한 요소 id 값 저장
  // 저장된 id 값이 있다면 AddTodo는
  // 클릭한 요소를 수정한 값으로 새롭게 재배열

  const increaseRoomState = async (id: number, room: string, tool: string) => {
    const idx = rooms.findIndex((idx) => room in idx);

    const { data } = await axios.get(`http://localhost:4000/todos/${id}`);
    const check = data.checked;

    // if (rooms.find((room) => room.room)?.[room] <= 100) return;

    if (check) return;
    // data를 받아와서 한 번 청소가 완료된 (checked가 true)
    // 방의 청소 퍼센테이지가 올라가지 않도록 한다.

    let roomIdx = 0;
    if (room === "엄마방") roomIdx = 0;
    if (room === "아빠방") roomIdx = 1;
    if (room === "누나방") roomIdx = 2;
    if (room === "내방") roomIdx = 3;
    if (room === "거실") roomIdx = 4;

    if (tool === "청소기돌리기") {
      // setRooms((prev) => [
      //   ...prev.slice(0, idx),
      //   { [room]: prev[idx][room] + 10 },
      //   ...prev.slice(idx + 1),
      // ]);
      // recoil
      const num = 10;
      axios
        .patch(`http://localhost:4000/clean`, { roomIdx, room, num })
        .then((res) => {
          console.log(res.data);
        });
    }
    if (tool === "몰래안하기") {
      // setRooms((prev) => [
      //   ...prev.slice(0, idx),
      //   { [room]: prev[idx][room] },
      //   ...prev.slice(idx + 1),
      // ]);
      // 리코일

      const num = 0;
      axios
        .patch(`http://localhost:4000/clean`, { roomIdx, room, num })
        .then((res) => {
          console.log(res.data);
        });
    }
    if (tool === "빗자루질하기") {
      // setRooms((prev) => [
      //   ...prev.slice(0, idx),
      //   { [room]: prev[idx][room] + 10 },
      //   ...prev.slice(idx + 1),
      // ]);

      const num = 5;
      axios
        .patch(`http://localhost:4000/clean`, { roomIdx, room, num })
        .then((res) => {
          console.log(res.data);
        });
    }
    if (tool === "걸레질하기") {
      // setRooms((prev) => [
      //   ...prev.slice(0, idx),
      //   { [room]: prev[idx][room] + 20 },
      //   ...prev.slice(idx + 1),
      // ]);

      const num = 20;
      axios
        .patch(`http://localhost:4000/clean`, { roomIdx, room, num })
        .then((res) => {
          console.log(res.data);
        });
    }
  };
  // 입력된 tool에 따라 청소 상태를 증가시키기 위한 함수

  const updateChecked = (id: number, room: string, tool: string) => {
    axios
      .patch(`http://localhost:4000/todos/${id}`, {
        id,
        room,
        tool,
      })
      .then((res) => {
        // true가 있으면 상태관리에 넣어준다.
        // 변경된 상태에 따라 input check disabled
        setApiChecks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // input checkBox의 check 여부에 따라 작동을 막기 위해
  // api data의 checked 설정

  // input의 check일 경우 disable

  return (
    <Container>
      {apiTodos &&
        apiTodos.map((item) => (
          <div key={item.id} onClick={() => updateTodo(item.id)}>
            <input
              type="checkBox"
              onClick={(event) => {
                event.stopPropagation();
                increaseRoomState(item.id, item.room, item.tool);
                updateChecked(item.id, item.room, item.tool);
              }}
              disabled={item.checked}
              // delete 구현하면 하나씩 빠짐
              // apiCheck의 순서대로 checked를 다시 확인해줘야함
            />
            <span>{item.room}</span>
            <span>{item.tool}</span>
            <span
              onClick={(event) => {
                deleteTodo(event, item.id);
              }}
            >
              X
            </span>
          </div>
        ))}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 35%;
  background-color: white;
  padding: 1%;
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    justify-content: space-around;
    height: 40px;
    align-items: center;

    > input {
      width: 15px;
      height: 15px;
      cursor: pointer;
    }

    > span {
      width: 20%;
      text-align: center;
      cursor: pointer;
    }
  }
`;

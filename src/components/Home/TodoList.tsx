import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import {
  penAlterState,
  selectNumState,
  updateCleanState,
} from "./../../atom/atom";

interface Todo {
  id: number;
  room: string;
  tool: string;
  checked: boolean;
}

interface Tool {
  [key: string]: number;
}

export default function TodoList() {
  const [penState, setPenState] = useRecoilState(penAlterState);
  // AddTodo 컴포넌트 모달을 띄우기 위한 state
  const setSelectState = useSetRecoilState(selectNumState);
  // 클릭한 요소의 id 값 저장을 위한 상태값
  const [apiTodos, setApiTodos] = useState<Todo[]>();
  // api에서 받아온 data의 check 여부 확인 상태
  const [apiChecks, setApiChecks] = useState<Todo[]>([]);

  const updateClean = useSetRecoilState(updateCleanState);
  // 무한루프 해결 및 상태값 변경되는대로 structure의 값이 자동적으로
  // 업데이트 시키기 위해

  useEffect(() => {
    axios
      .get("http://localhost:4000/todos")
      .then((res) => {
        setApiTodos(res.data);
        setApiChecks(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [penState]);
  // api에서 todoList 받아오기
  // 1. get으로 새로운 요청
  // 2. state에 바로 추가를 해준다.
  // 3. post에서 응답값을 업데이트 상태 넣기

  // 의존성 배열에는 penState가 열리고 닫힐 때마다
  // 배열에 추가되는 것이기 때문에

  const deleteTodo = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent> | undefined,
    id: number
  ) => {
    event!.stopPropagation();
    axios.delete(`http://localhost:4000/todos/${id}`);
    setApiTodos((prev) => prev?.filter((item) => item.id !== id));
  };
  // 클릭한 요소 삭제

  const updateTodo = (id: number) => {
    setPenState(!penState);
    setSelectState(id);
  };
  // 클릭한 요소 id 값 저장
  // 저장된 id 값이 있다면 AddTodo는
  // 클릭한 요소를 수정한 값으로 새롭게 재배열

  // patch를 위해 다시 get을 하고 있음
  // 불필요한 요청은 최소화
  // 클라이언트에 있는 데이터를 가지고 사용
  const increaseRoomState = async (id: number, room: string, tool: string) => {
    const { data } = await axios.get(`http://localhost:4000/todos/${id}`);
    const check = data.checked;

    updateClean((pre) => pre + 1);

    if (check) return;

    const roomIdx = (() => {
      switch (room) {
        case "엄마방":
          return 0;
        case "아빠방":
          return 1;
        case "누나방":
          return 2;
        case "내방":
          return 3;
        case "거실":
          return 4;
        default:
          return 0;
      }
    })();
    // 함수를 즉시 실행시키고 roomIdx에 할당을 위한 빈괄호 사용

    const toolNums: Tool = {
      청소기돌리기: 10,
      몰래안하기: 0,
      빗자루질하기: 5,
      걸레질하기: 20,
    };

    const num = toolNums[tool];
    axios.patch(`http://localhost:4000/clean`, { roomIdx, room, num });
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
                setApiChecks(apiChecks.slice());
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
                setApiChecks(apiChecks.slice());
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
  overflow: scroll;

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

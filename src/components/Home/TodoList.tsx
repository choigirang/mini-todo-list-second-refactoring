import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { itemState, penAlterState, selectNumState } from "./../../atom/atom";

export default function TodoList() {
  const [list, setList] = useRecoilState(itemState);
  const [penState, setPenState] = useRecoilState(penAlterState);
  const [selectState, setSelectState] = useRecoilState(selectNumState);

  // useNavigate 주소값을 적어주지 않고
  // 안에도 state를 설정할 수 있다.
  // 리렌더링은 안된다.
  // state값은 원하는 곳으로 전달할 수 있다 uselocation
  // 전달받은 state값을 모달에 default value인 걸로

  // 클릭했을 때 modal에 select로 전달
  // key값에 전달돼서
  const deleteTodo = (id: number) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTodo = (id: number) => {
    setPenState(!penState);
    setSelectState(id);
    console.log(id)
  };

  return (
    <Container>
      {list.map((item) => (
        <div key={item.id}>
          <span onClick={() => updateTodo(item.id)}>{item.room}</span>
          <span>{item.tool}</span>
          <span onClick={() => deleteTodo(item.id)}>X</span>
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
  }
`;

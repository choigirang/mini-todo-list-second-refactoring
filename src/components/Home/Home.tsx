import Structure from "./Structure";
import TodoList from "./TodoList";
import styled from "styled-components";
import InsertBtn from "./Button/InsertBtn";

export default function Home() {
  return (
    <Container>
      <Template>
        <TodoList />
        <Structure />
      </Template>
      <InsertBtn />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Template = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  min-width: 500px;
  height: 65%;
  background-color: #dddddd;
  box-shadow: 0rem 0rem 2rem 0rem #4c4c4c;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1%;
`;

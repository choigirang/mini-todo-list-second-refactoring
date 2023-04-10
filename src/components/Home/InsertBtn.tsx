import { useRecoilState } from "recoil";
import { penAlterState, stopAlterState } from "./../../atom/atom";
import styled from "styled-components";
import AddTodo from "./AddTodo";
import StopBrowser from "./StopBrowser";

export default function InsertBtn() {
  const images = ["pen", "stopBtn"];
  const [penState, setPenState] = useRecoilState(penAlterState);
  // pen 상태에 따라 todoInsert 창 열기
  const [stopState, setStopState] = useRecoilState(stopAlterState);
  // stop 상태에 따라 진실의 방 창 열기

  const changeAtoms = (image: string) => {
    if (image === "pen" && penState !== stopState) setPenState(!penState);
    if (image === "stopBtn" && penState !== stopState) setStopState(!stopState);
    console.log("stopState", stopState);
    console.log("penState", penState);
  };

  return (
    <Container>
      {images.map((image) => {
        return (
          <img
            key={`${image}`}
            src={`./images/${image}.png`}
            alt={`${image}Img`}
            onClick={() => changeAtoms(image)}
          ></img>
        );
      })}
      {penState && <AddTodo />}
      {!stopState && <StopBrowser />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 1rem;
  bottom: 1rem;

  > img {
    width: 8rem;
    height: 8rem;
    cursor: pointer;
    &:hover {
      transform: rotate(10deg);
    }
  }
`;

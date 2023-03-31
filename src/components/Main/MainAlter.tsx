import styled from "styled-components";
import { useRecoilState } from "recoil";
import { rejectAlterState } from "../../atom/atom";

export default function MainAlter() {
  const images: string[] = ["againBtn", "alter"];
  // Main에서 청소 묻는 btn image
  const [rejcetModal, setRejectModal] = useRecoilState(rejectAlterState);
  // 거절 버튼 눌렀을 시, 알림창 오픈을 위한 상태값 변경

  const turnAlterState = () => {
    setRejectModal(!rejcetModal);
  };
  // 알림창 오픈을 위한 상태값 변경 함수

  const handleClick = (image: string) => {
    if (image === "againBtn") turnAlterState();
  };
  // 입력받은 image가 거절일 경우, 알림창 상태값 변경 함수 작동

  return (
    <Container>
      {images.map((image) => {
        return (
          <img
            src={`./images/${image}.png`}
            alt={`${image}Img`}
            className={`${image}Img`}
            onClick={() => handleClick(image)}
            key={image}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 100;

  > .againBtnImg {
    width: 10rem;
    position: absolute;
    bottom: 0;
    bottom: 15%;
    cursor: pointer;
    z-index: 1000;

    &:hover {
      transform: rotate(10deg);
    }

    @media screen and (max-width: 1200px) {
      width: 9rem;
    }

    @media screen and (max-width: 768px) {
      width: 8rem;
    }
  }

  > .alterImg {
    width: 70%;
  }
`;

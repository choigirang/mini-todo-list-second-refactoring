import styled from "styled-components";
import { useRecoilState } from "recoil";
import { stopAlterState } from "../../atom/atom";

export default function StopBrowser() {
  const [stopAlter, setStopAlter] = useRecoilState(stopAlterState);
  // 그말할까 모달창 띄우고 닫아줄 상태값

  const closeModal = () => {
    setStopAlter(!stopAlter);
  };
  // modal 창 닫아주기

  const closeWindow = () => {
    window.location.href = "http://localhost:3000/";
  };
  // 처음으로 이동

  return (
    <>
      <Container>
        <div className="title">진짜 그만할까?</div>
        <div className="btnBox">
          <button onClick={closeWindow} className="yesBtn">
            내..
          </button>
          <button onClick={closeModal} className="noBtn">
            아니오
          </button>
        </div>
      </Container>
      <Background className="background" onClick={closeModal}></Background>
    </>
  );
}

const Container = styled.div`
  position: fixed;
  z-index: 10000;
  width: 30vw;
  height: 50vh;
  background-color: gray;
  background: linear-gradient(0deg, #ffffff 0%, #b8b8b8 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
  overflow: hidden;
  color: white;

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

  @media screen and (max-width: 1200px) {
    width: 25vw;
    min-width: 350px;
    font-size: 1rem;
  }

  @media screen and (max-width: 768px) {
    width: 20vw;
    min-width: 300px;
    font-size: 1rem;
  }

  > .title {
    font-size: 2rem;
    position: absolute;
    top: 30%;
  }

  > .btnBox {
    position: absolute;
    bottom: 30%;
    display: flex;
    flex-direction: row;

    > .yesBtn {
      width: 5rem;
      height: 1.5rem;
      border-radius: 5px;
      box-shadow: 0px 4px #797d7e;
      background-color: #979896;
      border: none;
      color: white;
      font-family: "Child";
      cursor: pointer;
    }

    > .yesBtn:active {
      box-shadow: 0 0 #7f7f7f;
      background-color: #545454;
    }

    > .noBtn {
      width: 5rem;
      height: 1.5rem;
      border-radius: 5px;
      box-shadow: 0px 4px #797d7e;
      background-color: #979896;
      border: none;
      color: white;
      font-family: "Child";
      margin-left: 1rem;
      cursor: pointer;
    }

    > .noBtn:active {
      box-shadow: 0 0 #7f7f7f;
      background-color: #545454;
    }
  }
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

import styled from "styled-components";
import { useRecoilState } from "recoil";
import { tippingName, nameInputState } from "../../atom/atom";
import { useState } from "react";

export default function NameInput() {
  const [, setName] = useRecoilState(tippingName);
  // 작성한 이름을 전역 상태로 띄우기
  const [nameModal, setNameModal] = useRecoilState(nameInputState);
  // 모달창을 사라지게 할 상태값
  const [nameValue, setNameValue] = useState("");
  // 입력한 input의 value로 RecoilState를 변경하기 위한 상태값
  const [answerName, setAnswerName] = useState(true);
  // 이름 입력이 확인 상태
  const name = /^[가-힣]*$/;
  // 이름 입력 정규표현식

  const nameSubmit = (e) => {
    e.preventDefault();
    if (!name.test(nameValue)) {
      setAnswerName(false);
      console.log(answerName);
      return;
    }
    setName(nameValue);
    setNameModal(!nameModal);
  };
  // 제출 버튼 클릭 시, 입력한 value로 전역 상태를 바꾸고 알림창을 닫는 함수

  const nameInput = (e) => {
    setNameValue(e.target.value);
  };
  // 입력한 이름으로 상태값 바꿔주는 함수

  return (
    <InputContainer>
      <h2>이름을 입력하새오</h2>
      <form onSubmit={nameSubmit}>
        <input type="text" value={nameValue} onChange={nameInput} />
        <button type="submit" className="submitBtn">
          제출하기
        </button>
        {!answerName && <div className="answerName">이름이 이상하지?</div>}
      </form>
    </InputContainer>
  );
}
const InputContainer = styled.div`
  position: absolute;
  z-index: 100;
  width: 30vw;
  height: 50vh;
  color: white;
  background: linear-gradient(0deg, #ffffff 0%, #b8b8b8 100%);
  box-shadow: -5px -5px 20px 5px white, 2px 2px 20px 2px black;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  animation: vibrate 0.1s infinite;
  border-radius: 1rem;
  overflow: hidden;

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
  }

  @media screen and (max-width: 768px) {
    width: 20vw;
    min-width: 300px;
  }

  @keyframes vibrate {
    from {
      transform: rotate(0.3deg);
    }
    to {
      transform: rotate(-0.3deg);
    }
  }

  > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > input {
      background: linear-gradient(-45deg, #ffd7ca, #ffc8dd, #c0eeff, #dbfff7);
      background-size: 400% 400%;
      height: 1.5rem;
      animation: AnimationName 15s ease infinite;

      @keyframes AnimationName {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    }

    > .submitBtn {
      width: 5rem;
      height: 1.5rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      border-radius: 5px;
      box-shadow: 0px 4px #b7bbbc;
      background-color: #b3b5b0;
      border: none;
      color: white;
      font-family: "Child";
    }

    > .answerName {
      font-size: 1.5rem;
      color: #e93f80;
    }
  }
`;

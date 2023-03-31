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

  const nameSubmit = (e) => {
    e.preventDefault();
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
        <button type="submit">제출하기</button>
      </form>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  position: absolute;
  width: 30vw;
  height: 50vh;
  background-color: gray;
  color: white;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  transform: translate(-50%, -50%);
  animation: vibrate 0.1s infinite;

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

  > input {
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
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

  > button {
    margin-top: 1rem;
  }
`;

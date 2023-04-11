import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  tippingName,
  nameInputState,
  rejectAlterState,
  successLoginState,
  loginState,
} from "../../atom/atom";
import NameInput from "./Modal/NameInput";
import MainAlter from "./Modal/MainAlter";
import AnswerBtn from "./AnswerBtn";
import SuccessLogin from "./Modal/LoginModal/SuccessLogin";
import Login from "./Modal/LoginModal/Login";

export default function Main() {
  const [name] = useRecoilState(tippingName);
  // name모달에서 입력한 이름으로 나타내기
  const [nameModal] = useRecoilState(nameInputState);
  // 이름 입력과 제출이 완료되면 상태값 바꾸기
  const [rejectModal] = useRecoilState(rejectAlterState);
  // 거절 버튼에 따른 이미지 모달 상태값
  const loginValue = useRecoilValue(loginState);
  const successLogin = useRecoilValue(successLoginState);

  return (
    <Container>
      {!successLogin && <SuccessLogin />}
      {!loginValue && <Login />}
      {!nameModal && <NameInput />}
      {!rejectModal && <MainAlter />}
      <div className="offer">{name}~ 청소기 좀 돌릴래?</div>
      <AnswerBtn />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 1;

  > .offer {
    font-size: 5rem;
    margin-bottom: 1rem;

    @media screen and (max-width: 1200px) {
      font-size: 3rem;
    }

    @media screen and (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

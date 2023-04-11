import styled from "styled-components";
import { useRecoilState } from "recoil";
import { rejectAlterState } from "../../atom/atom";
import { Link } from "react-router-dom";

export default function AnswerBtn() {
  const [reject, setReject] = useRecoilState(rejectAlterState);
  // Main 거절 btn 클릭 시, 나오는 알림창에서 알림창 닫기 btn

  const alterChange = () => {
    setReject(!reject);
  };
  // 알림창에서 거절 버튼 noBtn 클릭 시 상태를 변경시켜 알림창 닫기

  return (
    <Container>
      <Link to="/Home">
        <img src="./images/okBtn.png" alt="okBtn"></img>
      </Link>
      <img
        src="./images/noBtn.png"
        alt="noBtn"
        onClick={() => alterChange()}
      ></img>
    </Container>
  );
}

const Container = styled.div`
  display: flex;

  > a > img {
    width: 10rem;
    cursor: pointer;
    &:hover {
      transform: rotate(10deg);
    }
  }

  > img {
    width: 10rem;
    cursor: pointer;
    &:hover {
      transform: rotate(10deg);
    }
  }
`;

import styled from "styled-components";

export default function NameInput() {
  return (
    <InputContainer>
      <h2>이름을 입력하세요</h2>
      <input
        type="text"
        value="name"
        placeholder="청소를 하러 갈 사람은 누구?"
      />
    </InputContainer>
  );
}

const InputContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50vw;
  height: 50vh;
  background-color: gray;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

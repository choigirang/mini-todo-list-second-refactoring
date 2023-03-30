import styled from "styled-components";

export default function Background() {
  const images: string[] = ["sunFace", "sun", "family", "house"];
  // 배경 이미지 뿌리기

  return (
    <ImgContainer>
      {images.map((image) => {
        return (
          <img
            key={image}
            src={`./images/${image}.png`}
            className={`${image}Img`}
            alt={`${image}Img`}
          ></img>
        );
      })}
    </ImgContainer>
  );
}

const ImgContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -100;

  > .sunFaceImg {
    position: absolute;
    left: 5rem;
    top: 4rem;
    width: 15rem;

    @media screen and (max-width: 1200px) {
      left: 4rem;
      top: 3rem;
      width: 11rem;
    }

    @media screen and (max-width: 768px) {
      left: 3rem;
      top: 2rem;
      width: 6rem;
    }
  }

  > .sunImg {
    position: absolute;
    width: 25rem;
    z-index: -1;
    animation: roll 8s infinite ease-in;

    @media screen and (max-width: 1200px) {
      width: 19rem;
    }

    @media screen and (max-width: 768px) {
      width: 12rem;
    }

    @keyframes roll {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(360deg);
        scale: 0.5;
      }
      100% {
        transform: rotate(0deg);
      }
    }
  }

  > .familyImg {
    position: absolute;
    left: 2rem;
    bottom: 4rem;
    width: 40rem;
    z-index: -100;

    @media screen and (max-width: 1200px) {
      left: 1rem;
      bottom: 3rem;
      width: 35rem;
    }

    @media screen and (max-width: 768px) {
      left: 0.5rem;
      bottom: 2rem;
      width: 30rem;
    }
  }

  > .houseImg {
    position: absolute;
    right: 2rem;
    top: 7rem;
    width: 30rem;
    z-index: -100;

    @media screen and (max-width: 1200px) {
      right: 1rem;
      top: 3rem;
      width: 28rem;
    }

    @media screen and (max-width: 768px) {
      top: 2rem;
      width: 20rem;
    }
  }
`;

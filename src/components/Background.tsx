import styled from "styled-components";

export default function Background() {
  interface Image {
    src: string;
    alt: string;
    className: string;
  }

  const images: Image[] = [
    { src: "./images/sunFace.png", className: "sunFaceImg", alt: "sunFaceImg" },
    { src: "./images/sun.png", className: "sunImg", alt: "sunImg" },
    { src: "./images/family.png", className: "familyImg", alt: "familyImg" },
    { src: "./images/house.png", className: "houseImg", alt: "houseImg" },
  ];

  return (
    <ImgContainer>
      {images.map((image) => {
        return (
          <img
            key={image.alt}
            src={image.src}
            className={image.className}
            alt={image.alt}
          ></img>
        );
      })}
    </ImgContainer>
  );
}

const ImgContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

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
    z-index: -1;

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
    width: 35rem;

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

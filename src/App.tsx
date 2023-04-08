import React, { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import Background from "./components/Background";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function App() {
  const Main = React.lazy(() => import("./components/Main/Main"));
  const Home = React.lazy(() => import("./components/Home/Home"));

  // const navigate = useNavigate();
  // const goBack = () => {
  //   navigate(-1);
  // };
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        {/* fallback 설정 */}

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
        {/* <BackIcon icon={faArrowLeft} className="back" /> */}
        {/* onClick={goBack} */}
        {/* BackIcon은 Route안에 있어야 함 */}
      </Suspense>
      <Background />
    </div>
  );
}

export default App;

const BackIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 5%;
  top: 5%;
  color: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  font-size: 3rem;
  cursor: pointer;
`;

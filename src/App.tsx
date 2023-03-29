import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import Background from "./components/Background";

function App() {
  const Main = React.lazy(() => import("./components/Main"));
  const Home = React.lazy(() => import("./components/Home"));
  // 굳이 안적어도 부모에서 알아서 import 대기

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/Home" element={<Home />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Background />
    </div>
  );
}

export default App;

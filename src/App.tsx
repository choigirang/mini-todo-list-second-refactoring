import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Background from "./components/Background";

function App() {
  const Main = React.lazy(() => import("./components/Main/Main"));
  const Home = React.lazy(() => import("./components/Home/Home"));

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Suspense>
      <Background />
    </div>
  );
}

export default App;

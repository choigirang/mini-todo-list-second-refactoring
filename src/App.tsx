import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Background from "./components/Background";
import { QueryClient, QueryClientProvider } from "react-query";
// 자식 컴포넌트에서 쿼리를 사용하기 위해 최상단에 클라이언트 생성
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
// 클라이언트가 가지고 있는 캐시와 기본 옵션을
// 자식 컴포넌트에서도 사용가능

// JSX.element
// props로 children 들어갈 때
// 자식 요소를 공통으로 사용하는 경우에
// 페이지를 여러 개로 쓰게 되면, 재활용하게 됨
// children 타입을 정해줘야 한다.
// 부모쪽에서 해결하자
function App() {
  const Main = React.lazy(() => import("./components/Main/Main"));
  const Home = React.lazy(() => import("./components/Home/Home"));

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </Suspense>
        <Background />
      </div>
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  );
  // QueryClientProvider로 감싼 자식 컴포넌트들은 모두 React Query 훅을 사용할 수 있다.
  // client prop은 필수값
}

export default App;

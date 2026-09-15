import { Route, Routes } from 'react-router-dom'
import { PostList } from './pages/PostList'
import { PostDetail } from './pages/PostDetail'

/**
 * Session 2 ③ React Router: "/posts/:id"처럼 콜론이 붙은 부분이 동적 라우트다.
 * <Route path="주소" element={보여줄 컴포넌트} />로 "이 주소로 들어오면 이 컴포넌트를
 * 보여줘라"를 등록해둔다. BrowserRouter는 main.tsx에서 감싸고 있다.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:postId" element={<PostDetail />} />
    </Routes>
  )
}

export default App

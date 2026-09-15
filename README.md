# react_study-client-web

React 4주 챌린지 2주차 제출물입니다. 1주차 정적 UI에 컴포넌트/State/이벤트/라우팅을
붙여서 실제로 클릭하고 입력할 수 있는 화면으로 완성했습니다.

## 스택

1주차와 동일 + **React Router** (`/`, `/posts/:postId`)

## 실행 방법

```bash
npm install
npm run dev
```

## 이번 주 범위

**필수 과제**: 1주차 정적 UI에 인터랙션 붙이기 (좋아요/북마크 토글, 댓글 입력 후 목록에
추가, 카드 클릭 시 상세 페이지 이동).

서버 연동은 3주차 범위라, 아직 [src/data/posts.ts](src/data/posts.ts)의 mock 데이터를 씁니다.

| 파일 | 역할 |
|---|---|
| [src/pages/PostList.tsx](src/pages/PostList.tsx) | 피드 목록 화면 - mock 배열을 `.map()` + `<Link>`로 렌더링 |
| [src/pages/PostDetail.tsx](src/pages/PostDetail.tsx) | 상세 화면 - `useParams()`로 id를 받아 mock 배열에서 `.find()` |
| [src/components/PostCard.tsx](src/components/PostCard.tsx) | 좋아요/북마크 상태를 자기 `useState`로 관리 |
| [src/components/BookmarkButton.tsx](src/components/BookmarkButton.tsx) | State는 부모(PostCard)가, 이 컴포넌트는 Props로만 그림 |
| [src/components/CommentSection.tsx](src/components/CommentSection.tsx) | 입력창(Controlled Component) + 댓글 목록을 자기 State로 관리 |

## 알려진 한계 (3주차에서 해결)

상세 페이지의 "댓글 N" 표시는 `CommentSection`이 실제로 몇 개를 렌더링하는지와
무관한 mock 데이터의 고정값입니다. 댓글을 새로 등록해도 이 숫자는 바뀌지 않습니다.
실제로 동기화하려면 댓글 State를 `CommentSection`이 아니라 `PostDetail`이 가져야 하는데,
이게 3주차에 할 **State 끌어올리기**입니다.

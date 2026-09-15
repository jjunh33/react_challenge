# react_study-client-web

React 4주 챌린지 커리큘럼(Session 1~2)의 스택·구조·컴포넌트 이름을 그대로 따라 구현된 프론트엔드입니다.

## 스택

- Vite + React + **TypeScript** (Session 1 - `react-ts` 템플릿)
- **Tailwind CSS v4** - `tailwind.config.js` 없이 [src/index.css](src/index.css)의 `@theme` 블록에
  Figma 디자인 토큰을 등록해서 사용 (Session 1 - "CSS-first 설정 방식")
- **ESLint + Prettier** - `eslint.config.js` 맨 마지막에 `eslint-config-prettier`를 얹어서
  포맷(Prettier)과 코드 품질 검사(ESLint) 역할을 분리 (Session 1)
- React Router (`/`, `/posts/:postId`) (Session 2 - 라우팅)
- 실제 백엔드(`react_study-server`) 연동 (3주차 범위, 이미 구현됨)

## 실행 방법

```bash
npm install
npm run dev
```

백엔드(`react_study-server`)를 먼저 켜둬야 목록/상세 화면이 정상적으로 뜹니다.
API 주소는 `.env.local`의 `VITE_API_BASE_URL`로 설정합니다 (기본값 `http://localhost:8080`).

```bash
npm run lint    # ESLint
npm run build   # tsc -b && vite build
```

## 컴포넌트 구조 - 커리큘럼(Session 2 ②, ⑪)과 동일하게 맞춤

| 파일 | 역할 |
|---|---|
| [pages/PostList.tsx](src/pages/PostList.tsx) | 피드 목록 화면 (커리큘럼 파일명 그대로) |
| [pages/PostDetail.tsx](src/pages/PostDetail.tsx) | 게시글 상세 화면 (커리큘럼 파일명 그대로) |
| [components/FeedHeader.tsx](src/components/FeedHeader.tsx) | 제목 + 검색 + 글쓰기 + 카테고리 칩 (칩은 커리큘럼처럼 인라인으로 반복 렌더링) |
| [components/PostCard.tsx](src/components/PostCard.tsx) | 게시글 카드 (좋아요/댓글 pill도 커리큘럼처럼 인라인) |
| [components/BookmarkButton.tsx](src/components/BookmarkButton.tsx) | 좋아요와 달리 커리큘럼이 실제로 분리해서 만드는 컴포넌트 |
| [components/CommentSection.tsx](src/components/CommentSection.tsx) | 댓글 입력 + 목록을 한 컴포넌트로 (커리큘럼과 동일한 파일 구조) |

커리큘럼이 "오늘은 만들지 않았어요, 심화 과제로 남겨둡니다"라고 명시한 `CategoryTab`,
`CountPill` 같은 추가 분리는 하지 않고, 기본 구현 코드(Session 2 섹션 ⑪ "오늘 완성한
파일 모아보기")와 동일한 컴포넌트 경계를 그대로 따랐습니다.

## 커리큘럼 개념이 반영된 위치

각 파일 상단/내부 주석에 관련 Session과 섹션 번호를 표시해뒀습니다. 대표적으로:

| 개념 | 위치 |
|---|---|
| Figma 디자인 토큰 → Tailwind `@theme` | [src/index.css](src/index.css) |
| Props vs State | [src/components/PostCard.tsx](src/components/PostCard.tsx) |
| State는 부모가, 자식은 Props로만 그리기 (BookmarkButton) | [src/components/BookmarkButton.tsx](src/components/BookmarkButton.tsx) |
| 리스트 렌더링 + key | [src/pages/PostList.tsx](src/pages/PostList.tsx) |
| Controlled Component | [src/components/CommentSection.tsx](src/components/CommentSection.tsx) |
| React Router 동적 라우트 + `<Link>` | [src/pages/PostList.tsx](src/pages/PostList.tsx), [src/pages/PostDetail.tsx](src/pages/PostDetail.tsx) |
| State 끌어올리기 | [src/pages/PostList.tsx](src/pages/PostList.tsx), [src/pages/PostDetail.tsx](src/pages/PostDetail.tsx) |
| useEffect + 데이터 페칭 (3주차) | [src/pages/PostList.tsx](src/pages/PostList.tsx), [src/pages/PostDetail.tsx](src/pages/PostDetail.tsx) |

## 3주차(API 연동)로 인해 달라진 부분

좋아요/북마크/댓글은 Session 2 예제처럼 컴포넌트 자체 `useState`가 아니라, 이미 구현된
백엔드 API와 통신합니다 (요청에 따라 이 부분은 그대로 유지). 다만 이건 Session 2가
스스로 예고한 다음 단계이기도 합니다 - 키워드 과제 힌트에 "실제로 연동하려면 댓글
State를 CommentSection이 아니라 PostDetail이 갖고 내려줘야 하는데, 이게 State
끌어올리기예요"라고 정확히 이 구조를 가리키고 있습니다. 관련 파일에 왜 그렇게
구현했는지 주석으로 설명해뒀습니다.
# react_challenge

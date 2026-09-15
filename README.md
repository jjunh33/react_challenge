# react_study-client-web

React 4주 챌린지 3주차 제출물입니다. 2주차 mock 데이터를 실제 서버(`react_study-server`)
API로 교체해서, 새로고침해도 좋아요/북마크/댓글이 유지되는 진짜 앱으로 완성했습니다.

## 스택

2주차와 동일 + **`fetch` + `useEffect` 기반 API 연동**, `.env`로 서버 주소 관리

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

## 이번 주 범위

**필수 과제**: 공개 API(여기서는 `react_study-server`)를 연동해 리스트 + 상세 페이지 구성,
로딩/에러 상태 표시.

| 파일 | 역할 |
|---|---|
| [src/api/client.ts](src/api/client.ts) | 5개 API 함수 모음 (목록/상세/좋아요/댓글/북마크) |
| [src/api/clientId.ts](src/api/clientId.ts) | 로그인 없이 브라우저를 구분하기 위한 익명 ID |
| [src/pages/PostList.tsx](src/pages/PostList.tsx) | `useEffect` + `fetch`로 목록 조회, 로딩/에러 상태 |
| [src/pages/PostDetail.tsx](src/pages/PostDetail.tsx) | `useEffect` + `fetch`로 상세 조회, 댓글 State 끌어올리기 |
| [src/components/CommentSection.tsx](src/components/CommentSection.tsx) | 댓글 목록을 Props로 받는 순수 컴포넌트로 전환 (2주차의 "알려진 한계" 해결) |

## 2주차 대비 달라진 점

- `src/data/posts.ts` mock 배열 삭제 → 전부 서버 API 응답으로 대체
- `PostCard`/`PostDetail`이 자기 `useState`로 좋아요/북마크를 관리하던 것 → 서버가
  내려준 값을 Props로만 그리고, 클릭 시 API를 호출해 갱신 (State 끌어올리기)
- `CommentSection`이 댓글 목록까지 자기 State로 갖던 것 → 목록은 `PostDetail`이 소유,
  입력창 값만 여전히 자기 State(Controlled Component)로 남김 - 2주차 README에 적어둔
  "알려진 한계"가 여기서 해결됨
- 댓글 작성자 이름: 서버가 `X-Client-Id`로 매번 같은 익명 닉네임(예: "용감한 사자")을
  계산해서 내려주고, 그 clientId가 내 것과 같으면 프론트에서 "나"로 바꿔 보여줌

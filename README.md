# react_study-client-web

React 4주 챌린지 1주차 제출물입니다. 제공된 Figma 시안(커뮤니티 피드 - 목록/상세)을
Vite + React + TypeScript + Tailwind CSS v4로 그대로 정적 퍼블리싱했습니다.

## 스택

- Vite + React + **TypeScript** (`react-ts` 템플릿)
- **Tailwind CSS v4** - `tailwind.config.js` 없이 [src/index.css](src/index.css)의 `@theme`
  블록에 Figma Dev Mode에서 뽑은 디자인 토큰(색상/타이포/라운드)을 등록해서 사용
- ESLint + Prettier (`eslint-config-prettier`로 역할 분리)

## 실행 방법

```bash
npm install
npm run dev
```

## 이번 주 범위

**필수 과제**: 인터랙션 없이 마크업 + 스타일만 (버튼 클릭, 댓글 입력 등 전부 비활성).
**심화 과제**: 의미 단위 컴포넌트(`FeedHeader`, `PostCard`, `BookmarkButton`,
`CommentSection`)로 미리 쪼개서 구현 + `@theme`에 디자인 토큰 등록.

State/이벤트/라우팅은 다음 주(2주차) 범위라 아직 없습니다 - `useState`, `onClick`,
`react-router-dom` 전부 이 브랜치에는 없고, 두 화면(목록/상세)을 한 페이지에 나란히
정적으로 렌더링합니다.

| 파일 | 역할 |
|---|---|
| [src/App.tsx](src/App.tsx) | Feed/List, Post/Detail 두 화면을 나란히 렌더링 |
| [src/components/FeedHeader.tsx](src/components/FeedHeader.tsx) | 제목 + 검색 + 글쓰기 + 카테고리 칩 (전부 정적) |
| [src/components/PostCard.tsx](src/components/PostCard.tsx) | 게시글 카드 |
| [src/components/BookmarkButton.tsx](src/components/BookmarkButton.tsx) | 북마크 아이콘 (Figma Variant 그대로) |
| [src/components/CommentSection.tsx](src/components/CommentSection.tsx) | 댓글 입력창 + 목록 (정적) |
| [src/data.ts](src/data.ts) | Figma 시안 값을 그대로 옮긴 상수 데이터 |

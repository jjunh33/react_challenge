// Session 1 ②에서 배운 "TypeScript는 Props/데이터의 모양을 미리 약속해두는 것"이라는
// 개념을 컴포넌트 Props뿐 아니라, 백엔드(react_study-server)가 내려주는 데이터에도
// 그대로 적용한 것. 이 타입들은 서버의 DTO(PostSummaryResponse 등)와 1:1로 대응한다.

/** 목록(피드) 조회 응답 - 상세 화면에서만 필요한 댓글 전문은 포함하지 않는다. */
export interface Post {
  id: number
  author: string
  tag: string
  title: string
  body: string
  createdAt: string
  likeCount: number
  commentCount: number
  liked: boolean
  saved: boolean
}

export interface Comment {
  id: number
  /** 시드 댓글이면 실명, 실제로 작성된 댓글이면 서버가 clientId로 계산한 익명 닉네임. */
  author: string
  /** 이 댓글을 쓴 클라이언트의 clientId. 내 clientId와 같으면 화면에 "나"로 바꿔 보여준다. */
  clientId: string | null
  body: string
  createdAt: string
}

/** 상세 조회 응답 - Post의 모든 필드 + 댓글 목록. */
export interface PostDetail extends Post {
  comments: Comment[]
}

export interface LikeToggleResponse {
  liked: boolean
  likeCount: number
}

export interface BookmarkToggleResponse {
  saved: boolean
}

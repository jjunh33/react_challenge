// 이 파일은 커리큘럼 진도로 보면 3주차(API 연동) 영역이다.
// Session 1~2는 정적 UI와 로컬 State만 다루지만, 이 프로젝트는 이미
// react_study-server(Spring Boot)와 실제로 통신하도록 구현되어 있어서
// 그 부분은 그대로 유지한다. TypeScript로 응답 타입(Post/PostDetail 등)을
// 명시해두면, 사용하는 쪽(FeedPage 등)에서 어떤 필드가 오는지 자동완성/타입 체크가 된다.
import type {
  BookmarkToggleResponse,
  Comment,
  LikeToggleResponse,
  Post,
  PostDetail,
} from '../types'
import { getClientId } from './clientId'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'X-Client-Id': getClientId(),
      ...options.headers,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(
      body?.message || `요청에 실패했습니다. (HTTP ${res.status})`,
    )
  }

  if (res.status === 204) return null as T
  return res.json() as Promise<T>
}

/** 1. 목록 전체 조회 (tag 생략 시 전체) */
export function fetchPosts(tag?: string): Promise<Post[]> {
  const query = tag && tag !== '전체' ? `?tag=${encodeURIComponent(tag)}` : ''
  return request<Post[]>(`/api/posts${query}`)
}

/** 2. 게시글 상세 조회 */
export function fetchPost(postId: string | number): Promise<PostDetail> {
  return request<PostDetail>(`/api/posts/${postId}`)
}

/** 3. 좋아요 토글 */
export function toggleLike(
  postId: string | number,
): Promise<LikeToggleResponse> {
  return request<LikeToggleResponse>(`/api/posts/${postId}/like`, {
    method: 'POST',
  })
}

/**
 * 4. 댓글 작성
 * author는 보내지 않는다 - 누가 썼는지는 요청에 실린 X-Client-Id 헤더로만 판단하고,
 * 화면에 보여줄 이름(clientId 기반 익명 닉네임 또는 "나")은 서버/CommentSection이 계산한다.
 */
export function createComment(
  postId: string | number,
  body: string,
): Promise<Comment> {
  return request<Comment>(`/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body }),
  })
}

/** 5. 북마크 토글 */
export function toggleBookmark(
  postId: string | number,
): Promise<BookmarkToggleResponse> {
  return request<BookmarkToggleResponse>(`/api/posts/${postId}/bookmark`, {
    method: 'POST',
  })
}

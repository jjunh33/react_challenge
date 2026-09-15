import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookmarkButton } from '../components/BookmarkButton'
import { CommentSection } from '../components/CommentSection'
import { HeartIcon } from '../icons'
import {
  createComment,
  fetchPost,
  toggleBookmark,
  toggleLike,
} from '../api/client'
import type { PostDetail as PostDetailData } from '../types'
import { formatRelativeTime } from '../utils/time'

/**
 * 커리큘럼 파일명 그대로 PostDetail. Session 2 ⑨: `path="/posts/:id"`처럼 콜론 붙은
 * 부분이 동적 라우트이고, useParams()로 그 값을 꺼내 쓴다. 커리큘럼은 미리 만들어둔
 * mock 배열에서 posts.find(p => p.id === Number(id))로 찾지만, 여기서는 3주차
 * 내용대로 그 id를 서버에 실제로 요청(fetchPost)해서 상세 데이터를 받아온다.
 */
export function PostDetail() {
  const { postId } = useParams<{ postId: string }>()
  const [post, setPost] = useState<PostDetailData | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    if (!postId) return
    let cancelled = false
    setStatus('loading')

    fetchPost(postId)
      .then((data) => {
        if (cancelled) return
        setPost(data)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [postId])

  const handleToggleLike = () => {
    if (!postId) return
    toggleLike(postId)
      .then(({ liked, likeCount }) =>
        setPost((prev) => (prev ? { ...prev, liked, likeCount } : prev)),
      )
      .catch(() => {})
  }

  const handleToggleSave = () => {
    if (!postId) return
    toggleBookmark(postId)
      .then(({ saved }) =>
        setPost((prev) => (prev ? { ...prev, saved } : prev)),
      )
      .catch(() => {})
  }

  // Session 2 키워드 과제 힌트 그대로: 댓글 State를 CommentSection이 아니라
  // 이 페이지(PostDetail)가 갖고 있다가, 서버가 새 댓글을 만들어 돌려주면
  // 그 결과로 화면을 갱신한다 - "State 끌어올리기"를 실제 API 응답에 적용한 것.
  const handleAddComment = (text: string) => {
    if (!postId) return
    createComment(postId, text)
      .then((comment) => {
        setPost((prev) =>
          prev
            ? {
                ...prev,
                comments: [...prev.comments, comment],
                commentCount: prev.commentCount + 1,
              }
            : prev,
        )
      })
      .catch(() => {})
  }

  return (
    <div className="flex min-h-svh w-full items-start justify-center px-4 py-8">
      {/* Figma "Frame · Post / Detail · fixed 390×844" 그대로 옮긴 화면 껍데기.
          Feed/List와 달리 배경이 흰색이다. */}
      <div className="flex min-h-[844px] w-[390px] max-w-full flex-col overflow-hidden rounded-frame bg-surface shadow-[0px_12px_40px_0px_rgba(20,22,26,0.1)]">
        {/* 상단 헤더: 뒤로가기 / 제목 / 더보기 - 커리큘럼처럼 PostDetail 안에 인라인으로 둔다. */}
        <div className="flex w-full items-center justify-between border-b border-border px-5 pt-5 pb-[21px]">
          <Link to="/" className="text-lg text-ink">
            ←
          </Link>
          <p className="text-sm font-bold text-ink">게시글</p>
          <p className="text-lg text-ink-secondary">⋯</p>
        </div>

        {status === 'loading' && (
          <p className="px-5 py-10 text-center text-sm text-ink-secondary">
            불러오는 중...
          </p>
        )}

        {(status === 'error' || (status === 'ready' && !post)) && (
          <p className="px-5 py-10 text-center text-sm text-ink-secondary">
            게시글을 찾을 수 없습니다.
          </p>
        )}

        {status === 'ready' && post && (
          <div className="flex flex-1 flex-col gap-5 overflow-hidden p-5">
            {/* 작성자 정보 */}
            <div className="flex w-full items-center gap-2.5">
              <div className="size-10 shrink-0 rounded-full bg-border" />
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-bold text-ink">{post.author}</p>
                <p className="text-xs text-ink-secondary">
                  {post.tag} · {formatRelativeTime(post.createdAt)}
                </p>
              </div>
            </div>

            {/* 제목 + 본문 */}
            <div className="flex w-full flex-col gap-3">
              <h2 className="text-xl leading-7 font-bold tracking-[-0.2px] text-ink">
                {post.title}
              </h2>
              <p className="text-sm leading-[1.75] text-ink-body">
                {post.body}
              </p>
            </div>

            {/* 좋아요/댓글/북마크 pill 줄 - PostCard와 똑같은 구조를 여기서도 그대로 반복한다
                (커리큘럼도 이 줄을 PostCard와 PostDetail 양쪽에 각각 직접 작성한다). */}
            <div className="flex w-full items-center justify-between border-t border-b border-border py-3.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleLike}
                  className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium ${
                    post.liked
                      ? 'border-like-border bg-like-bg font-bold text-like'
                      : 'border-border text-ink-muted'
                  }`}
                >
                  <HeartIcon filled={post.liked} />
                  <span>{post.likeCount}</span>
                </button>
                <div className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-xs font-medium text-ink-muted">
                  댓글 {post.commentCount}
                </div>
              </div>
              <BookmarkButton
                isBookmarked={post.saved}
                onToggle={handleToggleSave}
              />
            </div>

            <CommentSection
              comments={post.comments}
              onSubmit={handleAddComment}
            />
          </div>
        )}
      </div>
    </div>
  )
}

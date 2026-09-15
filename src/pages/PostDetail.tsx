import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookmarkButton } from '../components/BookmarkButton'
import { CommentSection } from '../components/CommentSection'
import { HeartIcon } from '../icons'
import { posts } from '../data/posts'

/**
 * Session 2 ⑨: `path="/posts/:id"`처럼 콜론 붙은 부분이 동적 라우트이고,
 * useParams()로 그 값을 꺼내 쓴다. 서버 연동은 3주차 범위라, 지금은 미리 만들어둔
 * mock 배열에서 posts.find(p => p.id === Number(id))로 찾는다.
 */
export function PostDetail() {
  const { postId } = useParams<{ postId: string }>()
  const post = posts.find((p) => p.id === Number(postId))

  const [likeCount, setLikeCount] = useState(post?.likeCount ?? 0)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  if (!post) {
    return (
      <div className="flex min-h-svh w-full items-start justify-center px-4 py-8">
        <div className="flex min-h-[844px] w-[390px] max-w-full flex-col overflow-hidden rounded-frame bg-surface shadow-[0px_12px_40px_0px_rgba(20,22,26,0.1)]">
          <p className="px-5 py-10 text-center text-sm text-ink-secondary">게시글을 찾을 수 없습니다.</p>
        </div>
      </div>
    )
  }

  const handleLikeClick = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <div className="flex min-h-svh w-full items-start justify-center px-4 py-8">
      <div className="flex min-h-[844px] w-[390px] max-w-full flex-col overflow-hidden rounded-frame bg-surface shadow-[0px_12px_40px_0px_rgba(20,22,26,0.1)]">
        <div className="flex w-full items-center justify-between border-b border-border px-5 pt-5 pb-[21px]">
          <Link to="/" className="text-lg text-ink">
            ←
          </Link>
          <p className="text-sm font-bold text-ink">게시글</p>
          <p className="text-lg text-ink-secondary">⋯</p>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="flex w-full items-center gap-2.5">
            <div className="size-10 shrink-0 rounded-full bg-border" />
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-bold text-ink">{post.author}</p>
              <p className="text-xs text-ink-secondary">
                {post.tag} · {post.timeLabel}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            <h2 className="text-xl leading-7 font-bold tracking-[-0.2px] text-ink">{post.title}</h2>
            <p className="text-sm leading-[1.75] text-ink-body">{post.body}</p>
          </div>

          <div className="flex w-full items-center justify-between border-t border-b border-border py-3.5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLikeClick}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium ${
                  isLiked
                    ? 'border-like-border bg-like-bg font-bold text-like'
                    : 'border-border text-ink-muted'
                }`}
              >
                <HeartIcon filled={isLiked} />
                <span>{likeCount}</span>
              </button>
              {/* 이 숫자는 지금은 mock 데이터의 고정값이다 - CommentSection이 실제로
                  몇 개를 렌더링하는지와 무관하다. 댓글을 새로 등록해도 이 숫자는 안
                  바뀐다: 진짜로 연동하려면 댓글 State를 CommentSection이 아니라
                  PostDetail이 가져야 하는데, 이게 3주차에 할 "State 끌어올리기"다. */}
              <div className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-xs font-medium text-ink-muted">
                댓글 {post.commentCount}
              </div>
            </div>
            <BookmarkButton isBookmarked={isBookmarked} onToggle={() => setIsBookmarked(!isBookmarked)} />
          </div>

          <CommentSection initialComments={post.comments} />
        </div>
      </div>
    </div>
  )
}

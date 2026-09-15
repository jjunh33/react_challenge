import { useState, type MouseEvent } from 'react'
import { HeartIcon } from '../icons'
import { BookmarkButton } from './BookmarkButton'

interface PostCardProps {
  author: string
  tag: string
  timeLabel: string
  title: string
  body: string
  initialLikeCount: number
  commentCount: number
}

/**
 * Session 2 ②~⑦: 정적 카드에 State를 붙여 진짜로 반응하게 만든 컴포넌트.
 * likeCount/isLiked/isBookmarked 전부 이 컴포넌트 자신만 기억하면 되는 값이라
 * useState로 갖는다 - 카드마다 독립적으로 눌러도 다른 카드에 영향이 없어야 한다.
 */
export function PostCard({ author, tag, timeLabel, title, body, initialLikeCount, commentCount }: PostCardProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleLikeClick = (e: MouseEvent) => {
    e.preventDefault() // <Link>로 감싸진 카드 - 좋아요 클릭이 페이지 이동으로 번지지 않게 막기
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <div className="flex w-full flex-col gap-3 rounded-card border border-border bg-surface p-[17px]">
      <div className="flex w-full items-center gap-2.5">
        <div className="size-9 shrink-0 rounded-full bg-border" />
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-bold text-ink">{author}</p>
          <p className="text-xs text-ink-secondary">
            {tag} · {timeLabel}
          </p>
        </div>
      </div>

      <p className="w-full text-sm font-medium text-ink">{title}</p>
      <p className="line-clamp-2 w-full text-sm text-ink-body">{body}</p>

      <div className="flex w-full items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLikeClick}
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium ${
              isLiked ? 'border-like-border bg-like-bg font-bold text-like' : 'border-border text-ink-muted'
            }`}
          >
            <HeartIcon filled={isLiked} />
            <span>{likeCount}</span>
          </button>
          <div className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-xs font-medium text-ink-muted">
            댓글 {commentCount}
          </div>
        </div>
        <BookmarkButton isBookmarked={isBookmarked} onToggle={() => setIsBookmarked(!isBookmarked)} />
      </div>
    </div>
  )
}

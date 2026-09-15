import { HeartIcon } from '../icons'
import { BookmarkButton } from './BookmarkButton'

export interface PostCardData {
  id: number
  author: string
  tag: string
  timeLabel: string
  title: string
  body: string
  likeCount: number
  liked: boolean
  commentCount: number
  saved: boolean
}

interface PostCardProps {
  post: PostCardData
}

/**
 * 1주차 필수 과제: Figma 시안을 그대로 정적 UI로 퍼블리싱.
 * 좋아요/북마크 버튼도 지금은 onClick 없이 Figma의 Variant(색/아이콘 채움 여부)만
 * 그대로 옮겨서 보여준다 - 실제로 누르면 반응하게 만드는 건 2주차 범위.
 */
export function PostCard({ post }: PostCardProps) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-card border border-border bg-surface p-[17px]">
      <div className="flex w-full items-center gap-2.5">
        <div className="size-9 shrink-0 rounded-full bg-border" />
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-bold text-ink">{post.author}</p>
          <p className="text-xs text-ink-secondary">
            {post.tag} · {post.timeLabel}
          </p>
        </div>
      </div>

      <p className="w-full text-sm font-medium text-ink">{post.title}</p>
      <p className="line-clamp-2 w-full text-sm text-ink-body">{post.body}</p>

      <div className="flex w-full items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium ${
              post.liked ? 'border-like-border bg-like-bg font-bold text-like' : 'border-border text-ink-muted'
            }`}
          >
            <HeartIcon filled={post.liked} />
            <span>{post.likeCount}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-xs font-medium text-ink-muted">
            댓글 {post.commentCount}
          </div>
        </div>
        <BookmarkButton isBookmarked={post.saved} />
      </div>
    </div>
  )
}

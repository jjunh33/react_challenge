import type { Post } from '../types'
import { HeartIcon } from '../icons'
import { BookmarkButton } from './BookmarkButton'
import { formatRelativeTime } from '../utils/time'

interface PostCardProps {
  // Props: 이 컴포넌트 바깥(부모인 PostList)에서 전달받는 값. PostCard 내부에서는
  // post를 직접 고치지 않고 그대로 읽어서 화면만 그린다 (Session 2 ③).
  post: Post
  onToggleLike: (postId: number) => void
  onToggleSave: (postId: number) => void
}

/**
 * Session 2 ②: 게시글 카드 3개가 완전히 같은 구조로 반복되는 걸 발견하고
 * 분리한 컴포넌트. 커리큘럼 예제는 좋아요/북마크를 PostCard 자신의 useState로
 * 관리하지만, 이 프로젝트는 이미 3주차(API 연동) 단계까지 진행돼서 "진짜 상태"는
 * 서버에 있다 - 그래서 PostCard는 State 없이 Props(post)로만 그리는 순수한
 * 컴포넌트이고, 클릭 시 상위(PostList)가 API를 호출해 상태를 갱신한다.
 * 이것도 결국 Session 2 키워드 과제였던 "State 끌어올리기"의 실제 사례다.
 *
 * 카드 전체를 <Link>로 감싸는 건 PostList가 담당한다 (Session 2 ⑨).
 */
export function PostCard({ post, onToggleLike, onToggleSave }: PostCardProps) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-card border border-border bg-surface p-[17px]">
      <div className="flex w-full items-center gap-2.5">
        <div className="size-9 shrink-0 rounded-full bg-border" />
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-bold text-ink">{post.author}</p>
          <p className="text-xs text-ink-secondary">
            {post.tag} · {formatRelativeTime(post.createdAt)}
          </p>
        </div>
      </div>

      <p className="w-full text-sm font-medium text-ink">{post.title}</p>
      {/* line-clamp-2: 두 줄까지만 보여주고 나머지는 말줄임(...) 처리 - Figma 컴포넌트
          문서의 "본문 텍스트가 두 줄까지 노출되고 그 이후는 말줄임으로 처리"를 그대로 구현 */}
      <p className="line-clamp-2 w-full text-sm text-ink-body">{post.body}</p>

      <div className="flex w-full items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          {/* 좋아요 버튼 - Session 2 ③④⑤에서 만든 것 그대로 PostCard 안에 인라인으로 둔다
              (BookmarkButton과 달리 커리큘럼은 좋아요를 별도 컴포넌트로 빼지 않는다). */}
          <button
            type="button"
            onClick={(e) => {
              // 이벤트 버블링을 막지 않으면, 이 버튼 클릭이 카드를 감싼 <Link>의
              // 페이지 이동까지 같이 실행돼버린다 (Session 2 ④ 이벤트 핸들링 응용).
              e.preventDefault()
              e.stopPropagation()
              onToggleLike(post.id)
            }}
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
          onToggle={() => onToggleSave(post.id)}
        />
      </div>
    </div>
  )
}

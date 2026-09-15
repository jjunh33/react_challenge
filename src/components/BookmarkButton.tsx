import { BookmarkIcon } from '../icons'

interface BookmarkButtonProps {
  isBookmarked: boolean
  onToggle: () => void
}

/**
 * Session 2 ⑦ BookmarkButton 그대로.
 * "이 값이 바뀌면 이 컴포넌트만 알면 되나, 아니면 부모나 다른 형제 컴포넌트도
 * 알아야 하나?" - 북마크한 글 모아보기 같은 화면을 만들려면 부모(PostCard/PostDetail)도
 * 이 값을 알아야 하므로, State는 부모가 갖고 여기는 useState 없이 Props로만 그린다.
 */
export function BookmarkButton({
  isBookmarked,
  onToggle,
}: BookmarkButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        // PostCard처럼 <Link>로 감싸진 곳에서 쓰일 때, 이 클릭이 카드 전체의
        // 페이지 이동으로 번지지 않도록 막는다 (PostCard의 좋아요 버튼과 동일한 이유).
        e.preventDefault()
        e.stopPropagation()
        onToggle()
      }}
      aria-pressed={isBookmarked}
      className={`flex items-center rounded-full border px-2.5 py-1.5 ${
        isBookmarked
          ? 'border-primary-border bg-primary-bg text-primary'
          : 'border-border text-ink-muted'
      }`}
    >
      <BookmarkIcon filled={isBookmarked} />
    </button>
  )
}

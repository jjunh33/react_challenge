import type { MouseEvent } from 'react'
import { BookmarkIcon } from '../icons'

interface BookmarkButtonProps {
  isBookmarked: boolean
  onToggle: () => void
}

/**
 * Session 2 ⑦: "이 State를 BookmarkButton 안에 둘까, PostCard가 갖고 Props로 내려줄까?"
 * 나중에 "북마크한 글 모아보기" 화면을 만들려면 PostCard(또는 그 위)도 이 값을 알아야
 * 하므로, State는 부모가 갖고 여기는 useState 없이 Props로만 그린다.
 */
export function BookmarkButton({ isBookmarked, onToggle }: BookmarkButtonProps) {
  return (
    <button
      type="button"
      onClick={(e: MouseEvent) => {
        // PostCard가 <Link>로 감싸져 있어서, 이 클릭이 카드 전체의 페이지 이동으로
        // 번지지 않도록 막아야 한다 (Session 2 ④ 이벤트 핸들링 응용).
        e.preventDefault()
        onToggle()
      }}
      aria-pressed={isBookmarked}
      className={`flex items-center rounded-full border px-2.5 py-1.5 ${
        isBookmarked ? 'border-primary-border bg-primary-bg text-primary' : 'border-border text-ink-muted'
      }`}
    >
      <BookmarkIcon filled={isBookmarked} />
    </button>
  )
}

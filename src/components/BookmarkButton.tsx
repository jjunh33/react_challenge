import { BookmarkIcon } from '../icons'

interface BookmarkButtonProps {
  isBookmarked: boolean
}

/** 정적 퍼블리싱 단계라 클릭 이벤트는 없다 - Figma의 "Saved=true/false" 두 Variant를 그대로 옮긴다. */
export function BookmarkButton({ isBookmarked }: BookmarkButtonProps) {
  return (
    <div
      className={`flex items-center rounded-full border px-2.5 py-1.5 ${
        isBookmarked ? 'border-primary-border bg-primary-bg text-primary' : 'border-border text-ink-muted'
      }`}
    >
      <BookmarkIcon filled={isBookmarked} />
    </div>
  )
}

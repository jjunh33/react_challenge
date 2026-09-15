import { SearchIcon } from '../icons'

const TAGS = ['전체', '질문', '자유', '정보']

/**
 * 1주차 필수 과제: 인터랙션 없이 마크업 + 스타일만 퍼블리싱.
 * "전체" 탭만 Figma 시안대로 활성 스타일로 고정해두고, 클릭해도 아무 일도 일어나지 않는다
 * (onClick을 붙이는 건 2주차 범위).
 */
export function FeedHeader() {
  return (
    <header className="flex w-full flex-col gap-4 border-b border-border bg-surface px-5 pt-5 pb-3">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold tracking-[-0.2px] text-ink">커뮤니티</h1>
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-chip-bg text-ink-muted">
            <SearchIcon />
          </div>
          <div className="rounded-full bg-primary px-3.5 py-2 text-xs font-bold text-surface">글쓰기</div>
        </div>
      </div>

      <div className="flex w-full gap-2">
        {TAGS.map((tag) => (
          <div
            key={tag}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
              tag === '전체' ? 'bg-ink text-surface' : 'bg-chip-bg text-ink-muted'
            }`}
          >
            {tag}
          </div>
        ))}
      </div>
    </header>
  )
}

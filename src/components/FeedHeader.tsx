import { SearchIcon } from '../icons'
import { TAGS } from '../constants'

interface FeedHeaderProps {
  activeTag: string
  onTagChange: (tag: string) => void
}

/**
 * Session 2 ②의 최종 정리표: "헤더의 제목 + 검색 아이콘 + 글쓰기 버튼 + 필터 칩 묶음"은
 * 페이지에 하나뿐이지만 역할이 뚜렷해서 FeedHeader라는 이름으로 따로 뺀 컴포넌트.
 *
 * 표에서는 카테고리 칩을 CategoryTab이라는 별도 컴포넌트로 뽑는 것도 소개하지만,
 * 실제 완성 코드(섹션 ⑪)에서는 "오늘은 만들지 않았어요 - 심화 과제로 남겨둡니다"라고
 * 명시하고 FeedHeader 안에 인라인으로 남겨뒀다. 커리큘럼 기본 구현과 똑같이
 * 여기서도 칩을 별도 컴포넌트로 빼지 않고 .map()으로 바로 그린다.
 */
export function FeedHeader({ activeTag, onTagChange }: FeedHeaderProps) {
  return (
    <header className="flex w-full flex-col gap-4 border-b border-border bg-surface px-5 pt-5 pb-3">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold tracking-[-0.2px] text-ink">
          커뮤니티
        </h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="검색"
            className="flex size-9 items-center justify-center rounded-full bg-chip-bg text-ink-muted"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            className="rounded-full bg-primary px-3.5 py-2 text-xs font-bold text-surface"
          >
            글쓰기
          </button>
        </div>
      </div>

      <div className="flex w-full gap-2">
        {/* key={tag}: 배열을 그릴 때마다 항목마다 고유한 값을 key로 넘겨야
            React가 어떤 항목이 바뀌었는지 구분할 수 있다 (Session 2 ⑤). */}
        {TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onTagChange(tag)}
            // Props/State에 따라 className을 조건부로 다르게 준다 - "전체"만 진하게
            // 채워진 Figma Variant를, active라는 값 하나로 표현한 것 (Session 2 ②).
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${
              tag === activeTag
                ? 'bg-ink text-surface'
                : 'bg-chip-bg text-ink-muted'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </header>
  )
}

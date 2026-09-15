import { useState } from 'react'
import type { Comment } from '../data/posts'

interface CommentSectionProps {
  initialComments: Comment[]
}

/**
 * Session 2 ⑧ CommentSection - 댓글 입력창 + 기존 댓글 목록을 한 컴포넌트로 묶었다.
 * 서버 연동은 3주차 범위라, 지금은 이 컴포넌트가 댓글 목록까지 자기 State로 들고
 * mock으로 추가/조회한다 (3주차에 이 State를 PostDetail로 끌어올리게 된다).
 */
export function CommentSection({ initialComments }: CommentSectionProps) {
  const [value, setValue] = useState('')
  const [comments, setComments] = useState<Comment[]>(initialComments)

  const handleSubmit = () => {
    if (!value.trim()) return
    setComments([...comments, { id: Date.now(), author: '나', timeLabel: '방금 전', body: value }])
    setValue('')
  }

  return (
    <>
      <div className="flex w-full items-center gap-2 rounded-full bg-chip-bg py-2 pr-2 pl-4">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            // 한글 등 조합형 입력(IME) 버그: 마지막 글자를 조합 중에 Enter를 누르면
            // keydown이 두 번(조합 확정용 + 실제 Enter) 들어온다. isComposing이 true인
            // 첫 번째는 무시해야 마지막 글자가 중복 확정되지 않는다.
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleSubmit()
          }}
          placeholder="댓글을 입력하세요"
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-secondary"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="shrink-0 rounded-full bg-primary px-3.5 py-2 text-xs font-bold text-surface"
        >
          등록
        </button>
      </div>

      <div className="flex w-full flex-col gap-4">
        {/* key={comment.id}: 배열을 반복 렌더링할 땐 항목마다 고유한 key가 필요하다 (Session 2 ⑤).
            새 댓글은 Date.now()로 id를 만든다 - 계속 추가되는 리스트라 순서 번호(index)보다
            고유값을 쓰는 습관을 들인다. */}
        {comments.map((comment) => (
          <div key={comment.id} className="flex w-full items-start gap-2.5">
            <div className="size-8 shrink-0 rounded-full bg-border" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-ink">{comment.author}</span>
                <span className="text-xs text-ink-secondary">{comment.timeLabel}</span>
              </div>
              <p className="text-sm text-ink-body">{comment.body}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export interface CommentData {
  id: number
  author: string
  timeLabel: string
  body: string
}

interface CommentSectionProps {
  comments: CommentData[]
}

/** 1주차: 댓글 입력창 + 목록을 Figma 그대로 정적으로만 그린다 (입력/등록 동작은 2주차). */
export function CommentSection({ comments }: CommentSectionProps) {
  return (
    <>
      <div className="flex w-full items-center gap-2 rounded-full bg-chip-bg py-2 pr-2 pl-4">
        <p className="min-w-0 flex-1 text-sm text-ink-secondary">댓글을 입력하세요</p>
        <div className="shrink-0 rounded-full bg-primary px-3.5 py-2 text-xs font-bold text-surface">등록</div>
      </div>

      <div className="flex w-full flex-col gap-4">
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

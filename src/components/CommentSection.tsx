import { useState } from 'react'
import type { Comment } from '../types'
import { formatRelativeTime } from '../utils/time'
import { getClientId } from '../api/clientId'

interface CommentSectionProps {
  comments: Comment[]
  onSubmit: (text: string) => void
}

/**
 * Session 2 ⑧ CommentSection 그대로 - 댓글 입력창 + 기존 댓글 목록을 한 컴포넌트로 묶었다.
 *
 * 입력창의 "지금 뭐라고 쓰여있는지"는 이 컴포넌트만 알면 되는 값이라 useState(value)로
 * 그대로 둔다 (Controlled Component, Session 2 ⑥). 반면 댓글 "목록"은 이 프로젝트가
 * 이미 서버 API로 댓글을 저장하고, PostDetail 상단의 "댓글 3" 같은 카운트와도 값을
 * 공유해야 해서 comments Props로 받는다 - Session 2 키워드 과제 힌트였던
 * "댓글 State는 CommentSection이 아니라 PostDetail이 가져야 한다"를 그대로 적용한 것.
 */
export function CommentSection({ comments, onSubmit }: CommentSectionProps) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    if (!value.trim()) return
    onSubmit(value)
    setValue('')
  }

  return (
    <>
      <div className="flex w-full items-center gap-2 rounded-full bg-chip-bg py-2 pr-2 pl-4">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            // 한글/일본어 등 조합형 입력(IME) 버그: 마지막 글자를 조합 중에 Enter를
            // 누르면, 그 Enter가 "글자 조합 확정"과 "등록" 두 가지 역할을 동시에
            // 하려고 해서 keydown이 두 번(조합 확정용 + 실제 Enter) 들어온다.
            // isComposing이 true인(=아직 조합 중인) 첫 번째 Enter는 무시해야
            // 마지막 글자가 중복 확정되지 않는다.
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
        {/* key={comment.id}: 배열을 반복 렌더링할 땐 항목마다 고유한 key가 필요하다 (Session 2 ⑤). */}
        {comments.map((comment) => {
          // 카카오톡 오픈채팅/구글 시트 공동 작업처럼, 댓글마다 실제로 누가 썼는지는
          // 몰라도 "같은 사람인지"는 clientId로 구분할 수 있다. 내가 쓴 댓글만
          // 서버가 준 익명 닉네임 대신 "나"로 바꿔서 보여준다 - 이건 보는 사람(뷰어)마다
          // 달라지는 값이라 서버가 아니라 여기(프론트)에서 판단해야 한다.
          const displayName =
            comment.clientId === getClientId() ? '나' : comment.author

          return (
            <div key={comment.id} className="flex w-full items-start gap-2.5">
              <div className="size-8 shrink-0 rounded-full bg-border" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-ink">
                    {displayName}
                  </span>
                  <span className="text-xs text-ink-secondary">
                    {formatRelativeTime(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-ink-body">{comment.body}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

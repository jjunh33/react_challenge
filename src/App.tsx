import { FeedHeader } from './components/FeedHeader'
import { PostCard } from './components/PostCard'
import { BookmarkButton } from './components/BookmarkButton'
import { CommentSection } from './components/CommentSection'
import { HeartIcon } from './icons'
import { posts, detailPost, detailComments } from './data'

/**
 * 1주차 필수 과제: 제공된 Figma 시안(Feed/List + Post/Detail 두 화면)을
 * 컴포넌트 분리 없이... 는 아니고, 심화 과제("의미 단위 컴포넌트로 쪼개기")까지 반영해서
 * 그대로 정적 UI로 퍼블리싱한 것. 라우팅/이벤트/State는 전부 2~3주차 범위라 아직 없다 -
 * 그래서 두 화면을 그냥 나란히 렌더링한다 (Figma 캔버스에 두 Frame이 나란히 있는 것과 동일).
 */
function App() {
  return (
    <div className="flex min-h-svh w-full flex-wrap items-start justify-center gap-8 px-4 py-8">
      {/* Frame · Feed / List */}
      <div className="flex min-h-[844px] w-[390px] max-w-full flex-col overflow-hidden rounded-frame bg-bg shadow-[0px_12px_40px_0px_rgba(20,22,26,0.1)]">
        <FeedHeader />
        <div className="flex flex-col gap-3 px-4 pt-4 pb-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Frame · Post / Detail */}
      <div className="flex min-h-[844px] w-[390px] max-w-full flex-col overflow-hidden rounded-frame bg-surface shadow-[0px_12px_40px_0px_rgba(20,22,26,0.1)]">
        <div className="flex w-full items-center justify-between border-b border-border px-5 pt-5 pb-[21px]">
          <p className="text-lg text-ink">←</p>
          <p className="text-sm font-bold text-ink">게시글</p>
          <p className="text-lg text-ink-secondary">⋯</p>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="flex w-full items-center gap-2.5">
            <div className="size-10 shrink-0 rounded-full bg-border" />
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-bold text-ink">{detailPost.author}</p>
              <p className="text-xs text-ink-secondary">
                {detailPost.tag} · {detailPost.timeLabel}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3">
            <h2 className="text-xl leading-7 font-bold tracking-[-0.2px] text-ink">{detailPost.title}</h2>
            <p className="text-sm leading-[1.75] text-ink-body">{detailPost.body}</p>
          </div>

          <div className="flex w-full items-center justify-between border-t border-b border-border py-3.5">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-xs font-medium text-ink-muted">
                <HeartIcon filled={false} />
                <span>{detailPost.likeCount}</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-xs font-medium text-ink-muted">
                댓글 {detailComments.length}
              </div>
            </div>
            <BookmarkButton isBookmarked={false} />
          </div>

          <CommentSection comments={detailComments} />
        </div>
      </div>
    </div>
  )
}

export default App

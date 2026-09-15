import { Link } from 'react-router-dom'
import { FeedHeader } from '../components/FeedHeader'
import { PostCard } from '../components/PostCard'
import { posts } from '../data/posts'

/**
 * Session 2 ⑥: mock 배열을 .map()으로 돌려 PostCard를 반복 렌더링한다.
 * Session 2 ⑨: 카드 전체를 <Link>로 감싸서 클릭하면 상세 페이지로 이동한다 -
 * <a href>와 달리 페이지 전체를 새로고침하지 않고 필요한 부분만 다시 그린다.
 */
export function PostList() {
  return (
    <div className="flex min-h-svh w-full items-start justify-center px-4 py-8">
      <div className="flex min-h-[844px] w-[390px] max-w-full flex-col overflow-hidden rounded-frame bg-bg shadow-[0px_12px_40px_0px_rgba(20,22,26,0.1)]">
        <FeedHeader />
        <div className="flex flex-col gap-3 px-4 pt-4 pb-6">
          {posts.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`}>
              <PostCard
                author={post.author}
                tag={post.tag}
                timeLabel={post.timeLabel}
                title={post.title}
                body={post.body}
                initialLikeCount={post.likeCount}
                commentCount={post.commentCount}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

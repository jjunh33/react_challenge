import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FeedHeader } from '../components/FeedHeader'
import { PostCard } from '../components/PostCard'
import { fetchPosts, toggleBookmark, toggleLike } from '../api/client'
import type { Post } from '../types'

/**
 * 커리큘럼 파일명 그대로 PostList. Session 2 시점에는 이 페이지가 src/data/posts.ts의
 * mock 배열을 그냥 import해서 곧바로 렌더링했다 (데이터 페칭 없음). 이 프로젝트는 3주차
 * 내용까지 이미 구현되어 있어서, 화면에 보여줄 목록을 서버(react_study-server)에서
 * 매번 fetch로 받아온다 - 그래서 posts가 고정 배열이 아니라 State이고, 로딩/에러
 * 상태도 함께 관리한다 (Session 3: useEffect + 데이터 페칭 - API 연동 파트는 그대로 유지).
 */
type Status = 'loading' | 'ready' | 'error'

export function PostList() {
  // activeTag: 지금 선택된 카테고리 탭. FeedHeader(자식)가 아니라 여기(부모)가 갖고 있고
  // Props로 내려주는 이유 - PostCard 목록을 필터링하려면 이 페이지도 값을 알아야 하기 때문.
  const [activeTag, setActiveTag] = useState('전체')
  const [posts, setPosts] = useState<Post[]>([])
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    fetchPosts(activeTag)
      .then((data) => {
        if (cancelled) return
        setPosts(data)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })

    // cleanup: activeTag가 바뀌어 effect가 다시 실행되기 전에, 먼저 나갔던 요청의
    // 응답이 늦게 도착해서 최신 상태를 덮어쓰지 않도록 막는다.
    return () => {
      cancelled = true
    }
  }, [activeTag])

  const handleToggleLike = (postId: number) => {
    toggleLike(postId)
      .then(({ liked, likeCount }) => {
        setPosts((prev) =>
          prev.map((post) =>
            post.id === postId ? { ...post, liked, likeCount } : post,
          ),
        )
      })
      .catch(() => {})
  }

  const handleToggleSave = (postId: number) => {
    toggleBookmark(postId)
      .then(({ saved }) => {
        setPosts((prev) =>
          prev.map((post) => (post.id === postId ? { ...post, saved } : post)),
        )
      })
      .catch(() => {})
  }

  return (
    <div className="flex min-h-svh w-full items-start justify-center px-4 py-8">
      {/* Figma "Frame · Feed / List · fixed 390×844" 그대로 옮긴 화면 껍데기.
          커리큘럼 예시(w-96 h-[844px] bg-gray-50 rounded-[20px])와 같은 구조. */}
      <div className="flex min-h-[844px] w-[390px] max-w-full flex-col overflow-hidden rounded-frame bg-bg shadow-[0px_12px_40px_0px_rgba(20,22,26,0.1)]">
        <FeedHeader activeTag={activeTag} onTagChange={setActiveTag} />

        {status === 'loading' && (
          <p className="px-5 py-10 text-center text-sm text-ink-secondary">
            불러오는 중...
          </p>
        )}

        {status === 'error' && (
          <p className="px-5 py-10 text-center text-sm text-ink-secondary">
            게시글을 불러오지 못했습니다. 서버가 켜져 있는지 확인해주세요.
          </p>
        )}

        {status === 'ready' && (
          <div className="flex flex-col gap-3 px-4 pt-4 pb-6">
            {/* key={post.id}: 리스트 렌더링에는 반드시 고유한 key가 필요하다 (Session 2 ⑤).
                카드 전체를 <Link>로 감싸서 클릭하면 상세 페이지로 이동한다 (Session 2 ⑨) -
                <a href>와 달리 페이지 전체를 새로고침하지 않고 필요한 부분만 다시 그린다. */}
            {posts.map((post) => (
              <Link key={post.id} to={`/posts/${post.id}`}>
                <PostCard
                  post={post}
                  onToggleLike={handleToggleLike}
                  onToggleSave={handleToggleSave}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

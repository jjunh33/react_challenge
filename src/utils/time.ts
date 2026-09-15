/** 서버가 내려주는 ISO 타임스탬프를 "n분 전" 형태로 변환한다. (3주차: API 데이터 가공) */
export function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString)
  const diffSeconds = Math.max(
    0,
    Math.floor((Date.now() - date.getTime()) / 1000),
  )

  if (diffSeconds < 60) return '방금 전'

  const diffMinutes = Math.floor(diffSeconds / 60)
  if (diffMinutes < 60) return `${diffMinutes}분 전`

  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}시간 전`

  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}일 전`
}

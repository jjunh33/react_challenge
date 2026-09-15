const STORAGE_KEY = 'clientId'

/**
 * 로그인 기능이 없는 학습용 백엔드라 브라우저마다 좋아요/북마크 상태를
 * 구분하기 위해 익명 ID를 하나 만들어 localStorage에 저장해두고 재사용한다.
 * 서버는 이 값을 X-Client-Id 헤더로 받는다.
 */
export function getClientId(): string {
  let id = localStorage.getItem(STORAGE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(STORAGE_KEY, id)
  }
  return id
}

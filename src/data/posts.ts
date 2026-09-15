export interface Comment {
  id: number
  author: string
  timeLabel: string
  body: string
}

export interface Post {
  id: number
  author: string
  tag: string
  timeLabel: string
  title: string
  body: string
  likeCount: number
  commentCount: number
  comments: Comment[]
}

/**
 * 서버에서 데이터를 받아오는 건 3주차에 배운다. 오늘은 그 대신 미리 만들어둔
 * mock data를 쓴다 - Figma 시안에 있던 게시글 3개를 그대로 옮겼다.
 */
export const posts: Post[] = [
  {
    id: 1,
    author: '김하늘',
    tag: '질문',
    timeLabel: '12분 전',
    title: '디자인 시스템 토큰, 어디까지 쪼개는 게 좋을까요?',
    body: '컬러는 primary/secondary 정도로 정리했는데 spacing를 4배수로 잡을 때 8과 12를 둘 다 쓰는 게 맞는지 고민입니다. 팀에서는 8배수만 쓰자는 의견도 있어서요.',
    likeCount: 24,
    commentCount: 6,
    comments: [
      { id: 1, author: '이준호', timeLabel: '10분 전', body: '4배수 기준으로 4/8/12/16/24/32만 쓰고 있어요. 12는 카드 내부 gap에서 꼭 필요해서 남겨두는 편입니다.' },
      { id: 2, author: '박서연', timeLabel: '7분 전', body: '토큰 이름을 space/12 처럼 값 그대로 두면 개발자가 바로 읽을 수 있어서 편합니다.' },
      { id: 3, author: '최민지', timeLabel: '2분 전', body: '저희도 같은 방식이요. 예외가 생기면 토큰을 늘리기보다 다 레이아웃을 다시 봅니다.' },
    ],
  },
  {
    id: 2,
    author: '이준호',
    tag: '자유',
    timeLabel: '1시간 전',
    title: '오늘 컴포넌트 정리하면서 배운 것',
    body: 'Variant를 상태 기준으로만 나누니 훨씬 관리가 쉬워졌어요. Liked=true / false 두 개만 두고 나머지는 인스턴스 스왑으로 처리했습니다.',
    likeCount: 41,
    commentCount: 12,
    comments: [],
  },
  {
    id: 3,
    author: '박서연',
    tag: '정보',
    timeLabel: '3시간 전',
    title: 'Dev Mode 핸드오프 체크리스트 공유',
    body: '색상은 hex, 간격은 4px 배수, 텍스트 스타일 이름으로 관리. 이 세 가지만 지켜도 개발자와 커뮤니케이션 시간이 크게 줄어듭니다.',
    likeCount: 87,
    commentCount: 19,
    comments: [],
  },
]

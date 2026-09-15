/// <reference types="vite/client" />

// .env(.local)에 정의한 환경변수의 타입을 선언해줘야
// import.meta.env.VITE_API_BASE_URL 을 TypeScript가 문자열로 인식한다.
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

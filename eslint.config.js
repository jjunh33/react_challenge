import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
// Session 1 - "ESLint에는 eslint-config-prettier만 추가해서 Prettier와 겹치는
// 스타일 규칙만 꺼주기". eslint-plugin-prettier로 ESLint 안에서 Prettier를 같이
// 돌리지 않고, 포맷은 Prettier(저장 시 자동 포맷)에게, 코드 품질 검사는 ESLint에게
// 완전히 역할을 나눈다.
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 3주차(API 연동) 패턴: 요청을 다시 보낼 때마다 로딩 상태로 되돌리기 위해
      // effect 안에서 setStatus('loading')을 호출한다. 정상적인 데이터 페칭
      // 패턴이라 error 대신 warn으로 낮춘다.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  // 반드시 배열 맨 마지막에 위치해야, Prettier와 겹치는 스타일 규칙이 꺼진다
  // (뒤에 있는 설정이 앞의 규칙을 덮어쓰기 때문).
  eslintConfigPrettier,
)

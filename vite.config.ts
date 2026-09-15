import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Tailwind CSS v4는 PostCSS 설정 파일 없이 Vite 플러그인으로 바로 연결한다.
// (Session 1 - "Tailwind v4의 설정 방식: tailwind.config.js 대신 CSS + 플러그인")
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: 'index.html', // 기본 index.html
        main: 'src/pages/main_page.html', // 메인 페이지
        login: 'src/pages/login_page.html', // 로그인 페이지
        profile: 'src/pages/profile.html', // 프로필 페이지
      },
    },
  },
  appType: 'mpa', // fallback 사용안함
  server: {
    // open: 'src/pages/main/index.html', // 서버 시작 시 브라우저에서 지정페이지 자동으로 열기
  },
});

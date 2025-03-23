import '../style.css';

// search-bar 컴포넌트에서 placeholder 변경
function updatePlaceholder() {
  const input = document.getElementById('taingSearch');
  if (window.innerWidth < 768) {
    // Tailwind 기준 sm (md 미만)
    input.placeholder = '검색';
  } else {
    input.placeholder = 'TV프로그램, 영화 제목 및 출연진으로 검색해보세요';
  }

  // 검색창 플레이스홀더 업데이트
  updatePlaceholder();

  // 창 크기 변경 시 플레이스홀더 업데이트
  window.addEventListener('resize', updatePlaceholder);
  window.addEventListener('DOMContentLoaded', updatePlaceholder);
}

// 현재 시간 표시
let now = new Date();
let formattedTime = now.toLocaleString();
const timeDisplay = document.getElementById('time-display');
if (timeDisplay) {
  timeDisplay.textContent = formattedTime;
}

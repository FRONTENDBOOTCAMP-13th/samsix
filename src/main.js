import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');
  const pauseButton = document.getElementById('pauseButton');

  // 초기 상태는 애니메이션 활성화
  let isPaused = false;

  // pauseButton이 존재할 때만 이벤트 리스너 추가
  if (pauseButton && slides) {
    pauseButton.addEventListener('click', () => {
      if (isPaused) {
        // 애니메이션 재개
        slides.style.animationPlayState = 'running';
        isPaused = false;

        // 재생 아이콘으로 변경
        pauseButton.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="1" width="5" height="16" fill="white" />
              <rect x="11" y="1" width="5" height="16" fill="white" />
        </svg>
      `;

        // 인디케이터 애니메이션 재개
        document.querySelectorAll('.indicator').forEach((indicator) => {
          indicator.style.animationPlayState = 'running';
        });
      } else {
        // 애니메이션 일시정지
        slides.style.animationPlayState = 'paused';
        isPaused = true;

        // 일시정지 아이콘으로 변경
        pauseButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
        </svg>
      `;

        // 인디케이터 애니메이션 일시정지
        document.querySelectorAll('.indicator').forEach((indicator) => {
          indicator.style.animationPlayState = 'paused';
        });
      }
    });
  }

  // DOM 선택 부분
  const closeDialogButtons = document.querySelectorAll('.close-dialog'); // 여러 개의 close-dialog 버튼 선택
  const dialog = document.querySelector('.panel-dialog');

  if (dialog) {
    const closeDialog = () => dialog.close();

    dialog.showModal(); // 페이지 로드 시 모달을 띄운다.

    // 모든 close-dialog 버튼에 closeDialog 이벤트 바인딩
    closeDialogButtons.forEach((button) => {
      button.addEventListener('click', closeDialog);
    });
  }
});

// DOM 선택 부분
const showDialogButton = document.querySelector('.show-dialog');
const closeDialogButton = document.querySelector('.close-dialog');
const panelDialog = document.querySelector('.panel-dialog');
// 함수 구현 부분
const openDialog = () => panelDialog.showModal();
const closeDialog = () => panelDialog.close();
// 이벤트 바인딩 부분
showDialogButton.addEventListener('click', openDialog);
closeDialogButton.addEventListener('click', closeDialog);

function updatePlaceholder() {
  const input = document.getElementById('taingSearch');
  if (window.innerWidth < 768) {
    // Tailwind 기준 sm (md 미만)
    input.placeholder = '검색';
  } else {
    input.placeholder = 'TV프로그램, 영화 제목 및 출연진으로 검색해보세요';
  }
}

window.addEventListener('resize', updatePlaceholder);
window.addEventListener('DOMContentLoaded', updatePlaceholder);

import './style.css';

// 비밀번호 일치 여부 확인 함수
function checkPasswordMatch() {
  const pw = document.getElementById('input_pw').value;
  const pwConfirm = document.getElementById('input_pw_confirm').value;
  const errorMsg = document.getElementById('error_pw_confirm');

  if (pwConfirm === '') {
    errorMsg.classList.add('hidden');
  } else if (pw !== pwConfirm) {
    errorMsg.classList.remove('hidden');
  } else {
    errorMsg.classList.add('hidden');
  }
}

// 체크박스 관련 함수들 추가
// 전체 동의 체크박스 토글 함수
window.toggleAllCheckboxes = function () {
  const mainCheckbox = document.getElementById('checkbox_all');
  const subCheckboxes = document.querySelectorAll('.sub-checkbox');

  // 메인 체크박스 상태에 따라 모든 하위 체크박스 상태 변경
  subCheckboxes.forEach((checkbox) => {
    checkbox.checked = mainCheckbox.checked;
  });
};

// 하위 체크박스 변경 시 전체 체크박스 상태 업데이트
window.updateAllCheckbox = function () {
  const mainCheckbox = document.getElementById('checkbox_all');
  const subCheckboxes = document.querySelectorAll('.sub-checkbox');

  // 모든 하위 체크박스가 체크되어 있으면 메인 체크박스도 체크
  const allChecked = Array.from(subCheckboxes).every((checkbox) => checkbox.checked);
  mainCheckbox.checked = allChecked;
};

// 연결된 체크박스 토글 함수 (checkbox_6, 7, 8 관련)
window.toggleLinkedCheckboxes = function (checkbox, linkedIds) {
  // 체크박스 객체가 전달된 경우
  if (checkbox instanceof HTMLInputElement) {
    const isChecked = checkbox.checked;
    linkedIds.forEach((id) => {
      const linkedCheckbox = document.getElementById(id);
      if (linkedCheckbox) {
        linkedCheckbox.checked = isChecked;
      }
    });
  }
  // 체크박스 ID와 연결된 ID 배열이 전달된 경우
  else if (typeof checkbox === 'string') {
    const mainCheckbox = document.getElementById(checkbox);
    const linkedCheckboxes = linkedIds.map((id) => document.getElementById(id));

    // 연결된 체크박스들의 상태에 따라 메인 체크박스 상태 업데이트
    const allLinkedChecked = linkedCheckboxes.every((cb) => cb && cb.checked);
    if (mainCheckbox) {
      mainCheckbox.checked = allLinkedChecked;
    }
  }

  // 전체 체크박스 상태도 업데이트
  window.updateAllCheckbox();
};

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
  const dialog = document.querySelector('.main-dialog');

  if (dialog) {
    const closeDialog = () => dialog.close();

    dialog.showModal(); // 페이지 로드 시 모달을 띄운다.

    // 모든 close-dialog 버튼에 closeDialog 이벤트 바인딩
    closeDialogButtons.forEach((button) => {
      button.addEventListener('click', closeDialog);
    });
  }

  // 비밀번호 검증 코드
  const pwInput = document.getElementById('input_pw');
  const pwConfirmInput = document.getElementById('input_pw_confirm');

  if (pwInput && pwConfirmInput) {
    // 두 입력 필드 모두에 이벤트 리스너 추가
    pwInput.addEventListener('input', checkPasswordMatch);
    pwConfirmInput.addEventListener('input', checkPasswordMatch);

    // 키보드 이벤트에도 추가 (기존 onkeyup과 동일한 동작을 위해)
    pwInput.addEventListener('keyup', checkPasswordMatch);
    pwConfirmInput.addEventListener('keyup', checkPasswordMatch);
  }

  // 체크박스 초기화 코드 추가
  // 전체 체크박스 초기 상태 설정
  window.updateAllCheckbox();

  // checkbox_7과 checkbox_8 변경 시 checkbox_6 상태 업데이트
  const checkbox7 = document.getElementById('checkbox_7');
  const checkbox8 = document.getElementById('checkbox_8');

  if (checkbox7) {
    checkbox7.addEventListener('change', function () {
      window.toggleLinkedCheckboxes('checkbox_6', ['checkbox_7', 'checkbox_8']);
    });
  }

  if (checkbox8) {
    checkbox8.addEventListener('change', function () {
      window.toggleLinkedCheckboxes('checkbox_6', ['checkbox_7', 'checkbox_8']);
    });
  }

  // 모든 하위 체크박스에 이벤트 리스너 추가
  const subCheckboxes = document.querySelectorAll('.sub-checkbox');
  subCheckboxes.forEach((checkbox) => {
    if (!checkbox.hasAttribute('onchange')) {
      checkbox.addEventListener('change', window.updateAllCheckbox);
    }
  });
  const togglePassword = document.getElementById('togglePassword');
  const togglePasswordConfirm = document.getElementById('togglePasswordConfirm');
});

// search-bar 컴포넌트에서 placeholder 변경
function updatePlaceholder() {
  const input = document.getElementById('taingSearch');
  if (window.innerWidth < 768) {
    // Tailwind 기준 sm (md 미만)
    input.placeholder = '검색';
  } else {
    input.placeholder = 'TV프로그램, 영화 제목 및 출연진으로 검색해보세요';
  }
}

window.onload = function () {
  // 현재 날짜와 시간 가져오기
  let now = new Date();
  let formattedTime = now.toLocaleString(); // 사용자의 로컬 시간 형식으로 변환

  // HTML 요소에 삽입
  document.getElementById('time-display').textContent = formattedTime;
};

window.addEventListener('resize', updatePlaceholder);
window.addEventListener('DOMContentLoaded', updatePlaceholder);

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

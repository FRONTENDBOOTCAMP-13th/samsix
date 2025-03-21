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

// 문서의 모든 요소가 다 로드가 됐을 시, 실행
document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const totalSlides = slides.length;
  const slideContainer = document.querySelector('.slides');
  let autoSlide = setInterval(nextSlide, 3000);
  const controlBtn = document.querySelector('.control-btn');
  let isPlaying = true;

  function updateSlide() {
    slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicators.forEach((ind, i) => ind.classList.toggle('active', i === currentIndex));
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
  }

  document.querySelector('.next').addEventListener('click', () => {
    nextSlide();
    resetTimer();
  });
  document.querySelector('.prev').addEventListener('click', () => {
    prevSlide();
    resetTimer();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateSlide();
      resetTimer();
    });
  });

  controlBtn.addEventListener('click', () => {
    if (isPlaying) {
      clearInterval(autoSlide);
      controlBtn.textContent = '▶';
    } else {
      autoSlide = setInterval(nextSlide, 3000);
      controlBtn.textContent = '⏸';
    }
    isPlaying = !isPlaying;
  });

  function resetTimer() {
    if (isPlaying) {
      clearInterval(autoSlide);
      autoSlide = setInterval(nextSlide, 3000);
    }
  }

  // img 반응형 크기 조절
  document.addEventListener('DOMContentLoaded', function () {
    const img = document.getElementById('myIMG');
    const bbox = img.getBoundingClientRect(); // 원본 크기 가져오기
    console.log(bbox);
    const originalWidth = bbox.width || 600; // 기본값 설정

    document.documentElement.style.setProperty('--img-width', `${originalWidth}px`);
  });

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

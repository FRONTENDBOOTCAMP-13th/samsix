import 'style.css';

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

// search-bar 컴포넌트에서 placeholder 변경
function updatePlaceholder() {
  const input = document.getElementById('taingSearch');
  if (input) {
    if (window.innerWidth < 768) {
      // Tailwind 기준 sm (md 미만)
      input.placeholder = '검색';
    } else {
      input.placeholder = 'TV프로그램, 영화 제목 및 출연진으로 검색해보세요';
    }
  }
}

// 문서의 모든 요소가 다 로드가 됐을 시, 실행
document.addEventListener('DOMContentLoaded', () => {
  // 슬라이더 관련 코드
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const slideContainer = document.querySelector('.slides');
  const controlBtn = document.querySelector('.control-btn');

  if (slides.length > 0 && slideContainer) {
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlide = setInterval(nextSlide, 3000);
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

    function resetTimer() {
      if (isPlaying) {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 3000);
      }
    }

    // 슬라이더 컨트롤 이벤트 리스너
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
      });
    }

    if (indicators) {
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          currentIndex = index;
          updateSlide();
          resetTimer();
        });
      });
    }

    if (controlBtn) {
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
    }
  }

  // 이미지 반응형 크기 조절
  const titleImages = document.querySelectorAll('.img-title');

  // 이미지의 원본 크기를 저장하는 함수
  function storeOriginalSize(img) {
    if (!img.dataset.originalWidth) {
      img.dataset.originalWidth = img.naturalWidth;
      console.log('원본 이미지 크기:', img.dataset.originalWidth);
    }
  }

  // 뷰포트 크기에 따라 이미지 크기를 조절하는 함수
  function adjustImageSize(img) {
    const originalWidth = parseInt(img.dataset.originalWidth);
    const viewportWidth = window.innerWidth;

    let newWidth;

    // 뷰포트 크기에 따라 이미지 크기 조절
    if (viewportWidth >= 1024) {
      // 원본 크기 (100%)
      newWidth = originalWidth;
    } else if (viewportWidth >= 768) {
      // 원본의 2/3 크기
      newWidth = Math.round((originalWidth * 2) / 3);
    } else {
      // 원본의 1/2 크기
      newWidth = Math.round(originalWidth / 2);
    }

    // 이미지 크기 설정
    img.style.width = newWidth + 'px';
    console.log('뷰포트 너비:', viewportWidth, '이미지 너비 설정:', newWidth);
  }

  const modal = document.getElementById('searchModal');
  const toggleBtn = document.getElementById('modalToggleBtn');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');

  toggleBtn.addEventListener('click', () => {
    if (!modal.open) {
      modal.showModal();
      searchIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    } else {
      modal.close();
      searchIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  });

  // 모달 바깥 클릭하면 닫기
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  // DOM 선택 부분
  const closeDialogButtons = document.querySelectorAll('.close-dialog'); // 여러 개의 close-dialog 버튼 선택
  const dialog = document.querySelector('.main-dialog');

  // 모든 이미지에 대해 원본 크기 저장 및 크기 설정
  titleImages.forEach((img) => {
    // 이미지가 이미 로드되었는지 확인
    if (img.complete) {
      storeOriginalSize(img);
      adjustImageSize(img);
    } else {
      // 이미지가 로드될 때까지 기다림
      img.onload = function () {
        storeOriginalSize(img);
        adjustImageSize(img);
      };
    }
  });

  // 창 크기 변경 시 모든 이미지 크기 재조정
  window.addEventListener('resize', function () {
    titleImages.forEach((img) => adjustImageSize(img));
  });


  // 다이얼로그 관련 코드
  const closeDialogButtons = document.querySelectorAll('.close-dialog');
  const mainDialog = document.querySelector('.main-dialog');

  if (mainDialog) {
    const closeMainDialog = () => mainDialog.close();
    mainDialog.showModal(); // 페이지 로드 시 모달을 띄운다.

    // 모든 close-dialog 버튼에 closeDialog 이벤트 바인딩
    closeDialogButtons.forEach((button) => {
      button.addEventListener('click', closeMainDialog);
    });
  }

  // 패널 다이얼로그 관련 코드
  const showDialogButton = document.querySelector('.show-dialog');
  const panelDialog = document.querySelector('.panel-dialog');

  if (showDialogButton && panelDialog) {
    const openPanelDialog = () => panelDialog.showModal();
    const closePanelDialog = () => panelDialog.close();

    showDialogButton.addEventListener('click', openPanelDialog);

    const panelCloseButton = document.querySelector('.panel-dialog .close-dialog');
    if (panelCloseButton) {
      panelCloseButton.addEventListener('click', closePanelDialog);
    }
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

  // 현재 시간 표시
  let now = new Date();
  let formattedTime = now.toLocaleString();
  const timeDisplay = document.getElementById('time-display');
  if (timeDisplay) {
    timeDisplay.textContent = formattedTime;
  }

  // 검색창 플레이스홀더 업데이트
  updatePlaceholder();
});

// 창 크기 변경 시 플레이스홀더 업데이트
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

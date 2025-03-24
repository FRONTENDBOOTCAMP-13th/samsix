import '../style.css';

// 문서의 모든 요소가 다 로드가 됐을 시, 실행
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.fade-in-section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // 보이면 클래스 추가
        }
      });
    },
    { threshold: 0.2 }
  ); // 20% 보이면 작동

  sections.forEach((section) => observer.observe(section));

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
          controlBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"> <polygon points="5,3 19,12 5,21" /> </svg>';
        } else {
          autoSlide = setInterval(nextSlide, 3000);
          controlBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"> <line x1="8" y1="4" x2="8" y2="20" /> <line x1="16" y1="4" x2="16" y2="20" /> </svg>';
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
});

const profileBtn = document.getElementById('profile-link-btn');

profileBtn.addEventListener('click', function () {
  window.location.href = '../pages/profile_page.html';
});
profileBtn.addEventListener('touchstart', function () {
  window.location.href = '../pages/profile_page.html';
});

document.addEventListener('DOMContentLoaded', () => {
  initSearchModal();
  updatePlaceholder();
  updateTimeDisplay();
  window.addEventListener('resize', updatePlaceholder);
});

function initSearchModal() {
  const modal = document.getElementById('searchModal');
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  const nav = document.getElementById('navigation');

  if (!modal || !openBtn || !closeBtn || !nav) return;

  // 검색창 열기 버튼
  openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    updateButtonVisibility(true);
    nav.classList.add('bg-brand-dark-bg-1');
    nav.classList.remove('bg-black');
  });

  // 검색창 닫기 버튼
  closeBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // 혹시라도 이벤트 버블링 방지
    closeModal();
  });

  // 모달 바깥 클릭 시 닫기
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.add('hidden');
    updateButtonVisibility(false);
    nav.classList.remove('bg-brand-dark-bg-1');
    nav.classList.add('bg-black');
  }
}

// 버튼 전환 함수
function updateButtonVisibility(isOpen) {
  const openBtn = document.getElementById('openModalBtn');
  const closeBtn = document.getElementById('closeModalBtn');
  openBtn.classList.toggle('hidden', isOpen);
  closeBtn.classList.toggle('hidden', !isOpen);
}

// search-bar 컴포넌트에서 placeholder 변경
function updatePlaceholder() {
  const input = document.getElementById('taingSearch');
  if (!input) return; // input 요소가 없으면 실행 안 함

  if (window.innerWidth < 768) {
    // Tailwind 기준 sm (md 미만)
    input.placeholder = '검색';
  } else {
    input.placeholder = 'TV프로그램, 영화 제목 및 출연진으로 검색해보세요';
  }
}

// 창 크기 변경 시 플레이스홀더 업데이트
window.addEventListener('resize', updatePlaceholder);

// 페이지 로드 시 한 번 실행
document.addEventListener('DOMContentLoaded', updatePlaceholder);

// 현재 시간 표시
let now = new Date();
let formattedTime = now.toLocaleString();
const timeDisplay = document.getElementById('time-display');
if (timeDisplay) {
  timeDisplay.textContent = formattedTime;
}

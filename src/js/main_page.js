import '../style.css';

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

import '../style.css';

document.addEventListener('DOMContentLoaded', () => {
  const editToggle = document.getElementById('edit-toggle');
  const titleMain = document.getElementById('title-main');
  const titleSub = document.getElementById('title-sub');

  if (!editToggle || !titleMain || !titleSub) return;

  editToggle.addEventListener('change', () => {
    if (editToggle.checked) {
      // 편집 모드
      titleMain.textContent = '프로필 편집';
      titleSub.textContent = '편집할 프로필을 선택해주세요.';
    } else {
      // 기본 모드
      titleMain.textContent = '프로필 선택';
      titleSub.textContent = '시청자 프로필을 선택해주세요.';
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const listItems = document.querySelectorAll('ul li[tabindex]');

  listItems.forEach((item, index) => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // 스크롤 방지
        const input = item.querySelector('input[type="radio"]');
        if (input) {
          input.checked = true;

          // 시각적 상태를 위해 focus 이동
          input.focus();

          // 선택 시 이벤트가 필요한 경우
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('edit-toggle');
  const editLabel = document.getElementById('edit-label');
  const doneLabel = document.getElementById('done-label');

  [editLabel, doneLabel].forEach((label) => {
    label.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        checkbox.checked = !checkbox.checked;

        // 트리거를 위해 change 이벤트 수동 발생 (필요한 경우)
        checkbox.dispatchEvent(new Event('change'));
      }
    });
  });
});

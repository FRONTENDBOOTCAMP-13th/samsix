// toggle_password.js
window.togglePasswordVisibility = function (button) {
  const input = button.previousElementSibling;
  const img = button.querySelector('.toggle-icon'); // ID 대신 클래스 선택자 사용

  if (input.type === 'password') {
    input.type = 'text';
    img.src = '/login/loginpw_visible.svg';
    button.setAttribute('aria-label', '비밀번호 숨기기');
  } else {
    input.type = 'password';
    img.src = '/login/loginpw_invisible.svg';
    button.setAttribute('aria-label', '비밀번호 보기');
  }
};

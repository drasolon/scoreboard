function copyToClipboard(inputId, buttonId) {
  const input = document.getElementById(inputId);
  const button = document.getElementById(buttonId);
  input.select();
  document.execCommand('copy');
  button.firstChild.data = 'Copied';
  setTimeout(() => {
    button.firstChild.data = 'Copy';
  }, 2000);
}

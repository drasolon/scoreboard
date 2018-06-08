function copyToClipboard(inputId, buttonId) {
    let input = document.getElementById(inputId);
    let button = document.getElementById(buttonId);
    input.select();
    document.execCommand('copy');
    button.firstChild.data = 'Copied';
    setTimeout(() => {
        button.firstChild.data = "Copy";
    }, 2000);

}
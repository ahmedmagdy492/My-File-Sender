window.addEventListener('load', function () {
    generateCode();
});

function generateCode() {
    fetch(url + 'MobileConnection/GenerateCode')
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                document.querySelector("#qrcode-container").innerHTML = res.data;
            }
            else {
                alert(res.errors[0]);
            }
        })
}
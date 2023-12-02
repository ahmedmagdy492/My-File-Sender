
const getNewConnectionPopup = () => {
    fetch(url + "Popup/GetNewConnectionPopup", {
        method: 'GET'
    })
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.querySelector('#popupContainer').innerHTML = data;
            $("#defaultModal").modal("show");
        });
}

const showMenu = function (id) {
    const el = document.querySelector(`#${id}`)
    if (el.querySelector('.dropdown-menu').style.display === 'none') {
        el.querySelector('.dropdown-menu').style.display = 'block';
    }
    else {
        el.querySelector('.dropdown-menu').style.display = 'none';
    }
}
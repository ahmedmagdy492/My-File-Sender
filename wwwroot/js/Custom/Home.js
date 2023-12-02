
window.addEventListener('load', function () {
    getConnectionList();
});

const  getConnectionList = () => {
    fetch(url + "Home/GetConnectionList")
        .then(res => res.text())
        .then(res => {
            document.querySelector("#list").innerHTML = res;
        });
}

function deleteConnection(connectionID) {
    if (confirm("Are you sure you want to delete this connection ?")) {
        fetch(url + `Home/DeleteConnection?connectionID=${connectionID}`, {
            method: 'post'
        })
            .then(res => res.json())
            .then(res => {
                if (res.success === true) {
                    document.querySelector('#list').innerHTML = res.view.result;
                }
                else {
                    alert(res.errors[0]);
                }
            });
    }
}
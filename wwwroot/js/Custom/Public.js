
const submitForm = (event, errSectionID, successSectionID) => {

    const formData = new FormData();
    const elements = event.target;

    const submitBtn = [...elements].filter(i => i.type === 'submit')[0];

    if (submitBtn !== null)
        submitBtn.disabled = true;

    for (let element of elements) {
        formData.append(element.name, element.value);
    }

    fetch(elements.action, {
        method: 'post',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            if (submitBtn !== null)
                submitBtn.disabled = false;
            if (res.success === false) {
                const parent = document.querySelector(`#${errSectionID}`);
                parent.innerHTML = '';
                for (let err of res.errors) {
                    const newEle = document.createElement('div');
                    newEle.style.color = 'red';
                    newEle.innerHTML = err;
                    parent.appendChild(newEle);
                }
            }
            else {
                const parent = document.querySelector(`#${successSectionID}`);
                parent.innerHTML = '';
                const newEle = document.createElement('span');
                newEle.style.color = 'green';
                newEle.innerHTML = res.errors[0];
                parent.appendChild(newEle);

                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        });

    return false;
}

const loginForm = (event, errSectionID) => {

    const formData = new FormData();
    const elements = event.target;

    const submitBtn = [...elements].filter(i => i.type === 'submit')[0];

    if (submitBtn !== null)
        submitBtn.disabled = true;

    for (let element of elements) {
        formData.append(element.name, element.value);
    }

    fetch(elements.action, {
        method: 'post',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            if (submitBtn !== null)
                submitBtn.disabled = false;
            if (res.success === false) {
                const parent = document.querySelector(`#${errSectionID}`);
                parent.innerHTML = '';
                for (let err of res.errors) {
                    const newEle = document.createElement('div');
                    newEle.style.color = 'red';
                    newEle.innerHTML = err;
                    parent.appendChild(newEle);
                }
            }
            else {
                location.replace(res.redirectUrl);
            }
        });

    return false;
}

const signOut = () => {
    fetch(url + 'Account/Logout', {
        method: 'post',
        body: {}
    })
        .then(res => res.json())
        .then(res => {
            location.replace(res.redirectUrl);
        });
}

const connect = (event, errSectionID,) => {

    const formData = new FormData();
    const elements = event.target;

    const submitBtn = [...elements].filter(i => i.type === 'submit')[0];

    if (submitBtn !== null)
        submitBtn.disabled = true;

    for (let element of elements) {
        formData.append(element.name, element.value);
    }

    fetch(elements.action, {
        method: 'post',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            if (submitBtn !== null)
                submitBtn.disabled = false;
            if (res.success === false) {
                const parent = document.querySelector(`#${errSectionID}`);
                parent.innerHTML = '';
                for (let err of res.errors) {
                    const newEle = document.createElement('div');
                    newEle.style.color = 'red';
                    newEle.innerHTML = err;
                    parent.appendChild(newEle);
                }
            }
            else {
                location.replace(url + `Connection/Index?connectionID=${res.connectionId}&ip=${res.ip}&port=${res.port}`);
            }
        });

    return false;
}

const getConnectPopup = (conID) => {
    fetch(url + `Popup/GetConnectionUsernameAndPassword?connectionID=${conID}`, {
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

const searchByName = () => {
    const name = document.querySelector('#search-input').value;
    if (name) {
        fetch(url + `Connection/SearchByConnectionName?conName=${name}`, {
            method: 'post'
        })
            .then(res => res.json())
            .then(res => {
                document.querySelector('#search-result').innerHTML = res.view.result;
            });
    }
    else {
        alert('Please enter part or the entire connection name');
    }
}
// API Calls
const navigateRemote = (conID, path) => {
    let innerHtml = document.querySelector("#remoteContainer").innerHTML;
    if (!hasExtension(path)) {
        document.querySelector("#remoteContainer").innerHTML = "<div class='d-flex justify-content-center'><img src='/imgs/​​Iphone-spinner-1.gif' class='mt-4' width='35' height='35' /></div>";
    }

    return fetch(url + `Connection/NavigateRemote?connectionId=${conID}&path=${path}`, {
        method: 'POST'
    })
        .then(res => res.json())
        .catch(e => {
            document.querySelector("#remoteContainer").innerHTML = innerHtml;
        });
}

const navigateLocal = (conID, path) => {
    return fetch(url + `Connection/NavigateLocal?connectionId=${conID}&path=${path}`, {
        method: 'POST'
    })
        .then(res => res.json())
        .catch(e => {
            new Toast({
                message: e,
                type: 'danger'
            })
        });
}

// Utils
function createLoader() {
    const div = document.createElement('div');
    div.style.margin = '0px';
    div.style.width = window.innerWidth + 'px';
    div.style.height = (window.innerHeight + 50000) + 'px';
    div.style.backgroundColor = 'white';
    div.style.opacity = '0.7';
    div.style.position = 'absolute';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.zIndex = '500';
    div.id = 'magdy-transfer-loader';
    div.innerHTML = "<div class='d-flex justify-content-center'><img src='/imgs/​​Iphone-spinner-1.gif' width='35' height='35' style='margin-top: 350px;' /></div>";
    document.body.style.position = 'relative';
    document.body.appendChild(div);
}

function removeLoader() {
    const div = document.querySelector('#magdy-transfer-loader');
    document.body.removeChild(div);
}

function hasExtension(name) {
    let lastIndex = name.lastIndexOf('.');

    if (lastIndex == -1)
        return false;

    if (lastIndex == (name.length - 1))
        return false;

    return true;
}

function home() {
    navigateLocal(connectionID, "").then(localResponse => {
        updatePath('fullPathInput', localResponse.path);

        createListUI(localResponse.localFiles, 'localContainer', connectionID, localResponse.path, true);
    })
        .catch(e => {
            new Toast({
                message: e,
                type: 'danger'
            });
        });
}

function getFileNameFromPath(filePath) {
    let lastBackslashIndex = filePath.lastIndexOf('/');

    if (lastBackslashIndex === -1)
        lastBackslashIndex = filePath.lastIndexOf('\\');

    const fileName = lastBackslashIndex !== -1 ? filePath.substring(lastBackslashIndex + 1) : filePath;

    return fileName;
}

function createListUI(files, containerId, conId, path, isLocal = false) {
    const container = document.querySelector(`#${containerId}`);

    if (container) {
        if (!files) {
            new Toast({
                message: 'No such file or  directory',
                type: 'danger'
            });
            return;
        }

        container.innerHTML = '';

        if ([...files].length === 0) {
            const card = document.createElement('div');
            card.className = 'card';
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            const h3 = document.createElement('h3');
            h3.innerHTML = 'Folder is empty';
            h3.style.textAlign = 'center';
            cardBody.appendChild(h3);
            card.appendChild(cardBody);
            card.classList.add('no-drag');
            container.appendChild(card);
        }

        
        if (isLocal) {
            // filenames are only provided
            const localFiles = [...files];
            localFiles.forEach(file => {
                const card = document.createElement('div');
                card.className = 'card';
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';
                card.appendChild(cardBody);
                card.dataset.path = path == '' ? `${file}` : `${path}\\${file}`;
                card.dataset.isLocal = true;
                cardBody.style.display = 'flex';
                cardBody.style.justifyContent = 'align-left';
                const cardImg = document.createElement('span');
                if (!hasExtension(file)) {
                    card.dataset.isDir = true;
                    card.classList.add('no-drag');
                    cardImg.innerHTML = `<svg width="42" height="42" version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
                                <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z" />
                                <path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z" />
                            </svg>`;
                    cardBody.appendChild(cardImg);
                }
                else {
                    card.dataset.isDir = false;
                    cardImg.innerHTML = `<svg width="42" height="42" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58" style="enable-background:new 0 0 58 58" xml:space="preserve"><path style="fill:#edeada" d="M52 19 38 5H11v53h41z"/><path style="fill:#c1bca4" d="M11 5h27l9 9V0H6v53h5z"/><path style="fill:#cec9ae" d="M19 26h25a1 1 0 1 0 0-2H19a1 1 0 1 0 0 2zm0-8h10a1 1 0 1 0 0-2H19a1 1 0 1 0 0 2zm25 14H19a1 1 0 1 0 0 2h25a1 1 0 1 0 0-2zm0 8H19a1 1 0 1 0 0 2h25a1 1 0 1 0 0-2zm0 8H19a1 1 0 1 0 0 2h25a1 1 0 1 0 0-2zM38 5v14h14z"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>`;
                    cardBody.appendChild(cardImg);
                }
                const a = document.createElement('a');
                a.href = 'javascript:void(0);';
                a.style.margin = '10px 0 0 15px';
                a.dataset.path = path == '' ? `${file}` : `${path}\\${file}`;
                a.addEventListener('click', async function () {
                    try {
                        const localResponse = await navigateLocal(conId, `${a.dataset.path}`);
                        if (localResponse.success) {
                            currentPath = a.dataset.path;
                            updatePath('fullPathInput', localResponse.path);

                            createListUI(localResponse.localFiles, 'localContainer', conId, localResponse.path, true);
                            card.dataset.isDir = true;
                        }
                        else {
                            // TODO: do file handling here
                            card.dataset.isDir = false;
                            card.classList.remove('no-drag');
                            if (localResponse.errors && localResponse.errors.length > 0) {
                                new Toast({
                                    message: localResponse.errors[0],
                                    type: 'danger'
                                })
                            }
                        }
                    }
                    catch (e) {
                        new Toast({
                            message: e,
                            type: 'danger'
                        });
                    }
                });
                a.innerHTML = file;
                cardBody.appendChild(a);
                container.appendChild(card);
            });
        }
        else {
            [...files].forEach(file => {
                const card = document.createElement('div');
                card.className = 'card';
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';
                card.appendChild(cardBody);
                card.dataset.isLocal = false;
                card.dataset.path = path == '' ? `${file.fullName}` : `${path}\\${file.fullName}`;
                const a = document.createElement('a');
                a.style.margin = '10px 0 0 15px';
                a.href = 'javascript:void(0);';
                a.dataset.path = path == '' ? `${file.fullName}` : `${path}\\${file.fullName}`;
                cardBody.style.display = 'flex';
                cardBody.style.justifyContent = 'align-left';
                const cardImg = document.createElement('span');
                if (!hasExtension(file.fullName)) {
                    card.dataset.isDir = true;
                    card.classList.add('no-drag');
                    cardImg.innerHTML = `<svg width="42" height="42" version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
                                <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z" />
                                <path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z" />
                            </svg>`;
                    cardBody.appendChild(cardImg);
                }
                else {
                    card.dataset.isDir = false;
                    cardImg.innerHTML = `<svg width="42" height="42" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58" style="enable-background:new 0 0 58 58" xml:space="preserve"><path style="fill:#edeada" d="M52 19 38 5H11v53h41z"/><path style="fill:#c1bca4" d="M11 5h27l9 9V0H6v53h5z"/><path style="fill:#cec9ae" d="M19 26h25a1 1 0 1 0 0-2H19a1 1 0 1 0 0 2zm0-8h10a1 1 0 1 0 0-2H19a1 1 0 1 0 0 2zm25 14H19a1 1 0 1 0 0 2h25a1 1 0 1 0 0-2zm0 8H19a1 1 0 1 0 0 2h25a1 1 0 1 0 0-2zm0 8H19a1 1 0 1 0 0 2h25a1 1 0 1 0 0-2zM38 5v14h14z"/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></svg>`;
                    cardBody.appendChild(cardImg);
                }
                a.addEventListener('click', async function () {
                    let remoteResponse = null;
                    try {
                        let remoteResponse = await navigateRemote(conId, `${a.dataset.path}`);

                        if (remoteResponse.success) {
                            updatePath('fullPathInputRemote', remoteCurrentPath);

                            createListUI(remoteResponse.remoteFiles, 'remoteContainer', conId, remoteCurrentPath);
                            card.dataset.isDir = true;
                        }
                        else {
                            card.dataset.isDir = false;
                            card.classList.remove('no-drag');
                        }
                    }
                    catch (e) {
                        new Toast({
                            message: e,
                            type: 'danger'
                        });
                    }

                    if (remoteResponse) {
                        showConnectionInfo(remoteResponse);
                    }
                });
                if (file.fullName.includes('..')) {
                    a.style.color = 'black';
                    a.style.fontWeight = 'bold';
                    a.innerHTML = 'Back';
                    a.draggable = false;
                }
                else {
                    a.innerHTML = getFileNameFromPath(file.fullName);
                }
                cardBody.appendChild(a);
                container.appendChild(card);
            });
        }
    }
}

function showConnectionInfo(remoteResponse) {
    if (remoteResponse.success === true) {
        document.querySelector("#connection-status").style.color = "green";
        document.querySelector("#connection-status").innerHTML = "Connected";
    }
    else {
        document.querySelector("#remoteContainer").style.color = "red";
        document.querySelector("#remoteContainer").innerHTML = remoteResponse.errors[0] + " Please Reconnect";
        document.querySelector("#connection-status").style.color = "red";
        document.querySelector("#connection-status").innerHTML = "Not Connected";
    }
}

function updatePath(elId, path) {
    try {
        if (!path || path === "" || path === undefined) {
            document.querySelector(`#${elId}`).value = "Your Computer";
        }
        else {
            document.querySelector(`#${elId}`).value = decodeURIComponent(path);
        }
    }
    catch { }
}

window.addEventListener('load', async function () {
    let remoteResponse = null;

    try {
        remoteResponse = await navigateRemote(connectionID, remoteCurrentPath);
        updatePath('fullPathInputRemote', remoteResponse.path);
        createListUI(remoteResponse.remoteFiles, 'remoteContainer', connectionID, remoteResponse.path);
    }
    catch (e) {
        new Toast({
            message: e,
            type: 'danger'
        });
    }

    if (remoteResponse) {
        showConnectionInfo(remoteResponse);
    }

    try {
        const localResponse = await navigateLocal(connectionID, currentPath);
        updatePath('fullPathInput', localResponse.path);

        createListUI(localResponse.localFiles, 'localContainer', connectionID, localResponse.path, true);
    }
    catch (e) {
        new Toast({
            message: e,
            type: 'danger'
        });
    }

    const remoteContainer = document.querySelector('#remoteContainer');
    const localContainer = document.querySelector('#localContainer');

    drake = dragula([localContainer, remoteContainer], {
        moves: (el, source, handle, sibling) => !el.classList.contains('no-drag'),
        copy: true,
        accepts: function (el, target, source, sibling) {
            return false; // elements can be dropped in any of the `containers` by default
        },
    });
    drake.on('drag', function (el, source) {
        
    });

    drake.on('drop', async function (el, target, source, sibling) {
        if (target === source) {
            try {
                drake.cancel(true);
            }
            catch { }
        }
        else {
            if (el.dataset.isLocal === 'false') {
                // remote
                createLoader();
                const lclResponse = await downloadfiles(connectionID, el.dataset.path);
                removeLoader();
                if (lclResponse.success) {
                    createListUI(lclResponse.localFiles, 'localContainer', connectionID, lclResponse.path, true);
                    new Toast({
                        message: 'File has been transferred successfully',
                        type: 'success'
                    });
                }
                else {
                    if (lclResponse.errors && lclResponse.errors.length > 0) {
                        new Toast({
                            message: lclResponse.errors[0],
                            type: 'danger'
                        });
                        drake.cancel(true);
                    }
                }
            }
            else {
                // local
                try {
                    createLoader();
                    const rmResponse = await uploadfiles(connectionID, el.dataset.path);
                    removeLoader();
                    if (rmResponse.success) {
                        updatePath('fullPathInputRemote', rmResponse.path);

                        createListUI(rmResponse.remoteFiles, 'remoteContainer', connectionID, rmResponse.path);
                    }
                    else {
                        if (rmResponse.errors && rmResponse.errors.length > 0) {
                            new Toast({
                                message: rmResponse.errors[0],
                                type: 'danger'
                            });
                        }
                    }
                }
                catch (e) {
                    new Toast({
                        message: e,
                        type: 'danger'
                    });
                }
            }
        }
    });
});

const backLocal = () => {
    return fetch(url + `Connection/BackLocal?path=${currentPath}`, {
        method: 'POST'
    })
        .then(res => res.json());
}

function localBack() {
    backLocal().then(localResponse => {
        updatePath('fullPathInput', localResponse.path);
        currentPath = localResponse.path;
        createListUI(localResponse.localFiles, 'localContainer', connectionID, localResponse.path, true);
    })
        .catch(e => {
            new Toast({
                message: e,
                type: 'danger'
            });
        });
}

const backRemote = (conId) => {

    if (remoteCurrentPath === "")
        return;

    document.querySelector("#remoteContainer").innerHTML = "<div class='d-flex justify-content-center'><img src='/imgs/​​Iphone-spinner-1.gif' class='mt-4' width='35' height='35' /></div>";

    fetch(url + `Connection/BackRemote?conId=${conId}&path=${remoteCurrentPath}`, {
        method: 'POST'
    })
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                document.querySelector("#remoteContainer").innerHTML = res.files.result;
                remoteCurrentPath = res.currentPath;
            }
            else {
                new Toast({
                    message: res.errors[0],
                    type: 'danger'
                });
            }
        });
}

const enterFullScreen = () => {
    // element which needs to enter full-screen mode
    const element = document.querySelector("#connection-section");

    // make the element go to full-screen mode
    element.requestFullscreen({ navigationUI: "show" })
        .then(function () {
            // element has entered fullscreen mode successfully
            console.log("element has entered fullscreen mode successfully");
        })
        .catch(function (error) {
            // element could not enter fullscreen mode
            console.log("element could not enter fullscreen mode");
        });
}

const viewContent = (path) => {
    fetch(url + `Connection/ViewContent?path=${path}`, {
        method: 'POST'
    })
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                if (document.fullscreenElement !== null) {
                    document.exitFullscreen()
                        .then(function () {
                            // element has exited fullscreen mode
                            document.querySelector("#popupContainer").innerHTML = res.fileView.result;
                            $("#defaultModal").modal("show");
                        })
                        .catch(function (error) {
                            // element could not exit fullscreen mode
                            // error message
                            console.log(error.message);
                        });
                }
                else {
                    document.querySelector("#popupContainer").innerHTML = res.fileView.result;
                    $("#defaultModal").modal("show");
                }
            }
            else {
                if (res.errors && res.errors.length > 0) {
                    new Toast({
                        message: res.errors[0],
                        type: 'danger'
                    });
                }
            }
        });
}

const checkOrUnCheckAll = (event) => {
    const selectAllCheckBox = event.target;
    const allCheckBoxes = document.querySelectorAll(".local-check-box");

    if (selectAllCheckBox.checked === true) {
        allCheckBoxes.forEach(c => {
            c.checked = true;
        });
    }
    else {
        allCheckBoxes.forEach(c => {
            c.checked = false;
        });
    }
}

const checkOrUnCheckOne = (event) => {
    const selectAllCheckBox = document.querySelector('#checkbox-select-all');
    const allCheckBoxes = document.querySelectorAll(".local-check-box");
    const checkedCheckBoxes = [...allCheckBoxes].filter(i => i.checked);

    if (selectAllCheckBox.checked) {
        selectAllCheckBox.checked = false;
    }
    else if (allCheckBoxes.length === checkedCheckBoxes.length) {
        selectAllCheckBox.checked = true;
    }
}

const saveFile = (path) => {
    const formData = new FormData();
    formData.append("path", path);
    formData.append("content", document.querySelector("#content").value);

    fetch(url + "Connection/SaveFile", {
        method: "post",
        body: formData,
        contentType: 'multipart/form-data'
    })
        .then(res => res.json())
        .then(res => {
            if (res.success === true) {
                document.querySelector("#save-file-msg").style.color = "green";
                document.querySelector("#save-file-msg").innerHTML = "File has been Saved";
                scrollBy(0, -1000);

                setTimeout(() => {
                    $("#defaultModal").modal('hide');
                }, 2000);
            }
            else {
                document.querySelector("#save-file-msg").style.color = "red";
                document.querySelector("#save-file-msg").innerHTML = res.errors[0];
            }
        });
}

// remote server select all functions
const remoteCheckOrUnCheckAll = (event) => {
    const selectAllCheckBox = event.target;
    const allCheckBoxes = document.querySelectorAll(".remote-check-box");

    if (selectAllCheckBox.checked === true) {
        allCheckBoxes.forEach(c => {
            c.checked = true;
        });
    }
    else {
        allCheckBoxes.forEach(c => {
            c.checked = false;
        });
    }
}

const remoteCheckOrUnCheckOne = (event) => {
    const selectAllCheckBox = document.querySelector('#remote-check-all');
    const allCheckBoxes = document.querySelectorAll(".remote-check-box");
    const checkedCheckBoxes = [...allCheckBoxes].filter(i => i.checked);

    if (selectAllCheckBox.checked) {
        selectAllCheckBox.checked = false;
    }
    else if (allCheckBoxes.length === checkedCheckBoxes.length) {
        selectAllCheckBox.checked = true;
    }
}

// uploading and downloading
const uploadfiles = (connectionID, localPath) => {
    return fetch(url + `Connection/UploadFile?connectionId=${connectionID}&remoteServerPath=${remoteCurrentPath}&localFilePath=${localPath}`, {
        method: 'post'
    })
    .then(res => res.json());
}

const downloadfiles = (connectionID, remotePath) => {
    return fetch(url + `Connection/DownloadFile?connectionId=${connectionID}&remoteServerPath=${remotePath}&localFilePath=${currentPath}`, {
        method: 'post'
    })
        .then(res => res.json());
}
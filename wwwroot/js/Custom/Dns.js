
function resolve() {
    const btn = document.querySelector('#btnResolve');
    btn.innerText = "Resolving...";
    btn.disabled = true;
    const domainEl = document.querySelector('#domainInput');

    fetch(url + `DNSResolver/Resolve?domain=${domainEl.value}`, {
        method: 'post'
    })
        .then(res => res.json())
        .then(res => {
            btn.innerText = "Resolve";
            btn.disabled = false;
            if (res.success === true) {
                document.querySelector('#list').innerHTML = res.dnsResult.result;
            }
            else {
                alert(res.errors[0]);
            }
        });
}

function resolveEnter(event) {
    if (event.keyCode === 13) {
        resolve();
    }
}
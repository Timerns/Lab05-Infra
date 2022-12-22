function startContainer(id, button) {
    executeRoute('/start/' + id, button);
}

function stopContainer(id, button) {
    executeRoute('/stop/' + id, button);
}

function addContainer(id, button) {
    executeRoute('/add/' + id, button);
}

function removeContainer(id, button) {
    executeRoute('/remove/' + id, button);
}

function executeRoute(route, button) {
    var oldValue = button.innerHTML;
    button.innerHTML = '<div class="spinner-border" style="width: 1rem; height: 1rem;" role="status"></div>';

    fetch(route, button)
        .then(handleResponse)
        .catch(() => button.innerHTML = oldValue);
}

async function handleResponse(data) {
    if (data.status == 200) {
        document.location.reload();
    }
    showError(await data.text());
    throw Error();
}

function showError(text) {
    $('#errorModal .modal-body p').text(text);
    $('#errorModal').modal('show');
}
function startContainer(id) {
    fetch('/start/' + id)
        .then(async data => {
            $('#errorModal .modal-body p').text(await data.text());
            $('#errorModal').modal('show');
        });
}

function stopContainer(id) {
    fetch('/stop/' + id)
        .then(data => console.log(data));
}

function runImage(id) {
  fetch('/run/' + id)
      .then(data => console.log(data));
}
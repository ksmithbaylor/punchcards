var userField = document.getElementById('userField');
var submitButton = document.getElementById('submitButton');
var fake = document.getElementById('fake');

fake.addEventListener('click', function () {
  var url = '/fake';
  d3.json(url, handleResponse);
});

submitButton.addEventListener('click', function () {
  var url = '/users/' + userField.value;
  d3.json(url, handleResponse);
});

function handleResponse(err, data) {
  if (err) throw err;
  console.log(data);
}

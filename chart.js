var userField = document.getElementById('userField');
var submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', function () {
  var username = userField.value;
  console.log(username);
});

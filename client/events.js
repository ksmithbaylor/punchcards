//const id = document.getElementById.bind(document);
//const userField = id('userField');
//const submitButton = id('submitButton');
//const fake = id('fake');

//fake.addEventListener('click', e =>
  //d3.json('/fake', handleResponse));

//submitButton.addEventListener('click', e =>
  //d3.json('/punchcard/' + userField.value, handleResponse));

function handleResponse(err, data) {
  if (err) console.log(JSON.stringify(err));
  makeGraph(data);
}

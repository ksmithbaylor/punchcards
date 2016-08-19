const id = document.getElementById.bind(document);
const user = id('userField');
const submit = id('submitButton');

submit.addEventListener('click', e => d3.json('/punchcard/' + user.value, handleResponse));

function handleResponse(err, data) {
  if (err) console.log(JSON.stringify(err));
  makeGraph(data);
}

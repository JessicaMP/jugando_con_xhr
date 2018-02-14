// XHR
const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');

  let searchedForText;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open(`GET`, `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=4b7cef7670774d389866ae8119f77dac`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}

function handleError() {
  console.log('Se ha presentado un error');
}

function addNews() {
  const data = JSON.parse(this.responseText);
        response = data.response;
  console.log(response);
  const article = data.response.docs[1];
  const title = article.headline.main;
  const snippet = article.snippet;
  const uri = article.multimedia[0].url;

  let box = document.createElement('div');
  let titleParagraph = document.createElement('h2');
  let paragraph = document.createElement('p');
  let image = document.createElement('img');
  box.className = 'articleClass';
  paragraph.innerText = snippet;
  titleParagraph.innerText = title;
  image.src = uri;

  box.appendChild(titleParagraph);
  box.appendChild(paragraph);
  responseContainer.appendChild(box);
}
// FETCH
const formFetch = document.querySelector('#search-form-right');
const searchFieldFetch = document.querySelector('#search-keyword-right');
const responseContainerFetch = document.querySelector('#response-container-right');
var btn = document.querySelector("#submit-btn-right");

let searchedForTextFetch;

btn.addEventListener("click", function(e){
  e.preventDefault();
  responseContainerFetch.innerHTML = '';
  searchedForTextFetch = searchField.value;
  const url = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=4b7cef7670774d389866ae8119f77dac`;

  fetch(url)
  .then(handleErrors)
  .then(parseJSON)
  .then(addNews2)
  .catch(displayErrors);
});

function handleErrors(res){
  if(!res.ok){
    throw Error(res.status);
  }
  return res;
}

function parseJSON(res){
  console.log(res);
  return res.json()
  .then(function(parsedData) {
    return parsedData.response.docs[0];
  })
}

function addNews2(data){
  //const article = data.response.docs[0];
  const  title = data.headline.main;
  const  snippet = data.snippet;

  let li = document.createElement('li');
  li.className = 'articleClassFetch';
  li.innerText = snippet;

  responseContainerFetch.appendChild(li);
}

function displayErrors(err){
  console.log("INSIDE displayErrors!");
  console.log(err);
}

// XHR
const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
const btnHxr = document.getElementById('btn-xhr');

let searchedForText;

btnHxr.addEventListener('click', (e) => {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getNews();
});

const getNews = () => {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open(`GET`, `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=4b7cef7670774d389866ae8119f77dac`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}

const handleError = () => {
  console.log('Se ha presentado un error');
}

function addNews() {
  const data = JSON.parse(this.responseText);
  const articles = data.response.docs;
  if (articles.length > 0) {
    articles.forEach(function(article) {
      const title = article.headline.main;
      const snippet = article.snippet;
      const uri = article.multimedia[0].url;
      const webUrl = article.web_url;

      let box = document.createElement('div');
      let titleParagraph = document.createElement('h2');
      let paragraph = document.createElement('p');
      let image = document.createElement('img');
      box.className = 'articleClass';
      paragraph.innerText = snippet;
      titleParagraph.innerText = title;
      image.src = 'https://www.nytimes.com//' + uri;

      box.appendChild(titleParagraph);
      box.appendChild(paragraph);
      box.appendChild(image);
      responseContainer.appendChild(box);

      titleParagraph.addEventListener('click', () => {
        window.location.href = webUrl;
        });
    });
  }
}

// FETCH
var btnFetch = document.getElementById("btn-fetch");

let searchedForTextFetch;

btnFetch.addEventListener("click", (e) => {
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForTextFetch = searchField.value;
  const url = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=4b7cef7670774d389866ae8119f77dac`;

  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(addNews2)
    .catch(displayErrors);
});

const handleErrors = (res) => {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
};

const parseJSON = (res) => {
  return res.json()
    .then((parsedData) => {
      return parsedData.response.docs;
    })
};

const addNews2 = (data) => {
  if (data.length > 0) {
    data.forEach(function(article){
      const title = article.headline.main;
      const snippet = article.snippet;
      const uri = article.multimedia[0].url;
      const webUrl = article.web_url;

      let box = document.createElement('div');
      let titleParagraph = document.createElement('h2');
      let paragraph = document.createElement('p');
      let image = document.createElement('img');
      box.className = 'articleClass';
      paragraph.innerText = snippet;
      titleParagraph.innerText = title;
      image.src = 'https://www.nytimes.com/' + uri;

      box.appendChild(titleParagraph);
      box.appendChild(paragraph);
      box.appendChild(image);
      responseContainer.appendChild(box);

      titleParagraph.addEventListener('click', () => {
        window.location.href = webUrl;
      });
    });
  }
}

const displayErrors = (err) => {
  console.log("INSIDE displayErrors!");
  console.log(err);
}

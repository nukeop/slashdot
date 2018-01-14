require('isomorphic-fetch');
const cheerio = require('cheerio');

function getArticle(url) {
  return fetch(url)
    .then(response => response.text())
    .then(html => {
      var $ = cheerio.load(html, {
	decodeEntities: false
      });
      var article = {};
      article.title = $('.story-title>a').text();
      article.score = $('.comment-bubble>a').text();
      article.byline = $('.story-byline').text().trim();
      article.body = $('.body').text().trim();
      return Promise.resolve(article); 
    })
    .catch(err => {
      console.error(err);
    });
}

module.exports = {
  getArticle
};

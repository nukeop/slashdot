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
      article.source = $('.story-sourcelnk').attr('href');
      article.score = $('.comment-bubble>a').text();
      article.byline = $('.story-byline').text().trim();
      article.body = $('.body').text().trim();
      article.topics = $('.topic').find('a>img');
      article.topics = Array.from(article.topics.map((i, topic) => {
	return $(topic).attr('title');
      }));
      article.tags = $('.tag-bar').find('.popular.tag');
      article.tags = Array.from(article.tags.map((i, tag) => {
	return $(tag).text();
      }));
      
      return Promise.resolve(article); 
    })
    .catch(err => {
      console.error(err);
    });
}

module.exports = {
  getArticle
};

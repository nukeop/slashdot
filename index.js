require('isomorphic-fetch');
const cheerio = require('cheerio');

function getQueryParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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

function getComment(url) {
  return fetch(url)
    .then(response => response.text())
    .then(html => {
      var $ = cheerio.load(html, {
	decodeEntities: false
      });

      var cid = getQueryParam('cid', url);
      var comment = {};
      comment.title = $(`#comment_${cid}>.commentTop>.title>h4>a`).text();
      comment.score = $(`#comment_${cid}>.commentTop>.title>h4>.score>a`).text().split(':')[1];

      var rating = $(`#comment_${cid}>.commentTop>.title>h4>.score`).text().split(', ');
      comment.rating = rating.length > 1 ? rating[1].slice(0, -1) : null;

      comment.user = {
      	username: $(`#comment_${cid}>.commentTop>.details>.by>a`).text(),
      	uid: $(`#comment_${cid}>.commentTop>.details>.by>.uid`).text().slice(2, -2),
      	profile_url: $(`#comment_${cid}>.commentTop>.details>.by>a`).attr('href')
      };
      if(comment.user.username === '') {
	comment.user = {
	  username: "Anonymous Coward"
	};
      }
      
      comment.body = $(`#comment_${cid}>.commentBody>div`).text();
      
      return Promise.resolve(comment);
    })
    .catch(err => {
      console.error(err);
    });
}

module.exports = {
  getArticle,
  getComment
};

# slashdot
slashdot scraper. Promise-based API.

# Usage

### Installation
```bash
$ npm install --save slashdot
```

### List of methods:

- getArticle(url)
```javascript
const slashdot = require('slashdot');

slashdot.getArticle('https://entertainment.slashdot.org/story/18/01/14/2124225/japans-latest-sensation-is-a-cryptocurrency-pop-group')
.then(article => {
	console.log(article);
});
```

- getComment(url)
```javascript
const slashdot = require('slashdot');

slashdot.getComment('https://linux.slashdot.org/comments.pl?sid=11610579&cid=55929905')
.then(comment => {
	console.log(comment);
});
```

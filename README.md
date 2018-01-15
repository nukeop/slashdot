# slashdot
slashdot scraper

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

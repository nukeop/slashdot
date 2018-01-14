const test = require('ava');
const slashdot = require('../index');

test('fetch article info', t => {
  return slashdot.getArticle('https://entertainment.slashdot.org/story/18/01/14/2124225/japans-latest-sensation-is-a-cryptocurrency-pop-group')
    .then(article => {
      console.log(article);
      t.pass();
    })
    .catch(err => {
      console.error(err);
      t.fail();
    });
});

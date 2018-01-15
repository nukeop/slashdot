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

test('fetch comment', t=> {
  return slashdot.getComment('https://linux.slashdot.org/comments.pl?sid=11610579&cid=55929905')
    .then(comment => {
      console.log(comment);
      t.pass();
    })
    .catch(err => {
      console.error(err);
      t.fail();
    });
});

test('fetch anonymous coward comment', t=> {
  return slashdot.getComment('https://hardware.slashdot.org/comments.pl?sid=11610551&cid=55929715')
    .then(comment => {
      console.log(comment);
      t.pass();
    })
    .catch(err => {
      console.error(err);
      t.fail();
    });
});


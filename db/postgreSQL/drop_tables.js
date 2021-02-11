const { Shoe, Review } = require('./postgres_index.js');

Review.drop()
.then(() => {
  Shoe.drop();
})
.catch(error => {
  console.error(error);
});
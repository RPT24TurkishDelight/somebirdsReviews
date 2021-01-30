const express = require ('express');
const controller = require('../controller/index.js');
const app = express();
const PORT = 3003;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/shoes/:shoeId/reviews/:count', (req, res) => {
  let { shoeId, count } = req.params;
  controller.getReviews(shoeId, count)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.error(err);
    res.end();
  });
});

app.get('/shoes/:shoeId/rating', (req, res) => {
  let { shoeId } = req.params;
  controller.getRating(shoeId)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.error(err);
    res.end();
  });
});

app.post('/reviews', (req, res) => {
  controller.createReview(req.body)
  .then((data) => {
    res.status(200).send('Review created successfully');
  })
  .catch(err => {
    console.error(err);
    res.status(404).end('Error creating Review');
  });
})

app.put('/reviews/:reviewId/', (req, res) => {
  let reviewId = req.params.reviewId;
  controller.updateReview(reviewId, req.body)
  .then((data) => {
    res.status(200).send('Review updated successfully');
  })
  .catch(err => {
    console.error(err);
    res.status(404).end('Error updating Review');
  });
})

app.delete('/reviews/:reviewId/', (req, res) => {
  let reviewId = req.params.reviewId;
  controller.removeReview(reviewId)
  .then((data) => {
    res.status(200).send('Review removed successfully');
  })
  .catch(err => {
    console.error(err);
    res.status(404).end('Error removing Review');
  });
})

module.exports = app;
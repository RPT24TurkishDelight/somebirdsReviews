const { Shoe, Review } = require('../db/index.js');

function getReviews(shoeId, count) {
  return Review.findAll({
    order: [
      ['id', 'DESC']
    ],
    limit: parseInt(count),
    where: {
      shoe_id: shoeId
    },
  });
}

function getRating(shoeId) {
  return Shoe.findAll({
    where: {
      model: shoeId
    }
  });
}

function createReview(reviewData) {
  return Review.create({
    name: reviewData.name,
    headline: reviewData.headline,
    review: reviewData.review,
    rating: reviewData.rating,
    fit_feedback: reviewData.fit_feedback,
    shoe_id: reviewData.shoe_id
  });
}

function updateReview(reviewId, reviewData){
  return Review.update(reviewData, {
    where: {
      id: reviewId
    }
  });
}

let removeReview = (reviewId) => {
  return Review.destroy({
    where: {
        id: reviewId
    }
  });
}

module.exports.getReviews = getReviews;
module.exports.getRating = getRating;
module.exports.createReview = createReview;
module.exports.updateReview = updateReview;
module.exports.removeReview = removeReview;
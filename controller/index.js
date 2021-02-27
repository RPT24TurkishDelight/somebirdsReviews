const model = require('../model/index.js');
const { getDate } = require('../utils/index.js');

function getReviews(shoeId, count) {
  return new Promise((resolve, reject) => {
    model.getReviews(shoeId, count)
    .then(data => {
      data = data.map(x => {
        return { id: x.id, name: x.name, headline: x.headline, review: x.review, rating: x.rating, fit_feedback: x.fit_feedback};
      });
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function getRating(shoeId) {
  return new Promise((resolve, reject) => {
    model.getRating(shoeId)
    .then((data) => {
      console.log('DATA', data);
      let { id, name, model, rating_average, fit_feedback_average, review_count } = data[0];
      resolve({ id, name, model, rating_average, fit_feedback_average, review_count });
    })
    .catch(err => {
      reject(err);
    });
  });
}

function createReview(reviewData) {
  return new Promise ((resolve, reject) => {
    model.createReview(reviewData)
    .then(()=>{
      resolve(reviewData);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function updateReview(reviewId, reviewData){
  return new Promise ((resolve, reject)=>{
    model.updateReview(reviewId, reviewData)
    .then(()=>{
      resolve(reviewData);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function removeReview(reviewId){
  return new Promise ((resolve, reject) => {
    model.removeReview(reviewId)
    .then(()=>{
      resolve('Successfully removed review #',reviewId );
    })
    .catch(err => {
      reject(err);
    });
  })
}

module.exports.getReviews = getReviews;
module.exports.getRating = getRating;
module.exports.createReview = createReview;
module.exports.updateReview = updateReview;
module.exports.removeReview = removeReview;
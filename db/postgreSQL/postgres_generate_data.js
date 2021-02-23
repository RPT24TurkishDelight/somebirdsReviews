const { Shoe, Review } = require('./postgres_index.js');
const faker = require('faker');

(async () => {
  let shoeBulkData = [];
  let reviewBulkData = [];
  let gender = ['Men\'s', 'Women\'s'];
  let material = ['Wool', 'Cotton', 'Polyester', 'Nylon', 'Leather'];
  let action = ['Runners', 'Skippers', 'Sprinters', 'Joggers', 'Walkers', 'Trotters', 'Climbers', 'Dashers', 'Pipers', 'Loungers'];
  let headlines = ['Best buy!', 'Yesss', 'Nope!', 'Great', 'Bad service', 'I likey', 'Durable as heck!', 'Fine', 'Trash', 'No bueno', 'Worst customer service', 'THE BEST'];
  let reviews = [`Hands down the best shoes I have ever purchased! Ever!`, `I will never be buying shoes anywhere else`, `Worst purchase I have ever made`, `Great!`, `Decent shoes, but customer service completely sucks`, `I like very much`, `These bad boys have lasted me 3 years of everyday use. Fantastic quality, can't recommend them enough!`, `Fine, I guess...`, `Allbirds are way better than this trash!`, `No bueno my friends, I've gone through 3 pairs in the last month due to various manufacturing defects. I really love the idea behind this company but until they get the hiccups figured out I will be purchasing my shoes elsewhere`, `Worst customer service department I've ever dealt with`, `Best shoes one can buy.`];
  let model = 1;
console.time('Insert 10M records into PostgreSQL')

  for(let i = 0; i < 100000; i++){

    let randomNumberGenerator = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    //let model = 1;
    let count = 0;
    let rating = 0;
    let fitFeedback = 0;

    gender.forEach(gender => {
      material.forEach(material => {
        action.forEach(action => {
          let reviewMax = randomNumberGenerator(1, 10)
          reviews.forEach((review, index) => {

            if (index <= reviewMax){
              let tempRating = randomNumberGenerator(1, 5);
              let tempFitFeedback = randomNumberGenerator(-1, 1);
              rating += tempRating;
              fitFeedback += tempFitFeedback;
              count += 1;
              reviewBulkData.push({ name: faker.name.firstName(), headline: headlines[index], review: review, rating: tempRating, fit_feedback: tempFitFeedback, shoe_id: model });
            }

          });
          shoeBulkData.push({ name: `${gender} ${material} ${action}`, model: model, rating_average: (rating / count).toFixed(1), fit_feedback_average: (fitFeedback / count).toFixed(1), review_count: count });
          count = 0;
          rating = 0;
          fitFeedback = 0;
          model++;
          // let rotations = randomNumberGenerator(1, 4);
          // for (let i = 0; i < rotations; i++) {
          //   headlines.push(headlines.shift());
          //   reviews.push(reviews.shift());
          // }
        });
      });
    });

    if ( i % 1000 === 0){
      await Shoe.bulkCreate(shoeBulkData);
      await Review.bulkCreate(reviewBulkData);
      console.log('Iteration', i);
      shoeBulkData = [];
      reviewBulkData = [];
    }
    console.log('Iteration', i);
  }

  console.timeEnd('Insert 10M records into PostgreSQL');
})()


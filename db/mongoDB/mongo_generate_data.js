const Shoe = require('./index.js');
const faker = require('faker');

let model = 1;

let generate_records = () =>{

  let shoeBulkData = [];
  let reviewBulkData = [];
  let gender = ['Men\'s', 'Women\'s'];
  let material = ['Wool', 'Cotton', 'Polyester', 'Nylon', 'Leather'];
  let action = ['Runners', 'Skippers', 'Sprinters', 'Joggers', 'Walkers', 'Trotters', 'Climbers', 'Dashers', 'Pipers', 'Loungers'];
  let headlines = ['Best buy!', 'Yesss', 'Nope!', 'Great', 'Bad service', 'I likey', 'Durable as heck!', 'Fine', 'Trash', 'No bueno', 'Worst customer service', 'THE BEST'];
  let reviews = [`Hands down the best shoes I have ever purchased! Ever!`, `I will never be buying shoes anywhere else`, `Worst purchase I have ever made`, `Great!`, `Decent shoes, but customer service completely sucks`, `I like very much`, `These bad boys have lasted me 3 years of everyday use. Fantastic quality, can't recommend them enough!`, `Fine, I guess...`, `Allbirds are way better than this trash!`, `No bueno my friends, I've gone through 3 pairs in the last month due to various manufacturing defects. I really love the idea behind this company but until they get the hiccups figured out I will be purchasing my shoes elsewhere`, `Worst customer service department I've ever dealt with`, `Best shoes one can buy.`];
  let count = 0;
  let rating = 0;
  let fitFeedback = 0;
  let loop = 0;

  let randomNumberGenerator = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  while (loop < 10){
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

          shoeBulkData.push({ name: `${gender} ${material} ${action}`, model: model, rating_average: (rating / count).toFixed(1), fit_feedback_average: (fitFeedback / count).toFixed(1), review_count: count, reviews: reviewBulkData });
          reviewBulkData = [];
          count = 0;
          rating = 0;
          fitFeedback = 0;
          model++;
        });
      });
    });

    loop++;
  }

  return shoeBulkData;

}

(async () => {
  let thousand_records = []
  loop = 0;
  bulk_loop = 0;
  console.time('Inserting 10M into MongoDB');
  while(bulk_loop < 10000){
    thousand_records = generate_records();
    await Shoe.insertMany(thousand_records);
    console.log('Iteration ', bulk_loop+1, ' out of 10,000');
    thousand_records = [];
    bulk_loop++;
  }
  console.timeEnd('Inserting 10M into MongoDB');
})();




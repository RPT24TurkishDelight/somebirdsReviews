const faker = require('faker');

const fs = require('fs');

const writeReviews = fs.createWriteStream('someBirdsReviews2.csv');
writeReviews.write('name,headline,review,rating,fit_feedback,shoe_id\n');

const writeShoes = fs.createWriteStream('someBirdsShoes2.csv');
writeShoes.write('name,model,rating_average,fit_beedback_average,review_count\n');

let randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let rating = 0;
let fitFeedback = 0;

let makeReviews = (model, maxReviews)=>{
  let headlines = ['Best buy!', 'Yesss', 'Nope!', 'Great', 'Bad service', 'I likey', 'Durable as heck!', 'Fine', 'Trash', 'No bueno', 'Worst customer service', 'THE BEST'];
  let reviews = [`Hands down the best shoes I have ever purchased! Ever!`, `I will never be buying shoes anywhere else`, `Worst purchase I have ever made`, `Great!`, `Decent shoes but customer service completely sucks`, `I like very much`, `These bad boys have lasted me 3 years of everyday use. Fantastic quality. I can't recommend them enough!`, `Fine I guess.`, `Allbirds are way better than this trash!`, `No bueno my friends! I've gone through 3 pairs in the last month due to various manufacturing defects. I really love the idea behind this company but until they get the hiccups figured out I will be purchasing my shoes elsewhere`, `Worst customer service department I've ever dealt with`, `Best shoes one can buy.`];
  let newReviews ='';

  for(let i = 0; i < maxReviews; i++){
    let tempRating = randomNumberGenerator(1,5);
    let tempFitFeedback = randomNumberGenerator(-1, 1);

    rating += tempRating;
    fitFeedback += tempFitFeedback;

    newReviews += `${faker.name.firstName()},${headlines[randomNumberGenerator(0, headlines.length)]},${reviews[randomNumberGenerator(0 , reviews.length)]},${tempRating},${tempFitFeedback},${model}\n`;
  }
  return newReviews;
}

let makeOneShoe = (shoe_id, maxReviews) => {

  let gender = ['Men\'s', 'Women\'s'];
  let material = ['Wool', 'Cotton', 'Polyester', 'Nylon', 'Leather'];
  let action = ['Runners', 'Skippers', 'Sprinters', 'Joggers', 'Walkers', 'Trotters', 'Climbers', 'Dashers', 'Pipers', 'Loungers'];

  const newShoe = `${gender[randomNumberGenerator(0, gender.length - 1)]} ${material[randomNumberGenerator(0, material.length - 1)]} ${action[randomNumberGenerator(0, action.length - 1)]},${shoe_id},${(rating / maxReviews).toFixed(1)},${(fitFeedback / maxReviews).toFixed(1)},${maxReviews}\n`;

  rating = 0;
  fitFeedback = 0;
  return newShoe;
}

let writeTenMillionShoes = (writeShoes, writeReviews,  callback) => {
  console.time('Generate 10M Shoes in CSV file');
  let i = 10000000;
  let model = 1;

  let write = async()=>{
    let hasSpaceShoes = true;
    let hasSpaceReviews = true;
    do {
      i -= 1;
      console.log('WRITING MODEL# ', model);
      let maxReviews = randomNumberGenerator (1, 10);
      let reviews = makeReviews(model, maxReviews);
      let shoe = makeOneShoe(model, maxReviews);
      model++;

      if (i === 0) {
        await writeReviews.write(reviews, callback)
        await writeShoes.write(shoe, callback);
        console.timeEnd('Generate 10M Shoes in CSV file');
      } else {
        hasSpaceReviews = await writeReviews.write(reviews);
        hasSpaceShoes = await writeShoes.write(shoe);
      }
    } while (i > 0 && hasSpaceShoes && hasSpaceReviews);
    if (i > 0) {
      console.log('DRAIN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      if(hasSpaceReviews === false){
        writeReviews.once('drain', write);
      } else {
        writeShoes.once('drain', write);
      }
    }
  }
  write();

}
// console.time('Generate 10M Shoes in CSV file');
writeTenMillionShoes(writeShoes, writeReviews, ()=>{
  writeReviews.end();
  writeShoes.end();
});
// console.timeEnd('Generate 10M Shoes in CSV file');


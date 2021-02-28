//const Shoe = require('./index.js');
const faker = require('faker');
const fs = require('fs');

let writeShoes = fs.createWriteStream('someBirdsShoes.json');

let randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let makeOneShoe = (shoe_id) => {

  let gender = ['Men\'s', 'Women\'s'];
  let material = ['Wool', 'Cotton', 'Polyester', 'Nylon', 'Leather'];
  let action = ['Runners', 'Skippers', 'Sprinters', 'Joggers', 'Walkers', 'Trotters', 'Climbers', 'Dashers', 'Pipers', 'Loungers'];

  let rating = 0;
  let fitFeedback = 0;

  let makeReviews = ()=>{
    let headlines = ['Best buy!', 'Yesss', 'Nope!', 'Great', 'Bad service', 'I likey', 'Durable as heck!', 'Fine', 'Trash', 'No bueno', 'Worst customer service', 'THE BEST'];
    let reviews = [`Hands down the best shoes I have ever purchased! Ever!`, `I will never be buying shoes anywhere else`, `Worst purchase I have ever made`, `Great!`, `Decent shoes, but customer service completely sucks`, `I like very much`, `These bad boys have lasted me 3 years of everyday use. Fantastic quality, can't recommend them enough!`, `Fine, I guess...`, `Allbirds are way better than this trash!`, `No bueno my friends, I've gone through 3 pairs in the last month due to various manufacturing defects. I really love the idea behind this company but until they get the hiccups figured out I will be purchasing my shoes elsewhere`, `Worst customer service department I've ever dealt with`, `Best shoes one can buy.`];
    let reviewsArray = [];
    let maxReviews = randomNumberGenerator (1, 10);

    for(let i = 0; i < maxReviews; i++){
      let tempRating = randomNumberGenerator(1,5);
      let tempFitFeedback = randomNumberGenerator(-1, 1);

      rating += tempRating;
      fitFeedback += tempFitFeedback;

      let newReview = {
        name: faker.name.firstName(),
        headline: headlines[randomNumberGenerator(0, headlines.length)],
        review: reviews[randomNumberGenerator(0 , reviews.length)],
        rating: tempRating,
        fitFeedback: tempFitFeedback,
        shoe_id: shoe_id
      }
      reviewsArray.push(newReview);
    }
    return reviewsArray;
  }

  reviewBulkData = makeReviews();
  const shoe = {
   name: `${gender[randomNumberGenerator(0, gender.length - 1)]} ${material[randomNumberGenerator(0, material.length - 1)]} ${action[randomNumberGenerator(0, action.length - 1)]}`,
   model: shoe_id,
   rating_average: (rating / reviewBulkData.length).toFixed(1),
   fit_feedback_average: (fitFeedback / reviewBulkData.length).toFixed(1),
   review_count: reviewBulkData.length,
   reviews: reviewBulkData
  }
  return shoe;
}

let writeTenMillionShoes = (writer, callback) => {
  console.time('Generate 10M Shoes in JSON file');
  let i = 10000000;
  let model = 1;

  let write = ()=>{
    let hasSpace = true;
    do {
      i -= 1;
      console.log('WRITING MODEL# ', model);
      let data = JSON.stringify(makeOneShoe(model));
      model++;

      if (i === 0) {
        writer.write(data, callback);
      } else {
        hasSpace = writer.write(data);
        writer.write(`\n`);
      }
    } while (i > 0 && hasSpace);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeTenMillionShoes(writeShoes, ()=>{
  writeShoes.end();
  console.timeEnd('Generate 10M Shoes in JSON file');
})







  // let createTenMillionShoes = (writeShoes, callback) => {
  //   console.time('Generating 10M records in JSON file');
  //   let records = 1;
  //   let model = 1;

  //   let gender = ['Men\'s', 'Women\'s'];
  //   let material = ['Wool', 'Cotton', 'Polyester', 'Nylon', 'Leather'];
  //   let action = ['Runners', 'Skippers', 'Sprinters', 'Joggers', 'Walkers', 'Trotters', 'Climbers', 'Dashers', 'Pipers', 'Loungers'];
  //   let headlines = ['Best buy!', 'Yesss', 'Nope!', 'Great', 'Bad service', 'I likey', 'Durable as heck!', 'Fine', 'Trash', 'No bueno', 'Worst customer service', 'THE BEST'];
  //   let reviews = [`Hands down the best shoes I have ever purchased! Ever!`, `I will never be buying shoes anywhere else`, `Worst purchase I have ever made`, `Great!`, `Decent shoes, but customer service completely sucks`, `I like very much`, `These bad boys have lasted me 3 years of everyday use. Fantastic quality, can't recommend them enough!`, `Fine, I guess...`, `Allbirds are way better than this trash!`, `No bueno my friends, I've gone through 3 pairs in the last month due to various manufacturing defects. I really love the idea behind this company but until they get the hiccups figured out I will be purchasing my shoes elsewhere`, `Worst customer service department I've ever dealt with`, `Best shoes one can buy.`];
  //   let count = 0;
  //   let rating = 0;
  //   let fitFeedback = 0;

  //   let hasSpace = true;
  //   let shoeData = [];
  //   let reviewBulkData = [];

  //   let write = ()=>{
  //     do {
  //       records--;
  //       gender.forEach(gender => {
  //         material.forEach(material => {
  //           action.forEach(action => {
  //             let reviewMax = randomNumberGenerator(1, 10)
  //             reviews.forEach((review, index) => {
  //               if (index <= reviewMax){
  //                 let tempRating = randomNumberGenerator(1, 5);
  //                 let tempFitFeedback = randomNumberGenerator(-1, 1);
  //                 rating += tempRating;
  //                 fitFeedback += tempFitFeedback;
  //                 count += 1;
  //                 reviewBulkData.push({ name: faker.name.firstName(), headline: headlines[index], review: review, rating: tempRating, fit_feedback: tempFitFeedback, shoe_id: model });
  //               }
  //               shoeData = { name: `${gender} ${material} ${action}`, model: model, rating_average: (rating / count).toFixed(1), fit_feedback_average: (fitFeedback / count).toFixed(1), review_count: count, reviews: reviewBulkData };
  //               let data = JSON.stringify(shoeData);

  //               if(records === 0){
  //                 writeShoes.write(data, callback);
  //                 console.log('WRITE.END HERE');
  //                 console.timeEnd('Generating 10M records in JSON file');

  //               } else{
  //                 hasSpace = writeShoes.write(data);
  //                 writeShoes.write(`\n`);
  //                 //writeShoes.write(data);
  //                 shoeData = {}
  //                 reviewBulkData = [];
  //                 data = '';
  //                 count = 0;
  //                 rating = 0;
  //                 fitFeedback = 0;
  //                 model++;
  //               }
  //             });
  //           });
  //         });
  //       });
  //     } while (records > 0 && hasSpace);
  //     if (records > 0) {
  //       writeShoes.once('drain', write);
  //     }
  //   }
  //   write();
  //   console.log('WRITING RECORD NUMER ', records, 'HAS SPACE ', hasSpace);
  // }

  // createTenMillionShoes(writeShoes, ()=>{
  //   console.log('DRAIN ', hasSpace, 'LOOP ', loop)
  //   writeShoes.end();

  // });


  // console.time('Generate 10M Shoes in JSON file');

  //   let records = 10;
  //   let model = 1;

  //   let reviewBulkData = [];
  //   let gender = ['Men\'s', 'Women\'s'];
  //   let material = ['Wool', 'Cotton', 'Polyester', 'Nylon', 'Leather'];
  //   let action = ['Runners', 'Skippers', 'Sprinters', 'Joggers', 'Walkers', 'Trotters', 'Climbers', 'Dashers', 'Pipers', 'Loungers'];
  //   let headlines = ['Best buy!', 'Yesss', 'Nope!', 'Great', 'Bad service', 'I likey', 'Durable as heck!', 'Fine', 'Trash', 'No bueno', 'Worst customer service', 'THE BEST'];
  //   let reviews = [`Hands down the best shoes I have ever purchased! Ever!`, `I will never be buying shoes anywhere else`, `Worst purchase I have ever made`, `Great!`, `Decent shoes, but customer service completely sucks`, `I like very much`, `These bad boys have lasted me 3 years of everyday use. Fantastic quality, can't recommend them enough!`, `Fine, I guess...`, `Allbirds are way better than this trash!`, `No bueno my friends, I've gone through 3 pairs in the last month due to various manufacturing defects. I really love the idea behind this company but until they get the hiccups figured out I will be purchasing my shoes elsewhere`, `Worst customer service department I've ever dealt with`, `Best shoes one can buy.`];
  //   let count = 0;
  //   let rating = 0;
  //   let fitFeedback = 0;

  //   let hasSpace = true;
  //   let shoeData = [];
  //   let loop = 0;


  // let createJSON = ()=> {
  //   while (loop < 10){
  //     console.log('WRITING RECORD ', loop);
  //     gender.forEach(gender => {
  //       material.forEach(material => {
  //         action.forEach(action => {
  //           let reviewMax = randomNumberGenerator(1, 10)
  //           reviews.forEach((review, index) => {

  //             if (index <= reviewMax){
  //               let tempRating = randomNumberGenerator(1, 5);
  //               let tempFitFeedback = randomNumberGenerator(-1, 1);
  //               rating += tempRating;
  //               fitFeedback += tempFitFeedback;
  //               count += 1;
  //               reviewBulkData.push({ name: faker.name.firstName(), headline: headlines[index], review: review, rating: tempRating, fit_feedback: tempFitFeedback, shoe_id: model });
  //             }

  //           });

  //           shoeData = { name: `${gender} ${material} ${action}`, model: model, rating_average: (rating / count).toFixed(1), fit_feedback_average: (fitFeedback / count).toFixed(1), review_count: count, reviews: reviewBulkData };
  //           let data = JSON.stringify(shoeData);
  //           hasSpace = writeShoes.write(data);
  //           console.log('MODEL ', model);
  //           writeShoes.write(data);
  //           writeShoes.write(`\n`);
  //           shoeData = {};
  //           reviewBulkData = [];
  //           count = 0;
  //           rating = 0;
  //           fitFeedback = 0;
  //           model++;
  //         });
  //       });
  //     });
  //     loop++;
  //   }
  // }
  // if(loop < 100){
  //   console.log('DRAIN ', hasSpace, 'LOOP ', loop);
  //   writeShoes.once('drain', ()=>{
  //     createJSON();
  //   });
  // }
  // createJSON();

  // console.timeEnd('Generate 10M Shoes in JSON file');


  // while(loop < 100000){
  //     loop++;
  //   }

  //   for(let i = 0; i < 3; i++){

  //       //let data = JSON.stringify(shoe +'\n', null, 2);

  //       let data = JSON.stringify(shoe);
  //       writer.write(data);
  //       writer.write(`\n`);
  //       shoe = {};
  //     }


  //     let shoe = {
  //       name: 'Nike',
  //       model: 'Air Jordan 11',
  //       rating_average: 4.9,
  //       fit_feedback_average: .7,
  //       review_count: 2,
  //       reviews: [
  //         {
  //           name: 'Brian',
  //           headline: 'By Far My Favorite Shoe',
  //           review: 'I would buy this again and againg if I could',
  //           rating: 5,
  //           fit_feedback: 1,
  //         },
  //         {
  //           name: 'Brian2',
  //           headline: 'By Far My Favorite Shoe',
  //           review: 'I would buy this again and againg if I could',
  //           rating: 5,
  //           fit_feedback: 1,
  //         }
  //       ]
  //     }


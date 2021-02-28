const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/somebirdsReviews', {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
  console.log('Database connected!')
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const ShoeSchema = new mongoose.Schema({
  name: String,
  model: Number,
  rating_average: String,
  fit_feedback_average: String,
  review_count: Number,
  reviews: [{ name: String, headline: String,review: String, rating: Number, fit_feedback: Number}],
});

const Shoe = mongoose.model('Shoe',ShoeSchema);

module.exports = Shoe;
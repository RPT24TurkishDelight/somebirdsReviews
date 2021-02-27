import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 1,
      maxVUs: 200,
    },
  },
};

export default function () {
  var url = 'http://localhost:3003/reviews';

  let payload = JSON.stringify({
    name: 'Brian',
    headline: 'Favorite Shoes of all time!',
    review: 'I love these shoes. So much so that I bought 3 pairs',
    rating: 5,
    fit_feedback: 0,
    shoe_id: 10000000
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
  sleep(1);
}
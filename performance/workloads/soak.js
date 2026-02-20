import browseFlow from '../scenarios/browse.flow.js';
import checkoutFlow from '../scenarios/checkout.flow.js';

export const options = {
  stages: [
    { duration: '5m', target: 50 },
    { duration: '4h', target: 50 },
    { duration: '5m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'],
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {
  browseFlow();
  checkoutFlow();
}

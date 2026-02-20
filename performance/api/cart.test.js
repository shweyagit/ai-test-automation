import http from 'k6/http';
import { check } from 'k6';
import { apiThresholds } from '../thresholds/api.thresholds.js';

export const options = {
  thresholds: apiThresholds,
};

export default function () {
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${__ENV.TOKEN}` };

  const addRes = http.post(`${__ENV.BASE_URL}/api/cart`, JSON.stringify({
    productId: 'prod-1',
    quantity: 1,
  }), { headers });

  check(addRes, {
    'add to cart status is 200': (r) => r.status === 200,
    'add to cart response time < 300ms': (r) => r.timings.duration < 300,
  });

  const getRes = http.get(`${__ENV.BASE_URL}/api/cart`, { headers });
  check(getRes, {
    'get cart status is 200': (r) => r.status === 200,
    'get cart response time < 200ms': (r) => r.timings.duration < 200,
  });
}

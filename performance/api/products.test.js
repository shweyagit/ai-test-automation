import http from 'k6/http';
import { check } from 'k6';
import { apiThresholds } from '../thresholds/api.thresholds.js';

export const options = {
  thresholds: apiThresholds,
};

export default function () {
  const res = http.get(`${__ENV.BASE_URL}/api/products`);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}
